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
    authorization: " 87a932a7-12e8-423b-b91b-02bb6834820c",
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
      profile.setUserInfo(res);
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
    api.changeAvatar(inputValues)
    .then(res => {
      profile.setUserAvatar(res);
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupChangeAvatar.close();
    });
  }
);
popupChangeAvatar.setEventListeners();

const changeAvatarForm = new FormValidator(
  formSelectors,
  document.querySelector(selectors.popupChangeAvatar)
)
changeAvatarForm.enableValidation();

profileAvatarButton.addEventListener("click", () => {
  popupInputAvatarHref.value = ""; 
  changeAvatarForm.cleanLastValidation();
  popupChangeAvatar.open();
})


// Редактирование профиля
const popupProfileEdit = new PopupWithForm(
  selectors.popupProfileEdit,
  (inputValues) => {
    api.changeUserInfo(inputValues)
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupProfileEdit.close();
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

// Взаимодействие с постом
const popupWithImage = new PopupWithImage(selectors.popupViewPost);
popupWithImage.setEventListeners();
const popupDeleteCard = new PopupWithSubmit(selectors.popupDeleteCard, (cardId) => {
  api.deleteCard(cardId).then().catch(err => {
    console.log(`Ошибка: ${err}`);
  })
});
popupDeleteCard.setEventListeners();

// Функция настройки карточки
const createCard = (
  config,
  template,
  userId,
  cardId,
  myUserId,
  handleCardClick,
  handleDeleteButtonClick,
  handleLikeButtonClick,
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

// Функция при нажатии на кнопку лайка
function handleAllLikeProcesses(card, likeButton, cardId){
  if(likeButton.classList.contains(cardSelectors.elementLikeButtonActiveState)){
    api.addLikeOnPost(cardId)
    .then(likesArr => {
      card.querySelector(cardSelectors.elementLikeCounter).textContent = likesArr.length;
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
    });
  } else {
    api.deleteLikeFromPost(cardId)
    .then(likesArr => {
      card.querySelector(cardSelectors.elementLikeCounter).textContent = likesArr.length;
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
    });
  }
}

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
      userData.id,
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
    if (card.cardUserId != userData.id) {
      cardList.addItem(card.generateCard(true));
    } else {
      cardList.addItem(card.generateCard(false));
    }
  }, selectors.elementsList);


  // Добавление поста
  const popupAddPost = new PopupWithForm(
    selectors.popupAddPost,
    (inputValues) => {
      api
        .addNewCard(inputValues)
        .then((res) => {
          const card = createCard(
            res,
            cardSelectors.elementTemplate,
            userData.id,
            res.cardId,
            userData.id,
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
          cardList.addItem(card.generateCard(false));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
          popupAddPost.close();
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
