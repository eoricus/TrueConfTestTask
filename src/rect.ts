import { Shape, ShapeParams } from "./shape";

export interface RectParams extends ShapeParams {
  width: number;
  height: number;
}

export class Rect extends Shape<RectParams> {
  /**
   * Constructor of a rectangle.
   *
   * @param {Params} params - The width and height of the rectangle. - The height of the rectangle.
   * @param {boolean} isAbstractDimensionsAllowed - Whether abstract dimensions (< 0) are allowed.
   * @throws {Error} If abstract dimensions are disallowed and negative or zero values are provided.
   */
  constructor(
    public params: RectParams,
    public isAbstractDimensionsAllowed: boolean = false
  ) {
    if (
      !isAbstractDimensionsAllowed &&
      (params.width < 0 || params.height < 0)
    ) {
      throw new Error("Width and height must be positive numbers");
    }

    super(params);
  }

  /**
   * Calculation the area of the rectangle.
   *
   * @returns {number} The area of the rectangle.
   */
  public get area(): number {
    return this.params.width * this.params.height;
  }

  /**
   * Calculation the diameter of the rectangle.
   *
   * @returns {number} The diameter of the rectangle.
   */
  public get diameter(): number {
    return Math.sqrt(this.params.width ** 2 + this.params.height ** 2);
  }

  /**
   * Calculation the perimeter of the rectangle.
   *
   * @returns {number} The perimeter of the rectangle.
   */
  public get perimeter(): number {
    return 2 * (this.params.width + this.params.height);
  }

  /**
   * Check if the rectangle is a square.
   *
   * @returns {boolean} True if the rectangle is a square, otherwise false.
   */
  public isSquare(): boolean {
    return this.params.width === this.params.height;
  }

  /**
   * Check if the rectangle is horizontally.
   *
   * @returns {boolean} True if the rectangle is horizontal, otherwise false.
   */
  public isHorizontal(): boolean {
    return this.params.width > this.params.height;
  }

  /**
   * Check if the rectangle is vertically.
   *
   * @returns {boolean} True if the rectangle is vertical, otherwise false.
   */
  public isVertical(): boolean {
    return this.params.width < this.params.height;
  }

  /**
   * Creation a square with the specified side length.
   *
   * @param {number} side - The length of the square's side.
   * @param {boolean} isAbstractDimensionsAllowed - Whether abstract dimensions (< 0) are allowed.
   * @returns {Rect} An instance of the Rectangle class representing a square.
   */
  public static createSquareFromSide(
    side: number,
    isAbstractDimensionsAllowed: boolean = false
  ): Rect {
    return new Rect({ width: side, height: side }, isAbstractDimensionsAllowed);
  }

  /**
   * Creation a square with the specified diameter length.
   *
   * @param {number} diameter - The length of the square's side.
   * @param {boolean} isAbstractDimensionsAllowed - Whether abstract dimensions (< 0) are allowed.
   * @returns {Rect} An instance of the Rectangle class representing a square.
   */
  public static createSquareFromDiameter(
    diameter: number,
    isAbstractDimensionsAllowed: boolean = false
  ): Rect {
    const side = diameter / Math.sqrt(2);

    return Rect.createSquareFromSide(side, isAbstractDimensionsAllowed);
  }
}
