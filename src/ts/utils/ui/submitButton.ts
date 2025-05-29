/**
 * Encapsulates button behavior for toggling loading state, enabling/disabling interaction, and maintaining accessibility via ARIA attributes.
 */
export class SubmitButton {
  constructor(private readonly button: HTMLButtonElement) {}

  showLoader(): void {
    this.button.classList.add("loading");
  }

  hideLoader(): void {
    this.button.classList.remove("loading");
  }

  enable(): void {
    this.button.disabled = false;
    this.updateAriaDisabled();
  }

  disable(): void {
    this.button.disabled = true;
    this.updateAriaDisabled();
  }

  private updateAriaDisabled(): void {
    this.button.setAttribute("aria-disabled", this.button.disabled.toString());
  }
}
