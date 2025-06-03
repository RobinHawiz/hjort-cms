import { isHtmlElement } from "@ts/utils/dom";

export function displayMenuEditForms(fragment: DocumentFragment) {
  const FORM_CONTAINER_SELECTOR = ".form-container";
  const formContainer = document.querySelector(FORM_CONTAINER_SELECTOR);

  if (!isHtmlElement(formContainer, FORM_CONTAINER_SELECTOR)) return;

  formContainer.appendChild(fragment);
}
