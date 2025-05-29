import { ResponseError } from "@ts/types";

/**
 * A type guard function used for differentiating between response errors and other types of errors.
 *
 * The function checks if the error:
 *
 * - Is an object
 * - Has a property named field
 * - Has a property named message
 *
 * @param error - The error to type check
 * @returns True if the error is a ResponseError, otherwise false
 */
export function isResponseError(error: unknown): error is ResponseError {
  return typeof error === "object" && "field" in error! && "message" in error!;
}
