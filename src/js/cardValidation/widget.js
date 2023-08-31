import "./style.css";
import { cardValidation } from "./cardValidation";
import americanExpressPng from "./icons/americanExpress.png";
import masterCardPng from "./icons/masterCard.png";
import mirPng from "./icons/mir.png";
import unionPayPng from "./icons/unionPay.png";
import visaPng from "./icons/visa.png";

export class cardValidationWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  static get markup() {
    return `
                <div class="card-validation-widget">
                <form class="card-form-widget">
                <div class="card-form-icons">
                    <div class="card-form-icon americanExpress">
                    <img class="card-form-icon-png" src="${americanExpressPng}" alt="">
                    </div>
                    <div class="card-form-icon masterCard">
                    <img class="card-form-icon-png" src="${masterCardPng}" alt="">
                    </div>
                    <div class="card-form-icon mir">
                    <img class="card-form-icon-png" src="${mirPng}" alt="">
                    </div>
                    <div class="card-form-icon unionPay">
                    <img class="card-form-icon-png" src="${unionPayPng}" alt="">
                    </div>
                    <div class="card-form-icon visa">
                    <img class="card-form-icon-png" src="${visaPng}" alt="">
                    </div>
                </div>
            
                <label for="card-input">Введите номер карты</label>
                <input type="text" id="card-input" class="card-form-input">
                <button class="card-form-submit">Проверить</button>
                </form>
                <h1 class="title hide"></h1>
            </div>
         `;
  }

  static get selector() {
    return ".card-validation-widget";
  }

  static get cardInputSelector() {
    return ".card-form-input";
  }

  static get buttonSelector() {
    return ".card-form-submit";
  }

  static get titleSelector() {
    return ".title";
  }

  bindToDOM() {
    this.parentEl.innerHTML = cardValidationWidget.markup;

    const cardValidationWidgetApp = document.querySelector(
      ".card-validation-widget"
    );
    const cardInput = cardValidationWidgetApp.querySelector("#card-input");
    const button = cardValidationWidgetApp.querySelector(".card-form-submit");
    const title = cardValidationWidgetApp.querySelector(".title");

    const cardsInfo = {
      americanExpress: {
        pref: /^3[47]\d*/,
        png: cardValidationWidgetApp.querySelector(".americanExpress"),
      },
      masterCard: {
        pref: /^5[1-5]\d*/,
        png: cardValidationWidgetApp.querySelector(".masterCard"),
      },
      mir: {
        pref: /^2\d*/,
        png: cardValidationWidgetApp.querySelector(".mir"),
      },
      unionPay: {
        pref: /^(62|8[1-9])\d*/,
        png: cardValidationWidgetApp.querySelector(".unionPay"),
      },
      visa: {
        pref: /^4\d*/,
        png: cardValidationWidgetApp.querySelector(".visa"),
      },
    };

    cardInput.addEventListener("input", (e) => {
      if (/[^0-9-\s]+/.test(e.target.value)) {
        return (e.target.value = e.target.value.slice(0, -1));
      }
      if (e.target.value === "") {
        for (const key in cardsInfo) {
          cardsInfo[key].png.classList.remove("card-form-icon-inactive");
        }
      }
      for (const key in cardsInfo) {
        if (cardsInfo[key].pref.test(e.target.value)) {
          for (const key in cardsInfo) {
            cardsInfo[key].png.classList.add("card-form-icon-inactive");
          }
          cardsInfo[key].png.classList.remove("card-form-icon-inactive");
        }
      }
    });

    button.addEventListener("click", (e) => {
      e.preventDefault();
      title.classList.remove("hide");
      if (cardValidation(cardInput.value)) {
        title.classList.add("valid");
        title.classList.remove("invalid");
        title.textContent = "Карта - валидна";
      } else {
        title.classList.add("invalid");
        title.classList.remove("valid");
        title.textContent = "Карта - невалидна";
      }
    });
  }
}
