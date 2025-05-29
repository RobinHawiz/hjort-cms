/**
 * Checks whether a given HTML element exists and logs an error if not.
 *
 * @param elem - The HTML element to verify.
 * @param selector - The selector string used to attempt to locate the element.
 * @returns True if the element does exist, otherwise false
 */
export function isHtmlElement(
  elem: Element | null,
  selector: string
): elem is HTMLElement {
  if (!elem) {
    console.error(
      `The HTML element with id/class: "${selector}" does not exist.`
    );
    return false;
  }
  return true;
}
