import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._submitButton = this._form.querySelector('.popup__button');
        this._valueButton = this._submitButton.getAttribute('value');
    }

    setSubmitAction(functionSubmit) {
        this._functionSubmit = functionSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit',(evt) => {
            evt.preventDefault();
            this._functionSubmit();
        })
    };

    showLoadStatus(isLoading, statusText = '') {
        if (isLoading) {
            this._submitButton.setAttribute('value', statusText)
        } else {
            this._submitButton.setAttribute('value', this._valueButton)
        }
    }
}