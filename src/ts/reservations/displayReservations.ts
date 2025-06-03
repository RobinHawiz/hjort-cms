import { isHtmlElement } from "@ts/utils/dom";

/**
 * Inserts a given HTML fragment into the reservation editing UI.
 *
 * Specifically targets `section`, which is expected to be present
 * in the DOM when editing a reservation.
 */
export function displayReservations(fragment: DocumentFragment) {
  const SECTION_SELECTOR = "section";
  const section = document.querySelector(SECTION_SELECTOR);

  if (!isHtmlElement(section, SECTION_SELECTOR)) return;

  section.appendChild(fragment);
}
