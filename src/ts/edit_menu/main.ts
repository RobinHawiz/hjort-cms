import "@styles/style.scss";
import { initNav, removeLoader } from "@ts/utils/ui";
import { initSmoothScroll } from "@ts/utils/ui";
import { isUserAuth } from "@ts/utils/api";
import { getCourseMenuData } from "./getCourseMenuData";
import { createCourseMenuEditFormsHtml } from "./createCourseMenuEditFormsHtml";
import { displayCourseMenuEditForms } from "./displayCourseMenuEditForms";

async function main(): Promise<void> {
  if (!(await isUserAuth())) {
    window.location.replace("/hjort-cms/");
  }
  initSmoothScroll();
  initNav();
  removeLoader();
  const courseMenuObjects = await getCourseMenuData();
  const fragment = await createCourseMenuEditFormsHtml(courseMenuObjects);
  displayCourseMenuEditForms(fragment);
}

main();
