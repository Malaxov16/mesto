import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    open(imageElement) {
        this._imagePopup = this._popup.querySelector('.popup__image');
        this._titleImage = this._popup.querySelector('.popup__image-title');
        this._imagePopup.src = imageElement.src;
        this._imagePopup.alt = imageElement.alt;
        this._titleImage.textContent = imageElement.alt;
        this._popup.classList.add('popup_opened');
        super.setEventListeners();
    }
}