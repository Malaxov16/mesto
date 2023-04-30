const validArguments = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_status_disabled',
    inputErrorClass: 'popup__field_type_error',
    errorVisibleClass: 'popup__field-error_status_visible'
}; 

//const formList = document.querySelector(validArguments.formSelector); //получаем форму редактирования профиля

//создать класс
class FormValidator {
    constructor (validArguments, templateFormSelector) {
        this._validArguments = validArguments;
        this._templateFormSelector = templateFormSelector;
    }

    //метод показывает инфомрацию об ошибке
    _showError () {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //получаем элемент для отображения текста ошибки
        inputElement.classList.add(this._validArguments.inputErrorClass); //применяем стили для поля с ошибкой
        errorElement.textContent = errorMessage; //добавляем текст ошибки
        errorElement.classList.add(this._validArguments.errorVisibleClass); 
    }

    //метод скрывает информацию об ошибке
    _hideError () {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //получаем элемент для отображения текста ошибки
        inputElement.classList.remove(this._validArguments.inputErrorClass); //применяем стили для поля с ошибкой
        errorElement.textContent = ''; //удаляем текст ошибки
        errorElement.classList.remove(this._validArguments.errorVisibleClass); //показываем элемент с текстом ошибки
    }

    //метод выполняет проверку на корректность заполнения поля
    _checkInputValidity () {
        //console.log(inputElement.validity.valid);
        if (!inputElement.validity.valid) {
            console.log(inputElement);
        } else {
            console.log(inputElement);
        }
    }

    _hasInvalidInput () {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    
    _toggleButtonStatus () {
        console.log(this)
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
             disableButton(buttonElement, settings);
        });
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity();
                this._toggleButtonStatus();
            });
            //this._hideError();
        })
    }

    

    enableValidation () {
        this._formElement = document.querySelector(this._templateFormSelector); //получаем форму редактирования профиля
        this._formElement.addEventListener('submit', function(evt) {
                evt.preventDefault();
            });
        this._setEventListeners();
        
    }
}

const formValidator = new FormValidator(validArguments, '.popup__form_edit');
formValidator.enableValidation();

//функция отображения ошиюки: выводит текст ошибки и применяет визуальное оформление полей с ошибкой
const showError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //получаем элемент для отображения текста ошибки
    inputElement.classList.add(settings.inputErrorClass); //применяем стили для поля с ошибкой
    errorElement.textContent = errorMessage; //добавляем текст ошибки
    errorElement.classList.add(settings.errorVisibleClass); //показываем элемент с текстом ошибки
}

//функция скрытия ошибки: удаляет текст ошибки и отменяет визуальное оформление полей с ошибкой
const hideError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //получаем элемент для отображения текста ошибки
    inputElement.classList.remove(settings.inputErrorClass); //применяем стили для поля с ошибкой
    errorElement.textContent = ''; //удаляем текст ошибки
    errorElement.classList.remove(settings.errorVisibleClass); //показываем элемент с текстом ошибки
}

//функция проверяет поля на правильность ввода: если ошибка, то отображаем ошибку, иначе скрываем ошибку
const checkInputValidity = (formElement, inputElement, settings) => {
    //console.log(inputElement.validity.valid);
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideError(formElement, inputElement, settings);
    }
}

//функция полчает форму и устанавливает слушатели на поля ввода
const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector)); //получаем список инпутов с формы редактирвоания пофиля
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    toggleButtonStatus(inputList, buttonElement, settings);
    formElement.addEventListener('reset', () => {
        disableButton(buttonElement, settings);
    });
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement, settings);
            toggleButtonStatus(inputList, buttonElement, settings);
        });
        hideError(formElement, inputElement, settings);
    })
}

//функция проверяет все инпуты внутри формы и если хотя бы один с ошибкой, возвращает true
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

const toggleButtonStatus = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement, settings);
    } else {
        enableButton(buttonElement, settings);
    };
}

//функция деактиваирует кнопку на форме popup
const disableButton = (buttonElement, settings) => {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(settings.inactiveButtonClass);
}

//функция активирует кнопку на форме popup
const enableButton = (buttonElement, settings) => {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(settings.inactiveButtonClass);
}

//функция отменяет действие по-умолачнию для каждой формы и вызывает функцию установки слушателей
const enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector)); //получаем форму редактирования профиля
    formList.forEach((formElement)=>{
        formElement.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, settings);
    })
}

//enableValidation(validArguments);