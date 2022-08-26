import { Popup } from "./Popup.js"

class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit){
        super(popupSelector);
        this._popupForm = this._popupElement.querySelector(".popup__form");
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues(){
        const inputList = Array.from(this._popupElement.querySelectorAll(".popup__input"));
        const inputValues = [];
        inputList.forEach(inputElement => {inputValues.push(inputElement.value)});
        return inputValues;
    }

    
    setEventListeners(){
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
    }

    close(){
        super.close();
        this._popupForm.reset();
    }

}

export { PopupWithForm }