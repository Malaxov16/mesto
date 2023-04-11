const validArguments = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_status_disabled',
    inputErrorClass: 'popup__field_type_error',
    errorVisibleClass: 'popup__field-error_status_visible'
}; 

//const formList = document.querySelector(validArguments.formSelector); //получаем форму редактирования профиля


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

enableValidation(validArguments);