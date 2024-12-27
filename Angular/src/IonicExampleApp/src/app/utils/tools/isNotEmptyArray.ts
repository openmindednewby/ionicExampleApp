import { isValueDefined } from "./isValueDefined";

/**
 * Checks if the provided value is a non-empty array.
 *
 * @param value - The array to check. It can be undefined.
 * @returns `true` if the value is a defined array with at least one element, otherwise `false`.
 */
export function isNotEmptyArray(value?: any[]): boolean {
    return isValueDefined(value) && value!.length > 0;
}
