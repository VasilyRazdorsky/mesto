import {cardSelectors} from "./data.js";
import {viewPostPhoto} from "./index.js";

class Card {
    constructor(config, template) {
        this._config = config;
        this._template = template;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(cardSelectors.elementTemplate)
        .content
        .querySelector(cardSelectors.element)
        .cloneNode(true);

        return cardElement;
    }

    _toggleLikeButtonState() {
        this._element.querySelector(cardSelectors.elementLikeButton).classList.toggle(cardSelectors.elementLikeButtonActiveState);
    }

    _removeCardFromPage() {
        this._element.remove();
    }

    _setEventListeners() {
        this._element.querySelector(cardSelectors.elementLikeButton).addEventListener("click", () => {
            this._toggleLikeButtonState();
        });

        this._element.querySelector(cardSelectors.elementRemoveButton).addEventListener("click", () => {
            this._removeCardFromPage();
        });

        this._element.querySelector(cardSelectors.elementViewButton).addEventListener("click", () => {
            viewPostPhoto(this._config.link, this._config.name);
        });
    }

    generateCard() {
        this._element = this._getTemplate();

        this._setEventListeners();

        this._element.querySelector(cardSelectors.elementName).textContent = this._config.name;
        const elementPhoto = this._element.querySelector(cardSelectors.elementPhoto);
        elementPhoto.alt = this._config.name;
        elementPhoto.src = this._config.link;

        return this._element;
    }
}

export {Card};