import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    open(imageElement) {
        this._imagePopup.src = imageElement.src;
        this._imagePopup.alt = imageElement.alt;
        this._titleImage.textContent = imageElement.alt;
        super.open();
    }
}