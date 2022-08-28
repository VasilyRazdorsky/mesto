export default class Card {
    constructor(config, template, handleCardClick) {
        this._config = config;
        this._template = template;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._config.elementTemplate)
        .content
        .querySelector(this._config.element)
        .cloneNode(true);

        return cardElement;
    }

    _toggleLikeButtonState() {
        this._element.querySelector(this._config.elementLikeButton).classList.toggle(this._config.elementLikeButtonActiveState);
    }

    _removeCardFromPage() {
        this._element.remove();
    }

    _setEventListeners() {
        this._element.querySelector(this._config.elementLikeButton).addEventListener("click", () => {
            this._toggleLikeButtonState();
        });

        this._element.querySelector(this._config.elementRemoveButton).addEventListener("click", () => {
            this._removeCardFromPage();
        });

        this._element.querySelector(this._config.elementViewButton).addEventListener("click", () => {
            this._handleCardClick();
        });
    }

    generateCard() {
        this._element = this._getTemplate();

        this._setEventListeners();

        this._element.querySelector(this._config.elementName).textContent = this._config.name;
        const elementPhoto = this._element.querySelector(this._config.elementPhoto);
        elementPhoto.alt = this._config.name;
        elementPhoto.src = this._config.link;

        return this._element;
    }
}