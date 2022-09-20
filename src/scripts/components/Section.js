class Section {
  constructor(containerSelector) {
    this._containerElement = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._containerElement.prepend(element);
  }

  setRenderer(newRenderer){
    this._renderer = newRenderer;
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

export const cardList = new Section(".elements")
