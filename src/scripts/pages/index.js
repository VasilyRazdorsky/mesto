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
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-50",
  headers: {
    authorization: " 87a932a7-12e8-423b-b91b-02bb6834820c",
    "Content-Type": "application/json",
  },
});
//Редактирование профиля

const profile = new UserInfo({
  profileName: selectors.profileName,
  profileMoreInfo: selectors.profileMoreInfo,
  profileAvatar: selectors.profileAvatar,
});

function getInitialUserInfo(){
  api
  .getUserInfo()
  .then((res) => {
    profile.setUserInfo(res);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });
}
getInitialUserInfo();


const popupProfileEdit = new PopupWithForm(
  selectors.popupProfileEdit,
  (inputValues) => {
    api.changeUserInfo(inputValues).catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
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
const popupDeleteCard = new PopupWithSubmit(selectors.popupDeleteCard);
popupDeleteCard.setEventListeners();

const createCard = (
  config,
  template,
  userId,
  handleCardClick,
  handleDeleteButtonClick
) => {
  const card = new Card({
    data: {
      config: config,
      template: template,
      userId: userId,
    },
    handleCardClick: handleCardClick,
    handleDeleteButtonClick: handleDeleteButtonClick
  }
  );
  return card;
};



const cardList = new Section((item) => {
  const cardData = {
    name: item.name,
    link: item.link,
    likeCount: item.likes.length,
  };
  const card = createCard(
      cardData,
      cardSelectors.elementTemplate,
      () => {
        popupWithImage.open(item.link, item.name);
      },
      () => {
        popupDeleteCard.open();
      }
  );
  cardList.addItem(card.generateCard());
  
}, selectors.elementsList);

const popupAddPost = new PopupWithForm(
  selectors.popupAddPost,
  (inputValues) => {
    api
      .addNewCard(inputValues)
      .then((res) => {
        const card = createCard(
          res,
          cardSelectors.elementTemplate,
          () => {
            popupWithImage.open(inputValues.link, inputValues.postName);
          },
          () => {
            popupDeleteCard.open();
          }
        );
        cardList.addItem(card.generateCard());
      })
      .catch((err) => {
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

// Попап удаления карточки

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
function getInitialCards(){
  api
  .getCardsInfo()
  .then((res) => {
    cardList.renderItems(res);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });
}
getInitialCards();

