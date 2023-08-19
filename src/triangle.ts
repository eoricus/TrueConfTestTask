import { Shape, ShapeParams } from "./shape";

export interface TriangleParams extends ShapeParams {
  a: number;
  b: number;
  c: number;
}

export class Triangle extends Shape<TriangleParams> {
  /**
   * Constructor of a triangle.
   *
   * @param {Params} params - The triangle sides.
   * @param {boolean} isAbstractDimensionsAllowed - Whether abstract dimensions (< 0) are allowed.
   * @throws {Error} If abstract dimensions are disallowed and negative or zero values are provided.
   */
  constructor(
    public params: TriangleParams,
    public isAbstractDimensionsAllowed: boolean = false
  ) {
    if (!params.isAbstractDimensionsAllowed && !Triangle.isValid(params)) {
      throw new Error(
        `Invalid Triangle. The sides must be greater than 0, and no side must be greater than the sum of the other two or the isAbstractDimensionsAllowed flag must be enabled.`
      );
    }

    super(params, isAbstractDimensionsAllowed);
  }

  /**
   * Calculation of the angle opposite to the given side.
   *
   * @param {"a" | "b" | "c"} z - The side for which to calculate the angle
   * @returns {number} The calculated angle in degrees.
   */
  private calculateAngle(z: "a" | "b" | "c"): number {
    const [x, y] = ["a", "b", "c"].filter((i) => i !== z);

    return (
      Math.acos(
        (this.params[x] ** 2 + this.params[y] ** 2 - this.params[z] ** 2) /
          (2 * this.params[x] * this.params[y])
      ) *
      (180 / Math.PI)
    );
  }

  /**
   * Calculation of angles of a triangle
   *
   * @returns {TriangleParams} The angles of the triangle
   */
  public get angles(): TriangleParams {
    return {
      a: this.calculateAngle("a"),
      b: this.calculateAngle("b"),
      c: this.calculateAngle("c"),
    };
  }

  /**
   * Calculation of the area of a triangle
   *
   * @return {number} Sum of the sides of a triangle
   */
  public get perimeter(): number {
    return this.params.a + this.params.b + this.params.c;
  }

  /**
   * Calculation of the perimeter of a triangle
   *
   * @returns {number | null} The area of the triangle, or null, if triangle is abstract.
   */
  get area(): number | null {
    if (!Triangle.isValid(this.params)) {
      return null;
    }
    const { a, b, c } = this.params;
    const p = this.perimeter / 2;

    return Math.sqrt(p * (p - a) * (p - b) * (p - c));
  }

  /**
   * @returns An array of side values sorted in ascending order.
   */
  public get sideValues(): Array<number> {
    return Object.values(this.params).sort((a, b) => a - b);
  }

  /**
   * Checks if the given sides can form a valid triangle.
   *
   * @param {TriangleParams} sides - The sides of the triangle.
   * @returns True if the sides can form a triangle, otherwise false.
   */
  public static isValid({ a, b, c }: TriangleParams): boolean {
    return a > 0 && b > 0 && c > 0 && a + b > c && a + c > b && b + c > a;
  }

  /**
   * Checks if the triangle is equilateral.
   *
   * @returns {boolean} True if all sides are equal, otherwise false.
   */
  public isEquilateral(): boolean {
    return this.params.a === this.params.b && this.params.b === this.params.c;
  }

  /**
   * Checks if the triangle is a right triangle.
   *
   * @returns {boolean} True if the triangle satisfies the Pythagorean theorem, otherwise false.
   */
  public isRight(): boolean {
    const [a, b, c] = this.sideValues;

    return a ** 2 + b ** 2 === c ** 2;
  }

  /**
   * Checks if the triangle is an Egyptian triangle.
   *
   * @returns {boolean} True if the triangle is a right triangle and satisfies the Egyptian ratios, otherwise false.
   */
  public isEgyptian(): boolean {
    const [a, b, c] = this.sideValues;

    return this.isRight() && a / 3 === b / 4 && b / 4 === c / 5;
  }

  /**
   * Checks if the triangle is isosceles.
   *
   * @returns {boolean} True if the triangle has at least two sides of equal length, otherwise false.
   */
  public isIsosceles(): boolean {
    const [a, b, c] = this.sideValues;

    return a === b || b === c;
  }

  /**
   * Creation a new Triangle instance from two sides and an angle between them.
   *
   * @param {number} sideA - The length of the first side.
   * @param {number} sideB - The length of the second side.
   * @param {number} angle - The angle between the sides in degrees.
   * @param {boolean} isAbstractDimensionsAllowed - Whether abstract dimensions (< 0) are allowed.
   * @returns {Triangle} A new Triangle instance.
   */
  public static createFromTwoSidesAndAngle(
    a: number,
    b: number,
    angle: number,
    isAbstractDimensionsAllowed: boolean = false
  ): Triangle {
    return new Triangle(
      {
        a: a,
        b: b,
        c: Math.sqrt(a ** 2 + b ** 2 - (2 * a * b * Math.cos(angle)) / 180),
      },
      isAbstractDimensionsAllowed
    );
  }

  /**
   * Creation a new equilateral Triangle instance with the specified side length.
   *
   * @param {number} side - The length of all three sides.
   * @param {boolean} isAbstractDimensionsAllowed - Whether abstract dimensions (< 0) are allowed.
   * @returns {Triangle} A new equilateral Triangle instance.
   */
  public static createEquilateral(
    side: number,
    isAbstractDimensionsAllowed: boolean = false
  ): Triangle {
    return new Triangle(
      { a: side, b: side, c: side },
      isAbstractDimensionsAllowed
    );
  }

  /**
   * Creation a new equilateral Triangle instance with the specified side length.
   *
   * @param {number} side - The length of all three sides.
   * @param {boolean} isAbstractDimensionsAllowed - Whether abstract dimensions (< 0) are allowed.
   * @returns {Triangle} A new equilateral Triangle instance.
   */
  public static createIsosceles(
    a: number,
    b: number,
    isAbstractDimensionsAllowed: boolean = false
  ): Triangle {
    return new Triangle({ a: a, b: b, c: a }, isAbstractDimensionsAllowed);
  }
}
