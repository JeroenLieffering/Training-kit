/**
 * Truncates the given `text` based on the given `limit`.
 *
 * For example:
 *
 * `truncate("Hello world", 3) // 'Hel...'`
 *
 * If the text is already small enough it does nothing:
 *
 * `truncate("Hello world", 100) // 'Hello world'`
 *
 * @param text The text you want to truncate
 * @param limit The limit at which to truncate.
 * @returns The truncated text.
 */
export function truncate(text: string, limit: number): string {
  return `${text.substring(0, limit)}${text.length > limit ? '...' : ''}`;
}

/**
 * Takes a number and turns it into a string but also adds a leading
 * zero if the value is less than 9.
 *
 * For example:
 *
 * 1. `padZero(10) // '10'`
 *
 * 2. `padZero(9)  // '09'`
 *
 * 3. `padZero(0)  // '00'`
 *
 * @param value The number you want to turn into a string and append with zero is necessary
 * @returns The number as a string with padding
 */
export function padZero(value: number): string {
  if (value < 10) {
    return '0' + value;
  } else {
    return value.toString();
  }
}
