/**
 * Creates an array with from 1 to end.
 *
 * ```ts
 * range(5) // [1, 2, 3, 4, 5]
 * ```
 *
 * @param end The last number in the array
 * @returns An array containing the numbers 1 to end.
 */
export function range(end: number): number[] {
  return Array(end)
    .fill(0)
    .map((x, i) => i + 1);
}
