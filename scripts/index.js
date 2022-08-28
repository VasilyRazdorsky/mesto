import {selectors, 
        cardSelectors, 
        formSelectors, 
        initialCards,
        popupInputName,
        popupInputMoreInfo,
        popupAddPostName,
        popupAddPostImgHref,
        profileEditButton,
        profileAddPostButton,
        } from "./data.js";
import Section from "./Section.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js"
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";



//Редактирование профиля
const profile = new UserInfo({ profileName: selectors.profileName, profileMoreInfo: selectors.profileMoreInfo});


const popupProfileEdit = new PopupWithForm(selectors.popupProfileEdit, (inputValues) => {
  profile.setUserInfo(inputValues);
});
const profileEditForm = new FormValidator(formSelectors, document.querySelector(selectors.popupProfileEdit));
profileEditForm.enableValidation();
popupProfileEdit.setEventListeners();



//Добавление поста
const cardList = new Section({ items: initialCards, renderer: (item) => {
  cardSelectors.name = item.name;
  cardSelectors.link = item.link;
  const card = new Card(cardSelectors, cardSelectors.elementTemplate);
  cardList.addItem(card.generateCard());
}}, selectors.elementsList);


const popupAddPost = new PopupWithForm(selectors.popupAddPost, (inputValues) => {
  cardSelectors.name = inputValues[0];
  cardSelectors.link = inputValues[1];
  const card = new Card(cardSelectors, cardSelectors.elementTemplate);
  cardList.addItem(card.generateCard());
});

const addPostForm = new FormValidator(formSelectors, document.querySelector(selectors.popupAddPost));
addPostForm.enableValidation();
popupAddPost.setEventListeners();



//открытие попапов
profileEditButton.addEventListener("click", () => {
  popupInputName.value = profile.getUserInfo().profileName;
  popupInputMoreInfo.value = profile.getUserInfo().profileMoreInfo;
  profileEditForm.cleanLastValidation();
  popupProfileEdit.open();
});

profileAddPostButton.addEventListener("click", () => {
  popupAddPostName.value = "";
  popupAddPostImgHref.value = "";
  addPostForm.cleanLastValidation();
  popupAddPost.open();
})


//Добавление initialCards на экран
cardList.renderItems();
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