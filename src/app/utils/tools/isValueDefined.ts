/**
 * Checks if a value is defined (i.e., not `undefined` and not `null`).
 *
 * @param value - The value to check.
 * @returns `true` if the value is defined, otherwise `false`.
 */
export function isValueDefined(value: any): boolean {
    return value !== undefined && value !== null;
}
