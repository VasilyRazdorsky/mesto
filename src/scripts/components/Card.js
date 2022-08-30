export default class Card {
    constructor(config, template, handleCardClick) {
        this._config = config;
        this._template = template;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._template)
        .content
        .querySelector(".element")
        .cloneNode(true);

        return cardElement;
    }

    _toggleLikeButtonState() {
        this._element.querySelector(".element__like-button").classList.toggle("element__like-button_active");
    }

    _removeCardFromPage() {
        this._element.remove();
    }

    _setEventListeners() {
        this._element.querySelector(".element__like-button").addEventListener("click", () => {
            this._toggleLikeButtonState();
        });

        this._element.querySelector(".element__remove-button").addEventListener("click", () => {
            this._removeCardFromPage();
        });

        this._element.querySelector(".element__view-button").addEventListener("click", () => {
            this._handleCardClick();
        });
    }

    generateCard() {
        this._element = this._getTemplate();

        this._setEventListeners();

        this._element.querySelector(".element__name").textContent = this._config.name;
        const elementPhoto = this._element.querySelector(".element__photo");
        elementPhoto.alt = this._config.name;
        elementPhoto.src = this._config.link;

        return this._element;
    }
}