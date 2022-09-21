export default class Section {
  constructor(containerSelector, renderer) {
    this._containerElement = document.querySelector(containerSelector);
    this._renderer = renderer;
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
