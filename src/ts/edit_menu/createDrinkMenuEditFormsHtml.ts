import {
  DrinkMenuObj,
  DrinkMenuPayload,
  DrinkPayload,
  DrinkUpdatePayload,
} from "@ts/types";
import { DrinkMenuAPI } from "@ts/utils/api";
import { displayError, escapeHtml } from "@ts/utils/dom";
import { isResponseError } from "@ts/utils/error";
import { SubmitButton } from "@ts/utils/ui";

type OperationType = "none" | "add" | "delete" | "update";

/**
 * A DOM factory for rendering an edit form for editing drink menu and drink entries.
 *
 * @param drinkMenuObjects - The drink menu and drink entries to render within the edit form.
 * @returns A DocumentFragment containing the rendered elements.
 */
export function createDrinkMenuEditFormsHtml(
  drinkMenuObjects: Array<DrinkMenuObj>
): DocumentFragment {
  const fragment = document.createDocumentFragment();
  drinkMenuObjects.forEach((drinkMenuObj, i) => {
    const drinkMenu = drinkMenuObj.drinkMenu;
    const drinks = drinkMenuObj.drinks;
    const form = document.createElement("form");
    form.dataset.id = drinkMenu.id;
    form.innerHTML = `
              <form>
            <div class="input-box-wrapper">
              <h2 id="drink-menu-title">Rubrik för dryckeslista ${i + 1}</h2>
              <div class="input-box">
                <input
                  type="text"
                  name="title"
                  value="${escapeHtml(drinkMenu.title)}"
                  aria-labelledby="drink-menu-title"
                />
              </div>
            </div>
            <div class="input-box-wrapper">
              <h3 id="drink-menu-subtitle">Listans underrubrik</h3>
              <div class="input-box">
                <input
                  type="text"
                  name="subtitle"
                  value="${escapeHtml(drinkMenu.subtitle)}"
                  aria-labelledby="drink-menu-subtitle"
                />
              </div>
            </div>
            <div class="input-box-wrapper">
              <h3 id="drinks-title">Drycker</h3>
              <button
                type="button"
                class="add-drink"
                aria-label="Lägg till en dryck"
              >
                <img src="../plus.svg" alt="Plus ikon" />
              </button>
            </div>
            <div class="input-box-wrapper">
              <h3 id="price-title">Pris (kr)</h3>
              <div class="input-box">
                <input
                  type="number"
                  name="priceTot"
                  value="${drinkMenu.priceTot}"
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

    const inputBoxWrapper = form.querySelector(
      ".input-box-wrapper:nth-child(3)"
    )!;
    const btnAddDrink = form.querySelector(
      "button.add-drink"
    ) as HTMLButtonElement;
    let index = 1;
    drinks.forEach((drink) => {
      const inputBox = createInputBox(drink.name, "none", drink.id);

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

      displayInputBox(inputBoxWrapper, btnAddDrink, inputBox);

      index++;
    });

    /* Add functionality */

    btnAddDrink.addEventListener("click", () => {
      const inputBox = createInputBox("", "add");
      displayInputBox(inputBoxWrapper, btnAddDrink, inputBox);
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
  const api = new DrinkMenuAPI();

  const drinkMenuPayload: DrinkMenuPayload = {
    title: String(formData.get("title")),
    subtitle: String(formData.get("subtitle")),
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
      await api.updateDrinkMenu(form.dataset.id!, drinkMenuPayload);

      const drinkNames = formData.getAll("drink");
      const drinkIdsTypesOps = formData.getAll("id&op");
      await Promise.all(
        drinkNames.map(async (drinkName, i) => {
          const name = String(drinkName);
          const drinkIdTypeOpArr = String(drinkIdsTypesOps[i]).split("&");
          const [id, op] = drinkIdTypeOpArr;

          switch (op) {
            case "add":
              await api.insertDrink({
                drinkMenuId: form.dataset.id,
                name,
              } as DrinkPayload);
              break;
            case "update":
              await api.updateDrink(id, {
                name,
              } as DrinkUpdatePayload);
              break;
            case "delete":
              await api.deleteDrink(id);
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
        if (
          ["title", "subtitle", "priceTot", "name", "drinkMenuId"].includes(
            error[0].field
          )
        ) {
          displayError(document.body, error[0].message);
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
  let [id, op] = hiddenInput.value.split("&");
  op = operation;
  hiddenInput.value = [id, op].join("&");
}

function createInputBox(
  drinkName: string,
  op: OperationType,
  drinkId = ""
): HTMLElement {
  const inputBox = document.createElement("div");
  inputBox.classList.add("input-box");
  /* 
    There's an Input with type hidden which has name="id&op" which represent 
    drink id value and which operation is to be executed on that specific input. Example values:
    - 2&update
    - 3&delete
    - 4&add
    - 4&none
    The symbol & is used as a seperator in order to access these values with the method .split("&")
    */
  if (drinkId.length !== 0) {
    inputBox.innerHTML = `
                <input
                  type="text"
                  name="drink"
                  value="${escapeHtml(drinkName)}"
                  aria-labelledby="drinks-title"
                />
                <input
                  type="hidden"
                  name="id&op"
                  value="${drinkId}&${op}"
                />
                <button
                  type="button"
                  class="delete"
                  aria-label="Ta bort dryck"
                >
                  <img src="../trash.svg" alt="Skräpkorg ikon" />
                </button>
    `;
  } else {
    inputBox.innerHTML = `
                <input
                  type="text"
                  name="drink"
                  value="${escapeHtml(drinkName)}"
                  aria-labelledby="drinks-title"
                />
                <input
                  type="hidden"
                  name="id&op"
                  value="null&${op}"
                />
    `;
  }

  return inputBox;
}

function displayInputBox(
  inputBoxWrapper: Element,
  btnAddDrink: HTMLButtonElement,
  inputBox: Element
): void {
  inputBoxWrapper.insertBefore(inputBox, btnAddDrink);
}
