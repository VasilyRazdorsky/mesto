export default class Card {
  constructor(
    cardInfo,
    cardTemplate,
    handleCardClick,
    handleDeleteButtonClick,
    handleLikeButtonClick,
  ) {
    this._cardInfo = cardInfo;
    this._template = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeButtonClick = handleLikeButtonClick;

    this._userId = this._cardInfo.userId;
    this._ownerId = this._cardInfo.owner._id;
    
    
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _toggleLikeButtonState(likeButton) {
    if (likeButton.classList.contains("element__like-button_active")) {
      likeButton.classList.remove("element__like-button_active");
    } else {
      likeButton.classList.add("element__like-button_active");
    }
  }

  getLikeButtonState(){
    return this._likeButton.classList.contains("element__like-button_active");
  }

  changeLikeCounter(value){
    this._likeCounter.textContent = value;
  }

  _setBasicLikeStatus(data) {
    this._likeCounter = this._element.querySelector(".element__like-counter");
    this._likeCounter.textContent = data.length;
    data.forEach((obj) => {
      if (obj._id === this._userId) {
        this._likeButton.classList.add("element__like-button_active");
      }
    });
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".element__like-button");
    this._likeButton.addEventListener("click", () => {
      this._toggleLikeButtonState(this._likeButton);
      this._handleLikeButtonClick(this._cardInfo._id);
    });

    const removeButton = this._element.querySelector(".element__remove-button");
    if (removeButton) {
      removeButton.addEventListener("click", () => {
        this._handleDeleteButtonClick(this._cardInfo._id);
      });
    }

    this._element
      .querySelector(".element__view-button")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }

  deleteCardFromPage() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    if(this._ownerId != this._userId && this._userId){
      this._element.querySelector(".element__remove-button").remove();
    }

    this._element.querySelector(".element__name").textContent =
      this._cardInfo.name;
    const elementPhoto = this._element.querySelector(".element__photo");
    elementPhoto.alt = this._cardInfo.name;
    elementPhoto.src = this._cardInfo.link;

    this._setBasicLikeStatus(this._cardInfo.likes);

    return this._element;
  }
}
