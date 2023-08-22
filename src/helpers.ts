/**
 * Checks if the function is an array
 */
export const isObject = (value: JSONValue) =>
  value && typeof value === "object" && value.constructor === Object && value;

/**
 * Validates if the value is a scalar value or compound.
 */
export const isValueScalar = (value: unknown) => {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  );
};

/**
 * This should be all possible types of data that can
 * be passed to the JSON.stringify function.
 */
export type JSONValue =
  | string
  | number
  | boolean
  | { [key: string]: JSONValue }
  | Array<JSONValue>;
