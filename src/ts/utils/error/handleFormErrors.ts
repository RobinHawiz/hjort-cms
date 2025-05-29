import { ResponseError } from "@ts/types";
import { handleGlobalError, isGlobalError } from "@ts/utils/error";
import { displayError } from "../dom";

/**
 * Handles both global and field-level errors for the reservation form.
 *
 * @param elemToAppend - The element to which an error message will be appended
 * @param errors - An Array of structured API response errors
 */
export function handleFormErrors(
  errors: Array<ResponseError>,
  elemToAppend: Element
): void {
  for (const err of errors) {
    if (isGlobalError(err)) {
      handleGlobalError(document.body, err);
    } else {
      displayError(elemToAppend, err.message);
    }
  }
}
