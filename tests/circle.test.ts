import { Circle } from "../src";
import { describe, expect } from "@jest/globals";

describe("Circle", () => {
  // Mock CircleParams for testing
  const circle = new Circle({ radius: 5 });

  it("should create a Circle instance", () => {
    expect(circle).toBeInstanceOf(Circle);
  });

  it("should throw an error for creating an invalid Circle", () => {
    expect(() => new Circle({ radius: -34 })).toThrowError();
  });

  it("should not throw an error for creating an Circle with a negative radius", () => {
    expect(new Circle({ radius: -34 }, true)).toBeInstanceOf(Circle);
  });

  it("should calculate diameter correctly", () => {
    expect(circle.diameter).toBe(10);
  });

  it("should calculate area correctly", () => {
    expect(circle.area).toBeCloseTo(78.5398, 4);
  });

  it("should calculate circumference correctly", () => {
    expect(circle.circumference).toBeCloseTo(31.4159, 4);
  });

  it("should calculate diameter/area/circumference correctly after resizing", () => {
    circle.resize({ radius: 34 });

    expect(circle.diameter).toBe(68);
    expect(circle.area).toBeCloseTo(3631.68);
    expect(circle.circumference).toBeCloseTo(213.63);
  });

  it("should calculate diameter/area/circumference correctly after stretching", () => {
    const circle = new Circle({ radius: 5 });
    circle.stretch({ radius: 29 });

    expect(circle.diameter).toBe(68);
    expect(circle.area).toBeCloseTo(3631.68);
    expect(circle.circumference).toBeCloseTo(213.63);
  });

  it("should calculate diameter/area/circumference correctly after stretching by ratio", () => {
    const circle = new Circle({ radius: 17 });
    circle.stretchByRatio({ radius: 2 });

    expect(circle.diameter).toBe(68);
    expect(circle.area).toBeCloseTo(3631.68);
    expect(circle.circumference).toBeCloseTo(213.63);
  });
});
