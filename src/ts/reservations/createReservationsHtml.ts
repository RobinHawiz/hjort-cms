import { ReservationEntity } from "@ts/types";
import { ReservationAPI } from "@ts/utils/api";
import { escapeHtml, isHtmlElement } from "@ts/utils/dom";
import { ToggleButton } from "@ts/utils/ui";

/**
 * A DOM factory for rendering reservation entries.
 *
 * @param courses - The reservation entries to render.
 * @returns A DocumentFragment containing the rendered elements.
 */
export async function createReservationsHtml(
  reservations: Array<ReservationEntity>
): Promise<DocumentFragment> {
  const fragment = document.createDocumentFragment();

  await Promise.all(
    reservations.map(async (reservation) => {
      const article = document.createElement("article");
      article.dataset.id = reservation.id;

      const toggleButtonElem = document.createElement("button");
      toggleButtonElem.classList.add("toggle-content");
      toggleButtonElem.setAttribute("aria-controls", "content");
      toggleButtonElem.innerHTML = `
          <img src="../chevron.svg" alt="Pil ikon" />
          <p>Visa</p>`;
      const toggleButton = new ToggleButton(toggleButtonElem);

      toggleButtonElem.addEventListener("click", () =>
        handleToggleOnClick(toggleButton, article)
      );

      const cancelButtonElem = document.createElement("button");
      cancelButtonElem.classList.add("cancel");
      cancelButtonElem.innerText = `Avboka`;

      cancelButtonElem.addEventListener("click", async () => {
        await handleCancelOnClick(article);
      });

      const reservationDate = new Date(escapeHtml(reservation.reservationDate));

      article.innerHTML = `
    <div class="top-card-info">
      <div class="col-1">
        <h3>${escapeHtml(reservation.firstName)} ${escapeHtml(
        reservation.lastName
      )}</h3>
        <div class="wrapper-container">
          <span>●</span>
          <div class="guest-amount-wrapper wrapper">
            <img src="../users.svg" alt="Gäster ikon" />
            <p>${escapeHtml(String(reservation.guestAmount))}</p>
          </div>
          <div class="booking-date-wrapper wrapper">
            <img src="../calendar.svg" alt="Kalender ikon" />
            <p>${reservationDate.toLocaleDateString("sv-SE")}</p>
          </div>
          <div class="booking-time-wrapper wrapper">
            <img src="../clock.svg" alt="Klocka ikon" />
            <p>${reservationDate.toLocaleTimeString("sv-SE", {
              hour: "2-digit",
              minute: "2-digit",
            })}</p>
          </div>
        </div>
      </div>
      <div class="col-2">
      </div>
    </div>
    <div id="content">
      <p class="message">${escapeHtml(reservation.message)}</p>
      <div class="phone-number-wrapper wrapper">
        <img src="../phone.svg" alt="Telefon ikon" />
        <p>${escapeHtml(reservation.phoneNumber)}</p>
      </div>
      <div class="email-cancel-button-container">
        <p>
          <a href="mailto:${escapeHtml(reservation.email)}">${escapeHtml(
        reservation.email
      )}</a>
        </p>
      </div>
    </div>
  `;
      if (reservation.message.length === 0) {
        article.setAttribute("contains-message", "true");
      }
      article.querySelector(".col-2")!.appendChild(toggleButtonElem);
      article
        .querySelector(".email-cancel-button-container")!
        .appendChild(cancelButtonElem);
      article.style.maxHeight =
        (await getCardMaxHeight(article.querySelector(".top-card-info")!)) +
        "px";
      fragment.appendChild(article);
    })
  );

  return fragment;
}

function handleToggleOnClick(button: ToggleButton, card: HTMLElement) {
  const CONTENT_SELECTOR = "#content";
  const content = card.querySelector(CONTENT_SELECTOR);

  const TOGGLE_PARAGRAPH_SELECTOR = ".toggle-content p";
  const pToggle = card.querySelector(TOGGLE_PARAGRAPH_SELECTOR);

  const TOP_INFO_SELECTOR = ".top-card-info";
  const topCardInfo = card.querySelector(TOP_INFO_SELECTOR);

  if (!isHtmlElement(content, CONTENT_SELECTOR)) return;
  if (!isHtmlElement(pToggle, TOGGLE_PARAGRAPH_SELECTOR)) return;
  if (!isHtmlElement(topCardInfo, TOP_INFO_SELECTOR)) return;

  card.style.maxHeight = card.classList.toggle("expanded")
    ? (topCardInfo.scrollHeight + content.scrollHeight) / 10 + "rem"
    : topCardInfo.scrollHeight / 10 + "rem";

  button.toggleOpen();
  pToggle.innerText = content.classList.toggle("show") ? "Dölj" : "Visa";
}

async function getCardMaxHeight(topCardInfo: HTMLElement): Promise<number> {
  const topCardInfoCopy = document.createElement("article");

  topCardInfoCopy.innerHTML = topCardInfo.outerHTML;
  topCardInfoCopy.style.position = "absolute";
  topCardInfoCopy.style.pointerEvents = "none";
  topCardInfoCopy.style.visibility = "hidden";

  document.body.appendChild(topCardInfoCopy);

  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(topCardInfoCopy.offsetHeight);
      document.body.removeChild(topCardInfoCopy);
    }, 100);
  });
}

async function handleCancelOnClick(card: HTMLElement): Promise<void> {
  if (confirm("Vill du verkligen avboka den här reserveringen?")) {
    const api = new ReservationAPI();
    try {
      await api.delete(card.dataset.id!);
      card.remove();
    } catch (error) {
      console.error(error);
    }
  }
}
