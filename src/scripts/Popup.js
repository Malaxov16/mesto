export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(popupSelector);
        this._closeButtonPopup = this._popup.querySelector('.popup__close-button');
        this._imagePopup = this._popup.querySelector('.popup__image');
        this._titleImage = this._popup.querySelector('.popup__image-title');
    }

    open () {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close () {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
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