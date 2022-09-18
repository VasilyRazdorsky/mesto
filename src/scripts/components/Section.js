export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._containerElement.prepend(element);
  }

  _clear() {
    this._containerElement.innerHTML = "";
  }

  renderItems(initialCards) {
    this._clear();
    initialCards.forEach((item) => {
      this._renderer(item);
    });
  }
}
