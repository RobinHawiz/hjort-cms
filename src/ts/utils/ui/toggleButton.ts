/**
 * Encapsulates burger menu button behavior for toggling opened state and maintaining accessibility via ARIA attributes.
 */
export class ToggleButton {
  constructor(private readonly button: HTMLButtonElement) {}

  toggleOpen(): void {
    this.button.classList.toggle("opened");
    this.updateAria();
  }

  private updateAria(): void {
    const isOpened = this.button.classList.contains("opened");
    const ariaLabel = isOpened ? "Stäng meny" : "Öppna meny";
    this.button.setAttribute("aria-expanded", isOpened.toString());
    this.button.setAttribute("aria-label", ariaLabel);
  }
}
