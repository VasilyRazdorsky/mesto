import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    open(link, name){
        const photo = this._popupElement.querySelector(".popup__photo");
        photo.src = link;
        photo.alt = name;

        this._popupElement.querySelector(".popup__photo-place").textContent = name;

        console.log(this._popupElement);
        super.open();
    }
}