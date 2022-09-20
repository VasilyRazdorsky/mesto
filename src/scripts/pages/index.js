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
import { cardList } from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import { api } from "../components/Api.js";

// Создание профиля
const profile = new UserInfo({
  profileName: selectors.profileName,
  profileMoreInfo: selectors.profileMoreInfo,
  profileAvatar: selectors.profileAvatar,
});

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
        popupChangeAvatar.changeSubmitButtonText("Сохранить");
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
        popupProfileEdit.changeSubmitButtonText("Сохранить");
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
  selectors.popupDeleteCard
);
popupDeleteCard.setEventListeners();

// Функция настройки карточки
function createCardElement(cardInfo){
  const card = new Card(
    cardInfo,
    cardSelectors.elementTemplate,
    () => {
      popupWithImage.open(cardInfo.link, cardInfo.name);
    },
    (cardId) => {
      popupDeleteCard.open();
      popupDeleteCard.setSubmitHadler(() => {
        api.deleteCard(cardId)
        .then((res) => {
          card.deleteCardFromPage();
          popupDeleteCard.close();
          popupDeleteCard.changeSubmitButtonText("Да");
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
      });
    },
    (cardId) => {
      if(card.getLikeButtonState()){
        api.addLikeOnPost(cardId)
        .then((res) => {
          card.changeLikeCounter(res.likes.length);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
      } else {
        api.deleteLikeFromPost(cardId)
        .then((res) => {
          card.changeLikeCounter(res.likes.length);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
      }
    },
  );
  return card.generateCard();
}



function getAllInitialData() {
  return Promise.all([api.getUserInfo(), api.getCardsInfo()]);
}
let userId;
getAllInitialData().then(([userInfo, initialCards]) => {
  // Начальная информация профиля
  const data = {
    name: userInfo.name,
    moreInfo: userInfo.about,
    avatarUrl: userInfo.avatar,
    id: userInfo._id,
  }
  profile.setUserInfo(data);
  userId = data.id;


  // Настройка секции для постов
  cardList.setRenderer((item) =>{
    item.userId = userId;
    const cardElement = createCardElement(item);
    cardList.addItem(cardElement);
  });

  //Добавление initial Cards на экран
  cardList.renderItems(initialCards);
})
.catch((err) => {
  console.log(`Ошибка: ${err}`);
});


// Добавление постов
const popupAddPost = new PopupWithForm(
  selectors.popupAddPost,
  (inputValues) => {
    api
      .addNewCard(inputValues)
      .then((res) => {
        console.log(res);
        const cardElement = createCardElement(res);
        cardList.addItem(cardElement);
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
