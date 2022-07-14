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
  popupAddPostName: ".popup__input_text_post-name",
  popupAddPostImgHref: ".popup__input_text_post-img-href",
  elementsList: ".elements",
  elementTemplate: ".element-template",
  element: ".element",
  elementPhoto: ".element__photo",
  elementName: ".element__name",
  elementLikeButton: ".element__like-button",
  elementRemoveButton: ".element__remove-button",
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
const popupAddPostName = popupAddPost.querySelector(selectors.popupAddPostName);
const popupAddPostImgHref = popupAddPost.querySelector(
  selectors.popupAddPostImgHref
);
const popupAddPostForm = popupAddPost.querySelector(selectors.popupAddPostForm);
const elementsList = document.querySelector(selectors.elementsList);

const popupAddPostOpen = function () {
  popupOpen(popupAddPost);
  popupAddPostName.value = "";
  popupAddPostImgHref.value = "";
};

const popupAddPostClose = function () {
  popupClose(popupAddPost);
};

const createPost = function (imgHref, name) {
  const template = document
    .querySelector(selectors.elementTemplate)
    .content.querySelector(selectors.element)
    .cloneNode(true);

  template.querySelector(selectors.elementPhoto).src = imgHref;
  template.querySelector(selectors.elementName).textContent = name;

  const elementLikeButton = template.querySelector(selectors.elementLikeButton);
  elementLikeButton.addEventListener("click", function () {
    elementLikeButton.classList.toggle("element__like-button_active");
  });

  const elementRemoveButton = template.querySelector(
    selectors.elementRemoveButton
  );
  elementRemoveButton.addEventListener("click", () => {
    template.remove();
  });

  elementsList.appendChild(template);
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
  popupAddPostForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    createPost(popupAddPostImgHref.value, popupAddPostName.value);
    popupAddPostClose();
  });
}

function createInitialPosts() {
  initialCards.forEach((item) => createPost(item.link, item.name));
}

addEventListeners();
createInitialPosts();
