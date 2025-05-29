import { isHtmlElement } from "@ts/utils/dom/isHtmlElement";
import { ToggleButton } from "@ts/utils/ui";

export function initNav(): void {
  const NAV_SELECTOR = "nav";
  const TOGGLE_BUTTON_SELECTOR = ".toggle-button";

  const nav = document.querySelector(NAV_SELECTOR);
  if (!isHtmlElement(nav, NAV_SELECTOR)) return;

  const button = document.querySelector(
    `button${TOGGLE_BUTTON_SELECTOR}`
  ) as HTMLButtonElement | null;
  if (!isHtmlElement(button, TOGGLE_BUTTON_SELECTOR)) return;

  button.addEventListener("click", () => {
    const toggleButton = new ToggleButton(button);
    handleClickEvent(toggleButton, nav);
  });
}

function handleClickEvent(toggleButton: ToggleButton, nav: HTMLElement): void {
  toggleButton.toggleOpen();
  nav.classList.toggle("closed");
}
