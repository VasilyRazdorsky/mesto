export default class FormValidator {
    constructor(formSelectors, formElement) {
        this._formSelectors = formSelectors;
        this._formElement = formElement;
    }

    _findErrorPlace(inputElement) {
        return this._formElement.querySelector(`.${inputElement.id}-error`);
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._findErrorPlace(inputElement);
        inputElement.classList.add(this._formSelectors.inputErrorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = this._findErrorPlace(inputElement);
        inputElement.classList.remove(this._formSelectors.inputErrorClass);
        errorElement.textContent = "";
    }

    _checkInputValidity(inputElement) {
        if(!inputElement.validity.valid){
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput(){
        return this._inputList.some(inputElement => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState(){
        if(this._hasInvalidInput()){
            this._buttonElement.classList.add(this._formSelectors.inactiveButtonClass);
            this._buttonElement.setAttribute("disabled", true);
        } else {
            this._buttonElement.classList.remove(this._formSelectors.inactiveButtonClass);
            this._buttonElement.removeAttribute("disabled");
        }
    };
    

    _setPreventDefault() {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
    }

    _setEventListeners() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._formSelectors.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._formSelectors.submitButtonSelector);
        this._toggleButtonState();
        

        this._inputList.forEach(inputElement => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._setPreventDefault();
        this._setEventListeners();
    }

    cleanLastValidation(){
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement);
        });
        this._toggleButtonState();
    };
}