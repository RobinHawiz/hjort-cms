import { ResponseError } from "@ts/types";

/**
 * Determines whether a response error represents a global failure, such as a network or internal server issue.
 *
 * @param error - A structured API response error to evaluate
 * @returns True if the error field indicates a non-field-specific issue, otherwise false
 */
export function isGlobalError(error: ResponseError): boolean {
  return error.field === "network" || error.field === "internal" ? true : false;
}
