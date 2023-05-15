export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(popupSelector);
        this._closeButtonPopup = this._popup.querySelector('.popup__close-button');
    }

    open () {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close () {
        this._popup.classList.remove('popup_opened');
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _clickOverlayClose = (evt) => {
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    }

    setEventListeners() {
        this._closeButtonPopup.addEventListener('click', () => this.close());
        this._popup.addEventListener('click', this._clickOverlayClose);
        
    }

    // _removeEventListeners() {
    //     this._popup.removeEventListener('click', this._clickOverlayClose);
    //     document.removeEventListener('keydown', this._handleEscClose);
    // }
}