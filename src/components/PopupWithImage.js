import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);
        this._imagePopup = this._popup.querySelector('.popup__image');
        this._titleImage = this._popup.querySelector('.popup__image-title');
    }
    open(imageElement) {
        this._imagePopup.src = imageElement.src;
        this._imagePopup.alt = imageElement.alt;
        this._titleImage.textContent = imageElement.alt;
        super.open();
    }
}