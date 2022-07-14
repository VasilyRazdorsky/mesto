const selectors = {
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
};

function popupOpen(popup) {
  popup.classList.add("popup_active");
}

function popupClose(popup) {
  popup.classList.remove("popup_active");
}

// Попап редактирования профиля
const popupProfileEdit = document.querySelector(selectors.popupProfileEdit);
const popupInputName = popupProfileEdit.querySelector(selectors.popupInputName);
const profileName = document.querySelector(selectors.profileName);
const popupInputMoreInfo = popupProfileEdit.querySelector(
  selectors.popupInputMoreInfo
);
const profileMoreInfo = document.querySelector(selectors.profileMoreInfo);
const profileEditButton = document.querySelector(selectors.profileEditButton);
const popupProfileEditCloseButton = popupProfileEdit.querySelector(
  selectors.popupProfileEditCloseButton
);
const popupProfileEditForm = popupProfileEdit.querySelector(
  selectors.popupProfileEditForm
);

const popupProfileEditOpen = function () {
  popupOpen(popupProfileEdit);
  popupInputName.value = profileName.textContent;
  popupInputMoreInfo.value = profileMoreInfo.textContent;
};

const popupProfileEditClose = function () {
  popupClose(popupProfileEdit);
};

const formSubmitHandlerProfileEdit = function (evt) {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileMoreInfo.textContent = popupInputMoreInfo.value;
  popupClose(popupProfileEdit);
};

// Попап добавления постов
const popupAddPost = document.querySelector(selectors.popupAddPost);
const profileAddPostButton = document.querySelector(
  selectors.profileAddPostButton
);
const popupAddPostCloseButton = popupAddPost.querySelector(
  selectors.popupAddPostCloseButton
);

const popupAddPostOpen = function () {
  popupOpen(popupAddPost);
};

const popupAddPostClose = function () {
  popupClose(popupAddPost);
};

function addEventListeners() {
  //Открытие попапов
  profileEditButton.addEventListener("click", popupProfileEditOpen);
  profileAddPostButton.addEventListener("click", popupAddPostOpen);

  //Закрытие попапов
  popupProfileEditCloseButton.addEventListener("click", popupProfileEditClose);
  popupAddPostCloseButton.addEventListener("click", popupAddPostClose);

  //Обработка введённой информации в попапах
  popupProfileEditForm.addEventListener("submit", formSubmitHandlerProfileEdit);
}

addEventListeners();
