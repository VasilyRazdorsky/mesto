let popup = document.querySelector(".popup");
let profileEditButton = document.querySelector(".profile__edit-button");
let popupCloseButton = popup.querySelector(".popup__close-button");
let popupSaveButton = popup.querySelector(".popup__save-button");
let popupInputName = popup.querySelector(".popup__input_name");
let popupInputMoreInfo = popup.querySelector(".popup__input_more-info");
let profileName = document.querySelector(".profile__name");
let profileMoreInfo = document.querySelector(".profile__more-info");
let popupForm = popup.querySelector(".popup__form");

let popupOpen = function() {
    popup.classList.add("popup_active");
    popupInputName.value = profileName.textContent;
    popupInputMoreInfo.value = profileMoreInfo.textContent;
};

let popupClose = function() {
    popup.classList.remove("popup_active");
};

let formSubmitHandler = function(evt) {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileMoreInfo.textContent = popupInputMoreInfo.value;
    popupClose();
}




profileEditButton.addEventListener("click", popupOpen);
popupCloseButton.addEventListener("click", popupClose);
popupForm.addEventListener("submit", formSubmitHandler);