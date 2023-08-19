import { Circle, Rect, Triangle } from "./index";
import { Shape, ShapeParams } from "./src/shape";

// КРУГ
const circle = new Circle({ radius: 5 });

// Изменение размера фигуры
console.log("Площадь круга, до изменений: " + circle.area);
circle.resize({ radius: 7 });
console.log("Площадь круга, после изменений: " + circle.area);

console.log("================================");

// ВЫВОД:
// Площадь круга, до изменений: 78.53981633974483
// Площадь круга, после изменений: 153.93804002589985
// ================================

const rect = new Rect({ width: 4, height: 6 });

// Классы поддерживают event-listener-ы. Например
rect.on("sizeChange", (details) => {
  console.log(
    details.isStretched
      ? "Прямоугольник был растянут"
      : "Размеры прямоугольника были изменены"
  );
  console.log(
    "Теперь, прямоугольник -- " +
      (rect.isSquare()
        ? "квадрат"
        : rect.isHorizontal()
        ? "горизонтальный"
        : "вертикальный")
  );
});

rect.stretch({ width: 2 });
rect.resize({ width: 10, height: 2 });

console.log("================================");

// ВЫВОД:
// Размеры прямоугольника были изменены
// Теперь, прямоугольник -- квадрат
// Размеры прямоугольника были изменены
// Теперь, прямоугольник -- горизонтальный
// ================================

// ТРЕУГОЛЬНИК

// Также, мы можем создавать специфичные фигуры одного типа с помощью статических методов
const triangles = [
  new Triangle({ a: 2, b: 2, c: 1 }),
  Triangle.createFromTwoSidesAndAngle(3, 4, 90),
  Triangle.createEquilateral(10),
  Triangle.createIsosceles(2, 1),
];

triangles.forEach((tr, i) => {
  console.log(
    `\nФакты о треугольнике №${i + 1}. Стороны: ` + tr.sideValues.join(", ")
  );
  if (tr.isEquilateral()) console.log("Это равносторонний треугольник!");
  if (tr.isIsosceles()) console.log("Это равнобедренный треугольник!");
  if (tr.isRight()) console.log("Это прямоугольный треугольник!");
  if (tr.isEgyptian()) console.log("Это Египетский треугольник!");
});

// ВЫВОД
// Факты о треугольнике №1. Стороны: 1, 2, 2
// Это равнобедренный треугольник!

// Факты о треугольнике №2. Стороны: 3, 4, 5.0059707498962895

// Факты о треугольнике №3. Стороны: 10, 10, 10
// Это равносторонний треугольник!
// Это равнобедренный треугольник!

// Факты о треугольнике №4. Стороны: 1, 2, 2
// Это равнобедренный треугольник!

// НОВЫЕ ФИГУРЫ

// Определяем интерфейс со всеми параметрами трапеции
interface trapezoid extends ShapeParams {
  base1: number;
  base2: number;
  side1: number;
  side2: number;
  // Угол между base1 и side1
  angle1: number;
  // Угол между base2 и side2, противоположно angle1
  angle3: number;
}

class Trapezoid extends Shape<trapezoid> {
  constructor(
    public params: trapezoid,
    public isAbstractDimensionsAllowed: boolean = false
  ) {
    // Определяем условия, при которых трапеции не может существовать (< 0)
    if (
      !isAbstractDimensionsAllowed &&
      Object.values(params).every((param) => param > 0) &&
      params.angle1 < 180 &&
      params.angle2 < 180
    ) {
      throw new Error("Invalid Trapezoid...");
    }

    super(params, isAbstractDimensionsAllowed);
  }

  // Вычисляем площадь по формуле для трапеции
  get area(): number {
    return 1; // вычисляем значения
  }

  // Геттеры для прямого доступа к углам
  get angle1(): number {
    return this.params.angle1;
  }

  get angle3(): number {
    return this.params.angle3;
  }

  // Вычисляем не переданные в аргументах углы в геттерах

  // При необходимости, можем добавить проверку на существование трапеции

  get angle2(): number {
    return 180 - this.params.angle1;
  }

  get angle4(): number {
    return 180 - this.params.angle3;
  }

  // Массив углов
  get angles(): number[] {
    return [this.angle1, this.angle2, this.angle3, this.angle4];
  }

  // ... Другие методы уникальные для трапеции

  // ... Статические методы для создания по сцецифичным парметрам
  //     например, равнобедренный или прямоугольный
}

const trpzd = new Trapezoid({
  base1: 39,
  base2: 48,
  side1: 9,
  side2: 9,
  angle1: 60,
  angle3: 120,
});

trpzd.on("sizeChange", () => {
  console.log("Углы трапеции: " + trpzd.angles.join(", "));
});

trpzd.resize({ angle1: 10, angle3: 10 });
// angle2: 170, angle4: 170
trpzd.resize({ angle1: 60, angle3: 23 });
// angle2: 120, angle4: 157
trpzd.resize({ angle1: 60, angle3: 120 });
// angle2: 120, angle4: 60

// ВЫВОД:
// Углы трапеции: 10, 170, 10, 170
// Углы трапеции: 60, 120, 23, 157
// Углы трапеции: 60, 120, 120, 60

