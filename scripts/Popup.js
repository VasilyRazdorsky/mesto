class Popup {
    constructor(popupSelector) {
        this.popupSelector = popupSelector;
        this.popupElement = document.querySelector(this.popupSelector);
        console.log(this.popupElement);
    }

    _handleEscClose = (evt) => {
        if(evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners(){
        this.popupElement.addEventListener("mousedown", (evt) => {
            if(evt.target.classList.contains("popup_active")){
                this.close();
            }
            if (evt.target.closest(".popup__close-button")) {
                this.close();
            }
        })
    }

    open(){
        document.addEventListener('keydown', this._handleEscClose);
        this.popupElement.classList.add("popup_active");
    }

    close = () => {
        document.removeEventListener('keydown', this._handleEscClose);
        this.popupElement.classList.remove("popup_active");
    }
}

export { Popup };