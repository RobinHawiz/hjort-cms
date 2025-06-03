import "@styles/style.scss";
import { initNav } from "@ts/utils/ui";
import { initSmoothScroll } from "@ts/utils/ui";
import { initLogin } from "./login";

/**
 * Entry point for the login page.
 */
function main(): void {
  initSmoothScroll();
  initNav();
  initLogin();
}

main();
