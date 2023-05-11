export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(popupSelector);
        this._closeButtonPopup = this._popup.querySelector('.popup__close-button');
    }

    open () {
        this._popup.classList.add('popup_opened');
        this.setEventListeners();
    }

    close () {
        this._popup.classList.remove('popup_opened');
        this._removeEventListeners();
    }

    _handleEscClose = (evt) => {
        if (evt.target === 'Escape') {
            this._popup.close();
        }
    }

    _clickOverlayClose = (evt) => {
        if (evt.target.classList.contains('popup')) {
            this._popup.close();
        }
    }

    setEventListeners() {
        this._closeButtonPopup.addEventListeners('click', () => this.close());
        this._popup.addEventListeners('click', this._clickOverlayClose);
        document.addEventListener('keydown', this._handleEscClose);
    }

    _removeEventListeners() {
        this._popup.removeEventListener('click', this._clickOverlayClose);
        document.removeEventListener('keydown', this._handleEscClose);
    }
}