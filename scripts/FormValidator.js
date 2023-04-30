

//создать класс
export default class FormValidator {
    constructor (validArguments, formElement) {
        this._validArguments = validArguments;
        this._formElement = formElement;
        //this._templateFormSelector = templateFormSelector;
    }

    //метод показывает инфомрацию об ошибке
    _showError (inputElement) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`); //получаем элемент для отображения текста ошибки
        inputElement.classList.add(this._validArguments.inputErrorClass); //применяем стили для поля с ошибкой
        this._errorElement.textContent = inputElement.validationMessage; //добавляем текст ошибки
        this._errorElement.classList.add(this._validArguments.errorVisibleClass); 
    }

    //метод скрывает информацию об ошибке
    _hideError (inputElement) {
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`); //получаем элемент для отображения текста ошибки
        inputElement.classList.remove(this._validArguments.inputErrorClass); //применяем стили для поля с ошибкой
        this._errorElement.textContent = ''; //удаляем текст ошибки
        this._errorElement.classList.remove(this._validArguments.errorVisibleClass); //показываем элемент с текстом ошибки
    }

    resetTextError () {
        this._inputList.forEach((inputElement) => {
            this._hideError(inputElement);
        })
    }

    //метод выполняет проверку на корректность заполнения поля
    _checkInputValidity (inputElement) {
        //console.log(inputElement.validity.valid);
        if (!inputElement.validity.valid) {
            this._showError(inputElement);
        } else {
            this._hideError(inputElement);
        }
    }

    _hasInvalidInput () {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    
    _toggleButtonStatus () {
        if (this._hasInvalidInput()) {
            this._disableButton();
        } else {
            this._enableButton();
        };
    }

    //функция деактиваирует кнопку на форме popup
    _disableButton () {
        this._buttonElement.setAttribute('disabled', true);
        this._buttonElement.classList.add(this._validArguments.inactiveButtonClass);
    }

    //функция активирует кнопку на форме popup
    _enableButton () {
        this._buttonElement.removeAttribute('disabled');
        this._buttonElement.classList.remove(this._validArguments.inactiveButtonClass);
    }

    _setEventListeners () {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._validArguments.inputSelector)); //получаем список инпутов с формы редактирвоания пофиля
        this._buttonElement = this._formElement.querySelector(this._validArguments.submitButtonSelector);
        this._toggleButtonStatus();
        this._formElement.addEventListener('reset', () => {
             this._disableButton();
        });
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonStatus();
            });
            //this._hideError();
        })
    }

    

    enableValidation () {
        
        this._formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
        this._setEventListeners();
        
    }
}