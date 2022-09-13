import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupSubmitButton = this._popupElement.querySelector(
      ".popup__save-button"
    );
    //this._handleSubmit = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSubmitButton.addEventListener("click", () => {
      //this._handleSubmit();
      this.close();
    });
  }
}
