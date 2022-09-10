import "../../pages/index.css";
import {
  selectors,
  cardSelectors,
  formSelectors,
  popupInputName,
  popupInputMoreInfo,
  popupAddPostName,
  popupAddPostImgHref,
  profileEditButton,
  profileAddPostButton,
} from "../utils/data.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const api = new Api({ baseUrl:"https://mesto.nomoreparties.co/v1/cohort-50",
  headers: {
    authorization: "3da86922-f76f-47f7-81bc-c1b3b90197e4",
    "Content-Type": "application/json",
  }
} );
//Редактирование профиля
const profile = new UserInfo({
  profileName: selectors.profileName,
  profileMoreInfo: selectors.profileMoreInfo,
  profileAvatar: selectors.profileAvatar,
});
api
  .getUserInfo()
  .then((res) => {
    profile.setUserInfo(res);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

const popupProfileEdit = new PopupWithForm(
  selectors.popupProfileEdit,
  (inputValues) => {
    api.changeUserInfo(inputValues)
      .catch(err => {
        console.log(`Ошибка: ${err}`);
      })
    profile.setUserInfo(inputValues);
  }
);
const profileEditForm = new FormValidator(
  formSelectors,
  document.querySelector(selectors.popupProfileEdit)
);
profileEditForm.enableValidation();
popupProfileEdit.setEventListeners();

//Добавление поста
const popupWithImage = new PopupWithImage(selectors.popupViewPost);
popupWithImage.setEventListeners();

const createCard = (config, template, handleCardClick) => {
  const card = new Card(config, template, handleCardClick);
  return card;
};


const cardList = new Section((item) => {
    const cardData = {
      name: item.name,
      link: item.link,
      likeCount: item.likes.length,
    };
    const card = createCard(cardData, cardSelectors.elementTemplate,() => {
      popupWithImage.open(item.link, item.name);
    });
    cardList.addItem(card.generateCard());
  },
  selectors.elementsList
);


const popupAddPost = new PopupWithForm(
  selectors.popupAddPost,
  (inputValues) => {
    api.addNewCard(inputValues)
    .then(res => {
      const card = createCard(res, cardSelectors.elementTemplate, () => {
        popupWithImage.open(inputValues.link, inputValues.postName);
      });
      cardList.addItem(card.generateCard());
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
    });
  }
);

const addPostForm = new FormValidator(
  formSelectors,
  document.querySelector(selectors.popupAddPost)
);
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
});

//Добавление initialCards на экран
api.getCardsInfo()
  .then(res => {
  cardList.renderItems(res);
  })
  .catch(err => {
    console.log(`Ошибка: ${err}`)
  })
