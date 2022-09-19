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
  profileAvatarButton,
  popupInputAvatarHref,
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
    authorization: "87a932a7-12e8-423b-b91b-02bb6834820c",
    "Content-Type": "application/json",
  },
});

// Создание профиля
const profile = new UserInfo({
  profileName: selectors.profileName,
  profileMoreInfo: selectors.profileMoreInfo,
  profileAvatar: selectors.profileAvatar,
});

function getInitialUserInfo() {
  api
    .getUserInfo()
    .then((res) => {
      const data = {
        name: res.name,
        moreInfo: res.about,
        avatarUrl: res.avatar,
        id: res._id,
      }
      profile.setUserInfo(data);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}
getInitialUserInfo();

// Смена аватара
const popupChangeAvatar = new PopupWithForm(
  selectors.popupChangeAvatar,
  (inputValues) => {
    api
      .changeAvatar(inputValues)
      .then((res) => {
        profile.setUserAvatar(res);
        popupChangeAvatar.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupChangeAvatar.submitButton.textContent = "Сохранить";
      });
  }
);
popupChangeAvatar.setEventListeners();

const changeAvatarForm = new FormValidator(
  formSelectors,
  document.querySelector(selectors.popupChangeAvatar)
);
changeAvatarForm.enableValidation();

profileAvatarButton.addEventListener("click", () => {
  popupInputAvatarHref.value = "";
  changeAvatarForm.cleanLastValidation();
  popupChangeAvatar.open();
});

// Редактирование профиля
const popupProfileEdit = new PopupWithForm(
  selectors.popupProfileEdit,
  (inputValues) => {
    api
      .changeUserInfo(inputValues)
      .then(() => {
        profile.setUserInfo(inputValues);
        popupProfileEdit.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupProfileEdit.submitButton.textContent = "Сохранить";
      });
  }
);
const profileEditForm = new FormValidator(
  formSelectors,
  document.querySelector(selectors.popupProfileEdit)
);
profileEditForm.enableValidation();
popupProfileEdit.setEventListeners();

profileEditButton.addEventListener("click", () => {
  popupInputName.value = profile.getUserName();
  popupInputMoreInfo.value = profile.getUserMoreInfo();
  profileEditForm.cleanLastValidation();
  popupProfileEdit.open();
});

// Взаимодействие с постом
const popupWithImage = new PopupWithImage(selectors.popupViewPost);
popupWithImage.setEventListeners();
const popupDeleteCard = new PopupWithSubmit(
  selectors.popupDeleteCard,
  (card, cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        card.remove();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
);
popupDeleteCard.setEventListeners();



// Функция при нажатии на кнопку лайка
function handleAllLikeProcesses(card, likeButton, cardId) {
  if (
    likeButton.classList.contains(cardSelectors.elementLikeButtonActiveState)
  ) {
    api
      .addLikeOnPost(cardId)
      .then((res) => {
        const likesArr = res.likes;
        card.querySelector(cardSelectors.elementLikeCounter).textContent =
          likesArr.length;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  } else {
    api
      .deleteLikeFromPost(cardId)
      .then((res) => {
        const likesArr = res.likes;
        card.querySelector(cardSelectors.elementLikeCounter).textContent =
          likesArr.length;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
}

// Функция настройки карточки
const createCard = (
  config,
  template,
  userId,
  cardId,
  myUserId,
  handleCardClick,
  handleDeleteButtonClick,
  handleLikeButtonClick
) => {
  const card = new Card({
    data: {
      config: config,
      template: template,
      userId: userId,
      cardId: cardId,
      myUserId: myUserId,
    },
    handleCardClick: handleCardClick,
    handleDeleteButtonClick: handleDeleteButtonClick,
    handleLikeButtonClick: handleLikeButtonClick,
  });
  return card;
};

api.getUserInfo().then((data) => {
  const userData = data;

  // Создание и настройка секции для постов
  const cardList = new Section((item) => {
    const cardData = {
      name: item.name,
      link: item.link,
      likesArray: item.likes,
    };
    const card = createCard(
      cardData,
      cardSelectors.elementTemplate,
      item.owner._id,
      item._id,
      userData._id,
      () => {
        popupWithImage.open(item.link, item.name);
      },
      (card, cardId) => {
        popupDeleteCard.open();
        popupDeleteCard.setAllInfoAboutCard(card, cardId);
      },
      (card, likeButton, cardId) => {
        handleAllLikeProcesses(card, likeButton, cardId);
      }
    );
    console.log(card);
    cardList.addItem(card.generateCard());
  }, selectors.elementsList);

  // Добавление поста
  const popupAddPost = new PopupWithForm(
    selectors.popupAddPost,
    (inputValues) => {
      api
        .addNewCard(inputValues)
        .then((res) => {
          const cardData = {
            name: res.name,
            link: res.link,
            cardId: res._id,
            likesArray: res.likes,
          }
          const card = createCard(
            cardData,
            cardSelectors.elementTemplate,
            userData._id,
            cardData.cardId,
            userData._id,
            () => {
              popupWithImage.open(inputValues.link, inputValues.postName);
            },
            (card, cardId) => {
              popupDeleteCard.open();
              popupDeleteCard.setAllInfoAboutCard(card, cardId);
            },
            (card, likeButton, cardId) => {
              handleAllLikeProcesses(card, likeButton, cardId);
            }
          );
          cardList.addItem(card.generateCard());
          popupAddPost.close();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
          popupAddPost.submitButton.textContent = "Сохранить";
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
    addPostForm.cleanLastValidation();
    popupAddPost.open();
  });

  getInitialCards(cardList);
});

//Добавление initial Cards на экран
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
