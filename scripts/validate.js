const formSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorActiveClass: 'popup__error_active',
    errorSelector: '.popup__error',
}


// Реализация валидации
const findErrorPlace = function(formElement, inputElement) {
    return formElement.querySelector(`.${inputElement.id}-error`);
}

const showInputError = function(formElement, inputElement, errorMessage, selectors){
    const errorElement = findErrorPlace(formElement, inputElement)
    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = function(formElement, inputElement, selectors){
    const errorElement = findErrorPlace(formElement, inputElement)
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.textContent = "";
}

const checkInputValidity = function(formElement, inputElement, selectors){
    if(!inputElement.validity.valid){
        showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
    } else {
        hideInputError(formElement, inputElement, selectors);
    }
};

const hasInvalidInput = function(inputList) {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
}

const toggleButtonState = function(inputList, buttonElement, selectors){
    if(hasInvalidInput(inputList)){
        buttonElement.classList.add(selectors.inactiveButtonClass);
        buttonElement.setAttribute("disabled", true);
    } else {
        buttonElement.classList.remove(selectors.inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
    }
};

const setEventListeners = function(formElement, selectors){
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
    toggleButtonState(inputList, buttonElement,selectors);
    
    inputList.forEach(inputElement => {
        inputElement.addEventListener("input", function(){
            checkInputValidity(formElement, inputElement, selectors);
            toggleButtonState(inputList, buttonElement,selectors);
        });
    });
};

const enableValidation = function(selectors) {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach(formElement => {
        formElement.addEventListener("submit", event => {
            event.preventDefault();
        });

        setEventListeners(formElement, selectors);
    });
};

// Сброс валидации
const cleanLastValidation = function(formElement, selectors){
    // Сбрасываем красную подсветку
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    inputList.forEach(inputElement => {
        inputElement.classList.remove(selectors.inputErrorClass);
    });

    const errorList = Array.from(formElement.querySelectorAll(selectors.errorSelector));
    errorList.forEach(errorElement => {
        errorElement.textContent = "";
    });

    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
    toggleButtonState(inputList, buttonElement,selectors);
};


// Запуск валидации
enableValidation(formSelectors);