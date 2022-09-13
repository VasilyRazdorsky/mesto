export default class Card {
  constructor({ data, handleCardClick, handleDeleteButtonClick }) {
    this._config = data.config;
    this._template = data.template;
    this.cardUserId = data.userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _toggleLikeButtonState() {
    this._element
      .querySelector(".element__like-button")
      .classList.toggle("element__like-button_active");
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__like-button")
      .addEventListener("click", () => {
        this._toggleLikeButtonState();
      });

    const removeButton = this._element.querySelector(".element__remove-button");
    if (removeButton) {
      removeButton.addEventListener("click", () => {
        this._handleDeleteButtonClick();
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
    this._element.querySelector(".element__like-counter").textContent =
      this._config.likeCount;

    return this._element;
  }
}
