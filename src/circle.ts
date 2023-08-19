import { Shape, ShapeParams } from "./shape";

export interface CircleParams extends ShapeParams {
  radius: number;
}

export class Circle extends Shape<CircleParams> {
  /**
   * Constructor for creating an instance of a circle.
   *
   * @param {number} params - The radius of the circle.
   * @param {boolean} [isAbstractDimensionsAllowed=false] - Whether abstract dimensions (negative values) are allowed.
   * @throws {Error} If abstract dimensions are disallowed and a negative radius is provided.
   */
  constructor(
    public params: CircleParams,
    public isAbstractDimensionsAllowed: boolean = false
  ) {
    if (!isAbstractDimensionsAllowed && params.radius < 0)
      throw new Error(
        "Invalid Circle. Radius must be greater than 0, or the isAbstractDimensionsAllowed flag must be enabled."
      );
    super(params, isAbstractDimensionsAllowed);
  }

  /**
   * Calculation the diameter of the circle.
   *
   * @returns {number} The diameter of the circle.
   */
  public get diameter(): number {
    return 2 * this.params.radius;
  }

  /**
   * Calculation the area of the circle.
   *
   * @returns {number} The area of the circle.
   */
  public get area(): number {
    return Math.PI * this.params.radius ** 2;
  }

  /**
   * Calculation the circumference of the circle.
   *
   * @returns {number} The circumference of the circle.
   */
  public get circumference(): number {
    return Math.PI * this.diameter;
  }
}
