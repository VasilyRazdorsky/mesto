export default class Section {
    constructor({ items, renderer }, containerSelector){
        this._initialCards = items;
        this._renderer = renderer;
        this._containerElement = document.querySelector(containerSelector);
    }

    addItem(element){
        this._containerElement.prepend(element);
    }

    _clear(){
        this._containerElement.innerHTML = "";
    }

    renderItems(){
        this._clear();
        this._initialCards.forEach(item => {
            this._renderer(item);
        });
    }
}