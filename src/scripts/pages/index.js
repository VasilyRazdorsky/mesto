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

function getInitialUserInfo() {
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

profileEditButton.addEventListener("click", () => {
  popupInputName.value = profile.getUserInfo().profileName;
  popupInputMoreInfo.value = profile.getUserInfo().profileMoreInfo;
  profileEditForm.cleanLastValidation();
  popupProfileEdit.open();
});

//Добавление поста
const popupWithImage = new PopupWithImage(selectors.popupViewPost);
popupWithImage.setEventListeners();
const popupDeleteCard = new PopupWithSubmit(selectors.popupDeleteCard, (cardId) => {
  api.deleteCard(cardId).then().catch(err => {
    console.log(`Ошибка: ${err}`);
  })
});
popupDeleteCard.setEventListeners();


const createCard = (
  config,
  template,
  userId,
  cardId,
  handleCardClick,
  handleDeleteButtonClick
) => {
  const card = new Card({
    data: {
      config: config,
      template: template,
      userId: userId,
      cardId: cardId,
    },
    handleCardClick: handleCardClick,
    handleDeleteButtonClick: handleDeleteButtonClick,
  });
  return card;
};

api.getUserInfo().then((data) => {
  const userData = data;
  const cardList = new Section((item) => {
    const cardData = {
      name: item.name,
      link: item.link,
      likeCount: item.likes.length,
    };
    const card = createCard(
      cardData,
      cardSelectors.elementTemplate,
      item.owner._id,
      item._id,
      () => {
        popupWithImage.open(item.link, item.name);
      },
      (card, cardId) => {
        popupDeleteCard.open();
        popupDeleteCard.setAllInfoAboutCard(card, cardId);
      }
    );
    if (card.cardUserId != userData.id) {
      cardList.addItem(card.generateCard(true));
    } else {
      cardList.addItem(card.generateCard(false));
    }
  }, selectors.elementsList);

  const popupAddPost = new PopupWithForm(
    selectors.popupAddPost,
    (inputValues) => {
      api
        .addNewCard(inputValues, userData._id)
        .then((res) => {
          const card = createCard(
            res,
            cardSelectors.elementTemplate,
            userData.id,
            res.cardId,
            () => {
              popupWithImage.open(inputValues.link, inputValues.postName);
            },
            (card, cardId) => {
              popupDeleteCard.open();
              popupDeleteCard.setAllInfoAboutCard(card, cardId);
            }
          );
          cardList.addItem(card.generateCard(false));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  );
  popupAddPost.setEventListeners();
  const addPostForm = new FormValidator(
    formSelectors,
    document.querySelector(selectors.popupAddPost)
  );
  addPostForm.enableValidation();

  profileAddPostButton.addEventListener("click", () => {
    popupAddPostName.value = "";
    popupAddPostImgHref.value = "";
    addPostForm.cleanLastValidation();
    popupAddPost.open();
  });

  getInitialCards(cardList);
});

//Добавление initialCards на экран
function getInitialCards(cardList) {
  api
    .getCardsInfo()
    .then((res) => {
      cardList.renderItems(res);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}
