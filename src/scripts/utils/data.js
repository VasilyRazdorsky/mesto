export const selectors = {
  popupSelector: ".popup",
  popupActiveClass: "popup_active",
  popupActiveSelector: ".popup_active",
  popupCloseButtonSelector: ".popup__close-button",
  popupProfileEdit: ".popup_action_edit",
  profileEditButton: ".profile__edit-button",
  popupProfileEditCloseButton: ".popup__close-button_place_edit-popup",
  popupInputName: ".popup__input_text_profile-name",
  popupInputMoreInfo: ".popup__input_text_profile-more-info",
  profileAvatar: ".profile__avatar",
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
  popupDeleteCard: ".popup_action_delete-card",
  elementsList: ".elements",
};

export const cardSelectors = {
  elementTemplate: ".element-template",
  element: ".element",
  elementViewButton: ".element__view-button",
  elementPhoto: ".element__photo",
  elementName: ".element__name",
  elementLikeButton: ".element__like-button",
  elementLikeButtonActiveState: "element__like-button_active",
  elementRemoveButton: ".element__remove-button",
  name: "",
  link: "",
};

export const formSelectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_invalid",
  errorActiveClass: "popup__error_active",
  errorSelector: ".popup__error",
};

export const popupInputName = document.querySelector(selectors.popupInputName);
export const popupInputMoreInfo = document.querySelector(
  selectors.popupInputMoreInfo
);

export const popupAddPostName = document.querySelector(
  selectors.popupAddPostName
);
export const popupAddPostImgHref = document.querySelector(
  selectors.popupAddPostImgHref
);

export const profileEditButton = document.querySelector(
  selectors.profileEditButton
);
export const profileAddPostButton = document.querySelector(
  selectors.profileAddPostButton
);
