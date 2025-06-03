import "@styles/style.scss";
import { initNav, removeLoader } from "@ts/utils/ui";
import { initSmoothScroll } from "@ts/utils/ui";
import { isUserAuth } from "@ts/utils/api";
import { getCourseMenuData } from "./getCourseMenuData";
import { createCourseMenuEditFormsHtml } from "./createCourseMenuEditFormsHtml";
import { displayMenuEditForms } from "./displayMenuEditForms";
import { getDrinkMenuData } from "./getDrinkMenuData";
import { createDrinkMenuEditFormsHtml } from "./createDrinkMenuEditFormsHtml";

/**
 * Entry point for the redigera-meny page.
 */
async function main(): Promise<void> {
  if (!(await isUserAuth())) {
    window.location.replace("/hjort-cms/");
  }
  initSmoothScroll();
  initNav();
  removeLoader();
  const [courseMenuObjects, drinkMenuObjects] = await Promise.all([
    getCourseMenuData(),
    getDrinkMenuData(),
  ]);

  const CourseMenuFragment = createCourseMenuEditFormsHtml(courseMenuObjects);
  const DrinkMenuFragment = createDrinkMenuEditFormsHtml(drinkMenuObjects);
  displayMenuEditForms(CourseMenuFragment);
  displayMenuEditForms(DrinkMenuFragment);
}

main();
