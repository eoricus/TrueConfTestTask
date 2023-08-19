import { Rect } from "../src";
import { describe, expect } from "@jest/globals";

describe("Rect Class", () => {
  const rect = new Rect({ width: 5, height: 4 });

  it("should create a Rect instance", () => {
    expect(rect).toBeInstanceOf(Rect);
  });

  it("should calculate area correctly", () => {
    expect(rect.area).toBe(20);
  });

  it("should calculate diameter correctly", () => {
    expect(rect.diameter).toBeCloseTo(6.4031, 4);
  });

  it("should calculate perimeter correctly", () => {
    expect(rect.perimeter).toBe(18);
  });

  it("should check if rect is a square", () => {
    const square = new Rect({ width: 5, height: 5 });

    expect(square.isSquare()).toBe(true);
    expect(rect.isSquare()).toBe(false);
  });

  it("should check if rect is horizontal", () => {
    const horizontalRect = new Rect({ width: 10, height: 5 });
    const verticalRect = new Rect({ width: 5, height: 10 });

    expect(horizontalRect.isHorizontal()).toBe(true);
    expect(verticalRect.isHorizontal()).toBe(false);
  });

  it("should check if rect is vertical", () => {
    const horizontalRect = new Rect({ width: 10, height: 5 });
    const verticalRect = new Rect({ width: 5, height: 10 });

    expect(horizontalRect.isVertical()).toBe(false);
    expect(verticalRect.isVertical()).toBe(true);
  });

  it("should create a square by side length", () => {
    const square = Rect.createSquareFromSide(7);

    expect(square.params.width).toBe(7);
    expect(square.params.height).toBe(7);
  });

  it("should create a square by diameter length", () => {
    const square = Rect.createSquareFromDiameter(10);

    expect(square.params.width).toBeCloseTo(7.071, 3);
    expect(square.params.height).toBeCloseTo(7.071, 3);
  });

  it("should calculate diameter/area/perimeter correctly after resizing", () => {
    const rect = new Rect({ width: 5, height: 4 });
    rect.resize({ width: 1, height: 1 });

    expect(rect.perimeter).toBe(4);
    expect(rect.area).toBeCloseTo(1);
    expect(rect.diameter).toBeCloseTo(Math.sqrt(2));
  });

  it("should calculate diameter/area/perimeter correctly after stretching", () => {
    const rect = new Rect({ width: 1, height: 1 });
    rect.stretch({ width: 9, height: 9 });

    expect(rect.perimeter).toBe(40);
    expect(rect.area).toBeCloseTo(100);
    expect(rect.diameter).toBeCloseTo(Math.sqrt(200));
  });

  it("should calculate diameter/area/perimeter correctly after stretching by ratio", () => {
    const rect = new Rect({ width: 10, height: 10 });
    rect.stretchByRatio({ width: 0.5, height: 0.5 });

    expect(rect.perimeter).toBe(20);
    expect(rect.area).toBeCloseTo(25);
    expect(rect.diameter).toBeCloseTo(Math.sqrt(50));
    expect(rect.isSquare()).toBe(true);
  });
});
