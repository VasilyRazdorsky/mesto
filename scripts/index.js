import { selectors, cardSelectors, formSelectors, initialCards } from "./data.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Popup } from "./Popup.js"


const popupProfileEdit = new Popup(selectors.popupProfileEdit);
popupProfileEdit.setEventListeners();
const popupAddPost = new Popup(selectors.popupAddPost);
popupAddPost.setEventListeners();

const profileEditButton = document.querySelector(selectors.profileEditButton);
const profileAddPostButton = document.querySelector(selectors.profileAddPostButton);

profileEditButton.addEventListener("click", () => {
  popupProfileEdit.open();
});

profileAddPostButton.addEventListener("click", () => {
  popupAddPost.open();
})
/*
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
const popupProfileEdit = new Popup(selectors.popupProfileEdit);



const popupProfileEdit = document.querySelector(selectors.popupProfileEdit);


//const popupInputName = popupProfileEdit.querySelector(selectors.popupInputName);
const profileName = document.querySelector(selectors.profileName);
const popupInputMoreInfo = popupProfileEdit.querySelector(
  selectors.popupInputMoreInfo
);
const profileMoreInfo = document.querySelector(selectors.profileMoreInfo);
const profileEditButton = document.querySelector(selectors.profileEditButton);
const popupProfileEditForm = popupProfileEdit.querySelector(
  selectors.popupProfileEditForm
);

const profileEditForm = new FormValidator(formSelectors, popupProfileEditForm);
profileEditForm.enableValidation();

const openPopupProfileEdit = function () {
  popupInputName.value = profileName.textContent;
  popupInputMoreInfo.value = profileMoreInfo.textContent;
  profileEditForm.cleanLastValidation();
  openPopup(popupProfileEdit);
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
const addPostForm = new FormValidator(formSelectors, popupAddPostForm);
addPostForm.enableValidation();

const openPopupAddPost = function () {
  popupAddPostName.value = "";
  popupAddPostImgHref.value = "";
  addPostForm.cleanLastValidation();
  openPopup(popupAddPost);
};


const elementsList = document.querySelector(selectors.elementsList);


const setNewCard = function(name, link) {
  cardSelectors.name = name;
  cardSelectors.link = link;
  const card = new Card(cardSelectors, cardSelectors.elementTemplate);
  return card.generateCard();
}

const addNewCardOnPage = function(name, link) {
  const card = setNewCard(name, link);
  elementsList.prepend(card);
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

/*
const addEventListeners = function () {
  //Открытие попапов
  profileEditButton.addEventListener("click", () => {
    popupProfileEdit.open();
  });
  profileAddPostButton.addEventListener("click", openPopupAddPost);

  //Закрытие попапов
  popups.forEach(popup => {
    popup.addEventListener('mousedown', event => closePopupOverlayAndButton(event, popup));
  });

  //Обработка введённой информации в попапах
  popupProfileEditForm.addEventListener("submit", handleFormSubmiProfileEdit);
  popupAddPostForm.addEventListener("submit", function () {
    addNewCardOnPage(popupAddPostName.value, popupAddPostImgHref.value);
    closePopup(popupAddPost);
  });
};


function createInitialPosts() {
  initialCards.forEach((item) => addNewCardOnPage(item.name, item.link));
};

//addEventListeners();
createInitialPosts();


export {viewPostPhoto};
*/