import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupSubmitButton = this._popupElement.querySelector(
      ".popup__save-button"
    );
  }

  setSubmitHadler(newSubmitHandler) {
    this._handleSubmit = newSubmitHandler;
  }

  changeSubmitButtonText(text){
    this._popupSubmitButton.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSubmitButton.addEventListener("click", () => {
      this.changeSubmitButtonText("Удаление...");
      this._handleSubmit();
    });
  }
}
