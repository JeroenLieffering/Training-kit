/**
 * Takes a TypeScript type object and keeps only the keys / properties
 * that match.
 *
 * For example:
 *
 * ```ts
 * type SomeType = { a: number, b: string, _c: null, _d: boolean};
 * PickStartingWith<keyof SomeType, '_'>
 * ```
 *
 * Results in a new type which has only the keys / propserties that
 * start with an underscore:
 *
 * ```ts
 * { _c: null, _d: boolean}
 * ```
 */
export type PickStartingWith<
  Set,
  Needle extends string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = Set extends `${Needle}${infer _X}` ? Set : never;
