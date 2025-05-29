import { isHtmlElement } from "../dom";

export function removeLoader(): void {
  const LOADER_CONTAINER_SELECTOR = ".loader-container";
  const loader = document.querySelector(LOADER_CONTAINER_SELECTOR);

  if (!isHtmlElement(loader, LOADER_CONTAINER_SELECTOR)) return;

  loader.classList.add("remove");
}
