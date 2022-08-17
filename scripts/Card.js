import {cardSelectors} from "./data.js";

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

    generateCard() {
        this._element = this._getTemplate();

        this._element.querySelector(cardSelectors.elementName).textContent = this._config.name;
        const elementPhoto = this._element.querySelector(cardSelectors.elementPhoto);
        elementPhoto.alt = this._config.name;
        elementPhoto.src = this._config.link;

        return this._element;
    }
}

export {Card};