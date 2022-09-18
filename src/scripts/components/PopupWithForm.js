import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupElement.querySelector(
      ".popup__save-button"
    );
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList = Array.from(
      this._popupElement.querySelectorAll(".popup__input")
    );
    this._inputList.forEach((inputElement) => {
      this._formValues[inputElement.name] = inputElement.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._submitButton.textContent = "Сохранение...";
    });
  }

  close() {
    super.close();
    this._submitButton.textContent = "Сохранить";
    this._popupForm.reset();
  }
}
