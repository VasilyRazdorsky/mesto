import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._popupSubmitButton = this._popupElement.querySelector(
      ".popup__save-button"
    );
    this._handleSubmit = handleSubmit;
  }

  setAllInfoAboutCard(card, cardId){
    this._cardToDelete = card;
    this._cardId = cardId;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._popupSubmitButton.addEventListener("click", () => {
      this._cardToDelete.remove();
      this._handleSubmit(this._cardId);
      this.close();
    });
  }
}
