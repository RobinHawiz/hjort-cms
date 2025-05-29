import { ResponseError } from "@ts/types";
import { displayError } from "@ts/utils/dom";

/**
 * Handles API response errors by logging them to the console.
 * Certain types, such as those with the "network" or "internal" fields, are also displayed to the user.
 *
 * @param elemToAppend - The element to which an error message should be appended
 * @param error - A structured API response error
 */
export function handleGlobalError(elemToAppend: Element, error: ResponseError) {
  console.error(`${error.field}: ${error.message}`);
  if (error.field === "network") {
    displayError(elemToAppend, "Could not connect to service :(");
  } else if (error.field === "internal") {
    displayError(
      elemToAppend,
      "Something went wrong when trying to use the service :("
    );
  }
}
