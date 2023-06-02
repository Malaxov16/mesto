import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._submitForm = submitForm;
        this._inputList = Array.from(this._form.querySelectorAll('.popup__field'));
        this._dataForm = {};
        this._submitButton = this._form.querySelector('.popup__button');
        this._valueButton = this._submitButton.getAttribute('value');
    }

    _getInputValues() {
        this._inputList.forEach(input => {
            this._dataForm[input.name] = input.value;
        })
        return this._dataForm;
    }

    setInputValues(userInfo) {
        this._inputList.forEach(input => {
            input.value = userInfo[input.name];
        })
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => { 
            evt.preventDefault();
            this._submitForm(this._getInputValues());
        });
    };

    close() {
        super.close();
        this._form.reset();
    }

    showLoadStatus(isLoading, statusText = '') {
        if (isLoading) {
            this._submitButton.setAttribute('value', statusText)
        } else {
            this._submitButton.setAttribute('value', this._valueButton)
        }
    }
}