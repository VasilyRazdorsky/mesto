export default class Card {
  constructor({ data, handleCardClick, handleDeleteButtonClick, handleLikeButtonClick }) {
    this._config = data.config;
    this._template = data.template;
    this.cardUserId = data.userId;
    this.cardId = data.cardId;
    this.myUserId = data.myUserId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _toggleLikeButtonState(likeButton) {
    if(likeButton.classList.contains("element__like-button_active")){
      likeButton.classList.remove("element__like-button_active");
    } else {
      likeButton.classList.add("element__like-button_active");
    }
  }

  _setBasicLikeStatus(data){
    this._element.querySelector(".element__like-counter").textContent =
      data.length;
    data.forEach(obj => {
      if(obj._id === this.myUserId){
        this._likeButton.classList.add("element__like-button_active");
      }
    })
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".element__like-button");
    this._likeButton.addEventListener("click", () => {
        this._toggleLikeButtonState(this._likeButton);
        this._handleLikeButtonClick(this._element ,this._likeButton ,this.cardId);
      });

    const removeButton = this._element.querySelector(".element__remove-button");
    if (removeButton) {
      removeButton.addEventListener("click", () => {
        this._handleDeleteButtonClick(this._element, this.cardId);
      });
    }

    this._element
      .querySelector(".element__view-button")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }

  generateCard(withoutDeleteButton) {
    this._element = this._getTemplate();

    this._setEventListeners();

    if (withoutDeleteButton) {
      this._element.querySelector(".element__remove-button").remove();
    }

    this._element.querySelector(".element__name").textContent =
      this._config.name;
    const elementPhoto = this._element.querySelector(".element__photo");
    elementPhoto.alt = this._config.name;
    elementPhoto.src = this._config.link;

    this._setBasicLikeStatus(this._config.likesArray);

    return this._element;
  }
}
