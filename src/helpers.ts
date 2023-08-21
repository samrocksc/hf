/**
 * Checks if the function is an array
 */
export const isObject = (value: JSONValue) =>
  value && typeof value === "object" && value.constructor === Object && value;

export const isArray = (value: JSONValue) =>
  value && typeof value === "object" && value.constructor === Array && value;

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

export type JSONValue =
  | string
  | number
  | boolean
  | { [key: string]: JSONValue }
  | Array<JSONValue>;
