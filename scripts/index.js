// Универсальные функции открытия и закрытия попапов
const openPopup = (popup) => {
  document.addEventListener('keydown', closePopupWithKey);
  popup.classList.add("popup_active");
};

const closePopup = (popup) => {
  document.removeEventListener('keydown', closePopupWithKey);
  popup.classList.remove("popup_active");
};

// Все попапы + гибкая функция закрытия попапов нажатием на оверлей или крестик + закрытие попапов нажатием Esc
const popups = Array.from(document.querySelectorAll(selectors.popupSelector));

const closePopupOverlayAndButton = function(event, popup) {
  if(event.target.classList.contains(selectors.popupActiveClass)){
    closePopup(popup);
  }
  if (event.target.closest(selectors.popupCloseButtonSelector)) {
    closePopup(popup);
  }
};

function closePopupWithKey(event) {
  if(event.key === 'Escape') {
    closePopup(document.querySelector(selectors.popupActiveSelector));  
  }
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
const popupProfileEditForm = popupProfileEdit.querySelector(
  selectors.popupProfileEditForm
);

const openPopupProfileEdit = function () {
  openPopup(popupProfileEdit);
  popupInputName.value = profileName.textContent;
  popupInputMoreInfo.value = profileMoreInfo.textContent;
  cleanLastValidation(popupProfileEditForm, formSelectors);
};

const handleFormSubmiProfileEdit = function () {
  profileName.textContent = popupInputName.value;
  profileMoreInfo.textContent = popupInputMoreInfo.value;
  closePopup(popupProfileEdit);
};

// Попап добавления постов
const popupAddPost = document.querySelector(selectors.popupAddPost);
const profileAddPostButton = document.querySelector(
  selectors.profileAddPostButton
);
const popupAddPostName = popupAddPost.querySelector(selectors.popupAddPostName);
const popupAddPostImgHref = popupAddPost.querySelector(
  selectors.popupAddPostImgHref
);
const popupAddPostForm = popupAddPost.querySelector(selectors.popupAddPostForm);
const elementsList = document.querySelector(selectors.elementsList);

const openPopupAddPost = function () {
  popupAddPostName.value = "";
  popupAddPostImgHref.value = "";
  cleanLastValidation(popupAddPostForm, formSelectors);
  openPopup(popupAddPost);
};

const createPost = function (imgHref, name) {
  const template = document
    .querySelector(selectors.elementTemplate)
    .content.querySelector(selectors.element)
    .cloneNode(true);

  const elementPhoto = template.querySelector(selectors.elementPhoto);
  elementPhoto.src = imgHref;
  elementPhoto.alt = name;
  template.querySelector(selectors.elementName).textContent = name;

  // Лайк поста
  const elementLikeButton = template.querySelector(selectors.elementLikeButton);
  elementLikeButton.addEventListener("click", function () {
    elementLikeButton.classList.toggle("element__like-button_active");
  });

  // Удаление поста
  const elementRemoveButton = template.querySelector(
    selectors.elementRemoveButton
  );
  elementRemoveButton.addEventListener("click", () => {
    template.remove();
  });

  // Просмотр фото поста
  const elementViewButton = template.querySelector(selectors.elementViewButton);
  elementViewButton.addEventListener("click", function () {
    viewPostPhoto(imgHref, name);
  });

  
  return template;
};


const addNewCardOnPage = function(imgHref, name) {
  elementsList.prepend(createPost(imgHref,name));
}


// Попап просмотра поста
const popupViewPost = document.querySelector(selectors.popupViewPost);
const popupViewPostPhoto = popupViewPost.querySelector(
  selectors.popupViewPostPhoto
);
const popupViewPostName = popupViewPost.querySelector(
  selectors.popupViewPostName
);

function viewPostPhoto(imgHref, name) {
  popupViewPostPhoto.src = imgHref;
  popupViewPostPhoto.alt = name;
  popupViewPostName.textContent = name;
  openPopup(popupViewPost);
}

const addEventListeners = function () {
  //Открытие попапов
  profileEditButton.addEventListener("click", openPopupProfileEdit);
  profileAddPostButton.addEventListener("click", openPopupAddPost);

  //Закрытие попапов
  popups.forEach(popup => {
    popup.addEventListener('mousedown', event => closePopupOverlayAndButton(event, popup));
  });

  //Обработка введённой информации в попапах
  popupProfileEditForm.addEventListener("submit", handleFormSubmiProfileEdit);
  popupAddPostForm.addEventListener("submit", function () {
    addNewCardOnPage(popupAddPostImgHref.value, popupAddPostName.value);
    closePopup(popupAddPost);
  });
};

function createInitialPosts() {
  initialCards.forEach((item) => addNewCardOnPage(item.link, item.name));
};
addEventListeners();
createInitialPosts();
