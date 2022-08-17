const selectors = {
    popupSelector: ".popup",
    popupActiveClass: "popup_active",
    popupActiveSelector: ".popup_active",
    popupCloseButtonSelector: ".popup__close-button",
    popupProfileEdit: ".popup_action_edit",
    profileEditButton: ".profile__edit-button",
    popupProfileEditCloseButton: ".popup__close-button_place_edit-popup",
    popupInputName: ".popup__input_text_profile-name",
    popupInputMoreInfo: ".popup__input_text_profile-more-info",
    profileName: ".profile__name",
    profileMoreInfo: ".profile__more-info",
    popupProfileEditForm: ".popup__form_place_edit-popup",
    profileAddPostButton: ".profile__add-button",
    popupAddPost: ".popup_action_add-post",
    popupAddPostCloseButton: ".popup__close-button_place_add-post-popup",
    popupAddPostForm: ".popup__form_place_add-post-popup",
    popupAddPostName: ".popup__input_text_post-name",
    popupAddPostImgHref: ".popup__input_text_post-img-href",
    popupViewPost: ".popup_action_view-post",
    popupViewPostPhoto: ".popup__photo",
    popupViewPostName: ".popup__photo-place",
    popupViewPostCloseButton: ".popup__close-button_place_view-post-popup",
    elementsList: ".elements",
    elementTemplate: ".element-template",
    element: ".element",
    elementViewButton: ".element__view-button",
    elementPhoto: ".element__photo",
    elementName: ".element__name",
    elementLikeButton: ".element__like-button",
    elementRemoveButton: ".element__remove-button",
};

const cardSelectors = {
    elementTemplate: ".element-template",
    element: ".element",
    elementViewButton: ".element__view-button",
    elementPhoto: ".element__photo",
    elementName: ".element__name",
    elementLikeButton: ".element__like-button",
    elementRemoveButton: ".element__remove-button",
}

const formSelectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorActiveClass: 'popup__error_active',
    errorSelector: '.popup__error',
};

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];


export {selectors, cardSelectors, formSelectors, initialCards};