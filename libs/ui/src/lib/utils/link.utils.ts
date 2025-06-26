/**
 * Type check function to check if value is a string
 */
export function isExternalString(
  external: boolean | string,
): external is string {
  return typeof external === 'string';
}
