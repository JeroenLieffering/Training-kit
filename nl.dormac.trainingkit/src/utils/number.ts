/**
 * Takes a value which is a string and parses it as a number.
 *
 * If the parsing fails or when the value is undefined the
 * `defaultValue` is returned.
 *
 * @param value The string value you want to parse as a number.
 * @param defaultValue The value to return if the parsing fails.
 * @returns A value as a number or the `defaultValue`.
 */
export function parseAsNumber(
  value: string | undefined,
  defaultValue: number,
): number {
  if (value === undefined || value === '') {
    return defaultValue;
  }

  let number = parseFloat(value);
  number = Number.isNaN(number) ? defaultValue : number;
  return number;
}

/**
 * Takes a string and returns whether or not it can be parsed as
 * a floating point number.
 *
 * @param value The string you want to check if it is a number.
 * @returns Whether or not the string can be parsed aas a number.
 */
export function isNumber(value: string): boolean {
  const number = parseFloat(value);
  return Number.isNaN(number) === false;
}

/**
 * Returns a random integer between the min and the max values.
 *
 * @param min The minimum value the random integer can be.
 * @param max The maximum value the random integer can be.
 * @returns A random integer between min and max.
 */
export function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Takes three numbers the value, the min, and the max number and
 * clamps the value to the min and the max. This way you can make sure
 * a number is always between a certain range.
 *
 * If the value is less than the min the returned value is the min.
 * If the value is more than the max the returned value is the max.
 *
 * For example:
 *
 * ```js
 * clamp(50, 0, 100)  // returns 50
 * clamp(-1, 0, 100)  // returns 0
 * clamp(101, 0, 100) // returns 100
 * ```
 *
 * @param value
 * @param min
 * @param max
 * @returns
 */
export function clamp(value: number, min: number, max: number) {
  return Math.max(Math.min(value, max), min);
}
