import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._photoPlace = this._popupElement.querySelector(".popup__photo-place");
    this._photo = this._popupElement.querySelector(".popup__photo");
  }

  open(link, name) {
    this._photo.src = link;
    this._photo.alt = name;

    this._photoPlace.textContent = name;

    super.open();
  }
}
