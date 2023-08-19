import { Triangle } from "../src";
import { describe, expect } from "@jest/globals";

describe("Triangle", () => {
  const correctTriangle = new Triangle({ a: 3, b: 4, c: 5 });

  it("should create a valid Triangle instance", () => {
    expect(correctTriangle).toBeInstanceOf(Triangle);
  });

  it("should throw an error for creating an invalid Triangle", () => {
    expect(() => new Triangle({ a: 1, b: 2, c: 10 })).toThrowError();
  });

  it("should calculate angles correctly", () => {
    expect(correctTriangle.angles["a"]).toBeCloseTo(36.87);
    expect(correctTriangle.angles["b"]).toBeCloseTo(53.13);
    expect(correctTriangle.angles["c"]).toBe(90);
  });

  it("should correctly compute angles", () => {
    expect(correctTriangle.angles.a).toBeCloseTo(36.87);
    expect(correctTriangle.angles.b).toBeCloseTo(53.13);
    expect(correctTriangle.angles.c).toBe(90);
  });

  it("should correctly compute perimeter", () => {
    expect(correctTriangle.perimeter).toBeCloseTo(12);
  });

  it("should correctly compute area", () => {
    expect(correctTriangle.area).toBeCloseTo(6);
  });

  it("should correctly identify an equilateral triangle", () => {
    const equilateralTriangle = new Triangle({ a: 5, b: 5, c: 5 });
    expect(equilateralTriangle.isEquilateral()).toBe(true);

    const nonEquilateralTriangle = new Triangle({ a: 3, b: 4, c: 5 });
    expect(nonEquilateralTriangle.isEquilateral()).toBe(false);
  });

  it("should correctly identify a right triangle", () => {
    const rightTriangle = new Triangle({ a: 3, b: 4, c: 5 });
    const nonRightTriangle = new Triangle({ a: 7, b: 8, c: 10 });

    expect(rightTriangle.isRight()).toBe(true);
    expect(nonRightTriangle.isRight()).toBe(false);
  });

  it("should correctly identify an Egyptian triangle", () => {
    const egyptianTriangle = new Triangle({ a: 3, b: 4, c: 5 });
    const nonEgyptianTriangle = new Triangle({ a: 7, b: 8, c: 10 });

    expect(egyptianTriangle.isEgyptian()).toBe(true);
    expect(nonEgyptianTriangle.isEgyptian()).toBe(false);
  });

  it("should correctly identify an isosceles triangle", () => {
    const isoscelesTriangle = new Triangle({ a: 5, b: 5, c: 6 });
    const nonIsoscelesTriangle = new Triangle({ a: 7, b: 4, c: 5 });

    expect(isoscelesTriangle.isIsosceles()).toBe(true);
    expect(nonIsoscelesTriangle.isIsosceles()).toBe(false);
  });

  it("should correctly create a triangle from two sides and an angle", () => {
    const triangle = Triangle.createFromTwoSidesAndAngle(3, 4, 90);

    expect(triangle.params.c).toBeCloseTo(5, 1);
  });

  it("should correctly create an equilateral triangle", () => {
    const equilateralTriangle = Triangle.createEquilateral(5);

    expect(equilateralTriangle.params.a).toBe(5);
    expect(equilateralTriangle.params.b).toBe(5);
    expect(equilateralTriangle.params.c).toBe(5);
  });

  it("should calculate isIsosceles/isEquilateral/isEgyptian methods correctly after resize", () => {
    const triangle = new Triangle({ a: 1, b: 1, c: 1 });

    expect(triangle.isIsosceles()).toBe(true);
    expect(triangle.isEquilateral()).toBe(true);
    expect(triangle.isEgyptian()).toBe(false);

    triangle.resize({ a: 3, b: 4, c: 5 });

    expect(triangle.isIsosceles()).toBe(false);
    expect(triangle.isEquilateral()).toBe(false);
    expect(triangle.isEgyptian()).toBe(true);
  });

  it("should calculate area after resize", () => {
    const triangle = new Triangle({ a: 1, b: 1, c: 1 });

    expect(triangle.area).toBeCloseTo(0.43);

    triangle.resize({ a: 3, b: 4, c: 5 });

    expect(triangle.area).toBe(6);
  });

  it("should calculate perimeter after resize", () => {
    const triangle = new Triangle({ a: 1, b: 1, c: 1 });

    expect(triangle.perimeter).toBe(3);

    triangle.resize({ a: 3, b: 4, c: 5 });

    expect(triangle.perimeter).toBe(12);
  });

  it("should store correct side values after resize", () => {
    const triangle = new Triangle({ a: 1, b: 1, c: 1 });

    expect(triangle.sideValues).toStrictEqual([1, 1, 1]);

    triangle.resize({ a: 3, b: 4, c: 5 });

    expect(triangle.sideValues).toStrictEqual([3, 4, 5]);
  });
});
