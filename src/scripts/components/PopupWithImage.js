import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open(link, name) {
    this._photo = this._popupElement.querySelector(".popup__photo");
    this._photo.src = link;
    this._photo.alt = name;

    this._popupElement.querySelector(".popup__photo-place").textContent = name;

    super.open();
  }
}
