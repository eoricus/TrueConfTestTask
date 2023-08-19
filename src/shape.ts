/**
 * To use shapes as event target (listening for size changes or other),
 * since customEvent doesn't work on node.js
 *
 * NOTE: SHOULD BY REPLACED TO EventTarget,
 *       if the library is used on the front projects
 */
import { EventEmitter } from "events";

export type ShapeParams = Record<string, number>;

/**
 * An abstract shape class, contatin base properties and methods.
 *
 * @typeparam Params - The type of parameters for the shape (sides, radius, etc.).
 */
export abstract class Shape<Params extends ShapeParams> extends EventEmitter {
  /**
   *
   */
  private readonly invalidShapeMessage: string = `Invalid ${this.constructor.name}. Shape parameter values must not be negative, or the isAbstractDimensionsAllowed flag must be enabled.`;

  /**
   * Constructor of a shape.
   *
   * @param {Params} params - Parameters of the shape.
   * @param {boolean} isAbstractDimensionsAllowed - Whether abstract dimensions are allowed (zero or negative values).
   */
  constructor(
    public params: Params,
    public isAbstractDimensionsAllowed: boolean = false
  ) {
    super();
  }

  /**
   * Virtual getter for calculating the area of a shape
   *
   * @returns {number | null} The area of the shape, or null, if shape is abstract.
   */
  abstract get area(): number | null;

  /**
   * Resizes the shape by applying partial parameter changes.
   *
   * @param {Partial<Params>} params - Parameters or part of parameters, for resize.
   * @returns Resized shape instance.
   * @throws When negative and zero dimensions are set, if such dimensions are
   * prohibited( isAbstractDimensionsAllowed is false)
   */
  async resize(params: Partial<Params>): Promise<this> {
    const previousValues: ShapeParams = { ...this.params };

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        if (!this.isAbstractDimensionsAllowed && value < 0) {
          throw new Error(
            this.invalidShapeMessage +
              `\n\nThe values you entered: {${key}: ${value}}.`
          );
        }

        this.params[key as keyof Params] = value;
      }
    });

    this.emit("sizeChange", {
      detail: {
        newValues: this.params,
        previousValues: previousValues,
        isStretched: false,
      },
    });

    return this;
  }

  /**
   * Stretches the shape by adding values to its dimensions.
   *
   * @param {Partial<Params>} params - Parameters or part of parameters, which should be stretched.
   * @returns Stretched shape instance.
   * @throws When the sum of the values and the sum is less than zero, if such dimensions are
   * prohibited( isAbstractDimensionsAllowed is false)
   */
  async stretch(params: Partial<Params>): Promise<this> {
    const previousValues: Params = { ...this.params };

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        let newValue = value + this.params[key];

        if (!this.isAbstractDimensionsAllowed && newValue < 0) {
          throw new Error(
            this.invalidShapeMessage +
              `\n\nThe values you entered: {${key}: ${value}}.`
          );
        }

        this.params[key as keyof Params] = newValue as Params[keyof Params];
      }
    });

    this.emit("sizeChange", {
      detail: {
        newValues: this.params,
        previousValues: previousValues,
        isStretched: true,
      },
    });

    return this;
  }

  /**
   * Stretches the shape by multiplying its dimensions with ratio values.
   *
   * @param {Partial<Params>} params - Parameters or part of parameters, which should be stretched.
   * @returns Stretched shape instance.
   * @throws When negative and zero dimensions are set, if such dimensions are
   * prohibited( isAbstractDimensionsAllowed is false)
   */
  async stretchByRatio(params: Partial<Params>): Promise<this> {
    const previousValues: Params = { ...this.params };

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        let newValue = value * this.params[key];

        if (!this.isAbstractDimensionsAllowed && newValue < 0) {
          throw new Error(
            this.invalidShapeMessage +
              `\n\nThe values you entered: {${key}: ${value}}.`
          );
        }

        this.params[key as keyof Params] = newValue as Params[keyof Params];
      }
    });

    this.emit("sizeChange", {
      detail: {
        newValues: this.params,
        previousValues: previousValues,
        isStretched: true,
      },
    });

    return this;
  }
}
