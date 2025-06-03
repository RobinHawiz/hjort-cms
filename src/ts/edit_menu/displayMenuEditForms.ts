import { isHtmlElement } from "@ts/utils/dom";

/**
 * Inserts a given HTML fragment into the menu editing UI.
 *
 * Specifically targets `.form-container`, which is expected to be present
 * in the DOM when editing a menu.
 */
export function displayMenuEditForms(fragment: DocumentFragment): void {
  const FORM_CONTAINER_SELECTOR = ".form-container";
  const formContainer = document.querySelector(FORM_CONTAINER_SELECTOR);

  if (!isHtmlElement(formContainer, FORM_CONTAINER_SELECTOR)) return;

  formContainer.appendChild(fragment);
}
