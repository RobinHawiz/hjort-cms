/**
 * Renders and displays an error message to the user.
 *
 * @param elemToAppend - The element to which an error message will be appended
 * @param message - The error message to display
 */
export function displayError(elemToAppend: Element, message: string): void {
  const errorElem = document.createElement("p");
  errorElem.setAttribute("class", "error");
  errorElem.innerText = message;
  elemToAppend.insertBefore(errorElem, elemToAppend.firstChild);
}
