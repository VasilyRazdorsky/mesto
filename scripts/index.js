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
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./popupWithImage.js";
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
const popupWithImage = new PopupWithImage(selectors.popupViewPost);
popupWithImage.setEventListeners();
const cardList = new Section({ items: initialCards, renderer: (item) => {
  cardSelectors.name = item.name;
  cardSelectors.link = item.link;
  const card = new Card(cardSelectors, cardSelectors.elementTemplate, () => {
    popupWithImage.open(item.link, item.name);
  });
  cardList.addItem(card.generateCard());
}}, selectors.elementsList);


const popupAddPost = new PopupWithForm(selectors.popupAddPost, (inputValues) => {
  cardSelectors.name = inputValues[0];
  cardSelectors.link = inputValues[1];
  const card = new Card(cardSelectors, cardSelectors.elementTemplate, () => {
    popupWithImage.open(inputValues[1], inputValues[0]);
  });
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