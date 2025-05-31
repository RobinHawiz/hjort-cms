import { isHtmlElement } from "@ts/utils/dom";

export function displayReservations(fragment: DocumentFragment) {
  const SECTION_SELECTOR = "section";
  const section = document.querySelector(SECTION_SELECTOR);

  if (!isHtmlElement(section, SECTION_SELECTOR)) return;

  section.appendChild(fragment);
}
