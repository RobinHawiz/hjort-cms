import { displayError, isHtmlElement } from "@ts/utils/dom";
import { isResponseError } from "@ts/utils/error";
import { SubmitButton } from "@ts/utils/ui";

export function initLogin(): void {
  const LOGIN_FORM_SELECTOR = "form";
  const SUBMIT_BUTTON_SELECTOR = `button[type="submit"]`;
  const form = document.querySelector(
    LOGIN_FORM_SELECTOR
  ) as HTMLFormElement | null;
  const button = document.querySelector(
    SUBMIT_BUTTON_SELECTOR
  ) as HTMLButtonElement | null;

  if (!isHtmlElement(form, LOGIN_FORM_SELECTOR)) return;
  if (!isHtmlElement(button, SUBMIT_BUTTON_SELECTOR)) return;

  const submitButton = new SubmitButton(button);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Clear any previous errors shown
    form.classList.remove("validation-error");
    document.querySelector(".error")?.classList.add("hide");
    setTimeout(() => {
      document.querySelector(".error")?.remove();
    }, 200);
    const formData = new FormData(form);
    const payload: any = {};
    for (const entry of formData.entries()) {
      payload[entry[0]] = entry[1];
    }
    submitButton.disable();
    submitButton.showLoader();
    setTimeout(() => {
      login(payload, form, submitButton);
    }, 400);
  });
}

async function login(
  payload: any,
  form: HTMLFormElement,
  submitButton: SubmitButton
): Promise<void> {
  fetch("http://localhost:4000/api/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then(async (response) => {
      if (!response.ok) {
        submitButton.enable();
        submitButton.hideLoader();
        throw await response.json();
      }
      return response.json();
    })
    .then((data) => {
      submitButton.enable();
      submitButton.hideLoader();
      localStorage.setItem("token", data);
      window.location.replace("/hjort-cms/bokningar/");
    })
    .catch((error) => {
      if (isResponseError(error)) {
        if (error.field === "login") {
          form.classList.add("validation-error");
          displayError(form, "Felaktigt användarnamn eller lösenord.");
        } else if (error.field === "network") {
          form.classList.add("validation-error");
          displayError(
            form,
            "Det uppstod ett nätverksfel. Försök igen senare."
          );
        }
      } else {
        form.classList.add("validation-error");
        displayError(form, "Unexpected app error");
      }
    });
}
