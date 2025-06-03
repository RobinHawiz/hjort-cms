import {
  CourseMenuObj,
  CourseMenuPayload,
  CoursePayload,
  CourseType,
  CourseUpdatePayload,
} from "@ts/types";
import { CourseMenuAPI } from "@ts/utils/api";
import { displayError, escapeHtml } from "@ts/utils/dom";
import { isResponseError } from "@ts/utils/error";
import { SubmitButton } from "@ts/utils/ui";

type OperationType = "none" | "add" | "delete" | "update";

/**
 * A DOM factory for rendering an edit form for editing course menu and course entries.
 *
 * @param courseMenuObjects - The course menu and course entries to render within the edit form.
 * @returns A DocumentFragment containing the rendered elements.
 */
export async function createCourseMenuEditFormsHtml(
  courseMenuObjects: Array<CourseMenuObj>
): Promise<DocumentFragment> {
  const fragment = document.createDocumentFragment();
  courseMenuObjects.forEach((courseMenuObj) => {
    const courseMenu = courseMenuObj.courseMenu;
    const courses = courseMenuObj.courses;
    const form = document.createElement("form");
    form.dataset.id = courseMenu.id;
    form.innerHTML = `
              <form>
            <div class="input-box-wrapper">
              <h2 id="menu-title">Meny huvudrubrik</h2>
              <div class="input-box">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value="${escapeHtml(courseMenu.title)}"
                  aria-labelledby="menu-title"
                />
              </div>
            </div>
            <div class="input-box-wrapper">
              <h3 id="starter-title">Förrätter</h3>
              <button
                type="button"
                data-type="starter"
                class="add-course"
                aria-label="Lägg till en maträtt"
              >
                <img src="../plus.svg" alt="Plus ikon" />
              </button>
            </div>
            <div class="input-box-wrapper">
              <h3 id="main-title">Huvudrätter</h3>
              <button
                type="button"
                data-type="main"
                class="add-course"
                aria-label="Lägg till en maträtt"
              >
                <img src="../plus.svg" alt="Plus ikon" />
              </button>
            </div>
            <div class="input-box-wrapper">
              <h3 id="dessert-title">Efterrätter</h3>
              <button
                type="button"
                data-type="dessert"
                class="add-course"
                aria-label="Lägg till en maträtt"
              >
                <img src="../plus.svg" alt="Plus ikon" />
              </button>
            </div>
            <div class="input-box-wrapper">
              <h3 id="price-title">Pris (kr)</h3>
              <div class="input-box">
                <input
                  type="text"
                  name="priceTot"
                  value="${courseMenu.priceTot}"
                  aria-labelledby="price-title"
                />
              </div>
            </div>
            <button type="submit" class="update" aria-label="Uppdatera meny">
              <img src="../refresh.svg" alt="Uppdatera ikon" />
              <p>Uppdatera</p>
            </button>
          </form>
    `;

    const inputBoxWrappers = form.querySelectorAll(".input-box-wrapper");
    const btnsAddCourse = form.querySelectorAll(
      "button.add-course"
    ) as NodeListOf<HTMLElement>;
    let index = 1;
    courses.forEach((course) => {
      const inputBox = createInputBox(
        course.name,
        course.type,
        "none",
        course.id
      );

      const displayedInput = inputBox.querySelector(
        "input:nth-child(1)"
      )! as HTMLInputElement;
      const hiddenInput = inputBox.querySelector(
        "input:nth-child(2)"
      )! as HTMLInputElement;

      /* Update functionality */

      displayedInput.addEventListener("input", () => {
        changeInputOperation(hiddenInput, "update");
      });

      /* Delete functionality */

      const deleteButton = inputBox.querySelector(
        "button.delete"
      )! as HTMLButtonElement;
      deleteButton.addEventListener("click", () => {
        deleteButton.classList.toggle("to-be-deleted");
        if (deleteButton.classList.contains("to-be-deleted")) {
          changeInputOperation(hiddenInput, "delete");
          displayedInput.classList.add("delete");
        } else {
          changeInputOperation(hiddenInput, "none");
          displayedInput.classList.remove("delete");
        }
      });

      displayInputBox(inputBoxWrappers, btnsAddCourse, inputBox, course.type);

      index++;
    });

    /* Add functionality */

    btnsAddCourse.forEach((addBtn) => {
      addBtn.addEventListener("click", () => {
        const courseType = addBtn.dataset.type as
          | "starter"
          | "main"
          | "dessert";
        const inputBox = createInputBox("", courseType, "add");
        displayInputBox(inputBoxWrappers, btnsAddCourse, inputBox, courseType);
      });
    });

    form.addEventListener("submit", handleOnSubmit);
    fragment.appendChild(form);
  });
  return fragment;
}

async function handleOnSubmit(e: SubmitEvent) {
  e.preventDefault();

  const updateButton = e.submitter as HTMLButtonElement;
  const submitButton = new SubmitButton(updateButton);
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const api = new CourseMenuAPI();

  const courseMenuPayload: CourseMenuPayload = {
    title: String(formData.get("title")),
    priceTot: Number(formData.get("priceTot")),
  };

  // Clear any previous errors shown
  document.body.classList.remove("validation-error");
  document.querySelector(".error")?.classList.add("hide");
  setTimeout(() => {
    document.querySelector(".error")?.remove();
  }, 200);

  submitButton.disable();
  submitButton.showLoader();
  setTimeout(async () => {
    try {
      await api.updateCourseMenu(form.dataset.id!, courseMenuPayload);

      const courseNames = formData.getAll("course");
      const courseIdsTypesOps = formData.getAll("id&type&op");
      await Promise.all(
        courseNames.map(async (courseName, i) => {
          const name = String(courseName);
          const courseIdTypeOpArr = String(courseIdsTypesOps[i]).split("&");
          const [id, type, op] = courseIdTypeOpArr;

          switch (op) {
            case "add":
              await api.insertCourse({
                courseMenuId: form.dataset.id,
                name,
                type,
              } as CoursePayload);
              break;
            case "update":
              await api.updateCourse(id, {
                name,
                type,
              } as CourseUpdatePayload);
              break;
            case "delete":
              await api.deleteCourse(id);
              break;
            default:
              // Do nothing
              break;
          }
        })
      );
      setTimeout(() => {
        /*
      Delay alert by 1ms to allow DOM updates (hide loader, enable button)
      before the blocking alert() call freezes the main thread
      */
        window.alert("Updateringen är färdig!");
        location.reload();
      }, 1);

      submitButton.enable();
      submitButton.hideLoader();
    } catch (error: any) {
      submitButton.enable();
      submitButton.hideLoader();
      if (isResponseError(error[0])) {
        console.log(error);
        if (error[0].field === "name") {
          displayError(
            document.body,
            "Ett inmatningsfält är tomt. Alla fält måste vara ifyllda om du vill lägga till eller uppdatera maträtter."
          );
        } else if (error[0].field === "network") {
          displayError(
            document.body,
            "Det uppstod ett nätverksfel. Kontrollera din internetanslutning."
          );
        } else {
          displayError(
            document.body,
            "Det uppstod ett oväntat fel. Vänligen uppdatera sidan."
          );
        }
      } else {
        displayError(document.body, "Unexpected app error");
      }
    }
  }, 400);
}

function changeInputOperation(
  hiddenInput: HTMLInputElement,
  operation: string
): void {
  let [id, type, op] = hiddenInput.value.split("&");
  op = operation;
  hiddenInput.value = [id, type, op].join("&");
}

function createInputBox(
  courseName: string,
  courseType: CourseType,
  op: OperationType,
  courseId = ""
): HTMLElement {
  const inputBox = document.createElement("div");
  inputBox.classList.add("input-box");
  /* 
    There's an Input with type hidden which has name="id&type&op" which represent 
    course id, course type values and which operation is to be executed on that specific input. Example values:
    - 2&starter&update
    - 3&starter&delete
    - 4&main&add
    - 4&main&none
    The symbol & is used as a seperator in order to access these values with the method .split("&")
    */
  if (courseId.length !== 0) {
    inputBox.innerHTML = `
                <input
                  type="text"
                  name="course"
                  value="${escapeHtml(courseName)}"
                  aria-labelledby="${courseType}-title"
                />
                <input
                  type="hidden"
                  name="id&type&op"
                  value="${courseId}&${courseType}&${op}"
                />
                <button
                  type="button"
                  class="delete"
                  aria-label="Ta bort maträtt"
                >
                  <img src="../trash.svg" alt="Skräpkorg ikon" />
                </button>
    `;
  } else {
    inputBox.innerHTML = `
                <input
                  type="text"
                  name="course"
                  value="${escapeHtml(courseName)}"
                  aria-labelledby="${courseType}-title"
                />
                <input
                  type="hidden"
                  name="id&type&op"
                  value="null&${courseType}&${op}"
                />
    `;
  }

  return inputBox;
}

function displayInputBox(
  inputBoxWrappers: NodeListOf<Element>,
  btnsAddCourse: NodeListOf<Element>,
  inputBox: HTMLElement,
  courseType: CourseType
): void {
  if (courseType === "starter") {
    inputBoxWrappers[1].insertBefore(inputBox, btnsAddCourse[0]);
  } else if (courseType === "main") {
    inputBoxWrappers[2].insertBefore(inputBox, btnsAddCourse[1]);
  } else {
    inputBoxWrappers[3].insertBefore(inputBox, btnsAddCourse[2]);
  }
}
