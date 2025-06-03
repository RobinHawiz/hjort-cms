import "@styles/style.scss";
import { initNav, removeLoader } from "@ts/utils/ui";
import { initSmoothScroll } from "@ts/utils/ui";
import { getReservations } from "./getReservations";
import { createReservationsHtml } from "./createReservationsHtml";
import { displayReservations } from "./displayReservations";
import { isUserAuth } from "@ts/utils/api";

/**
 * Entry point for the bokningar page.
 */
async function main(): Promise<void> {
  if (!(await isUserAuth())) {
    window.location.replace("/hjort-cms/");
  }
  initSmoothScroll();
  initNav();
  const reservations = await getReservations();
  const fragment = await createReservationsHtml(reservations);
  displayReservations(fragment);
  removeLoader();
}

main();
