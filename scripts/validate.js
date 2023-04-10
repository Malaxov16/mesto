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
const showError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //получаем элемент для отображения текста ошибки
    inputElement.classList.add(validArguments.inputErrorClass); //применяем стили для поля с ошибкой
    errorElement.textContent = errorMessage; //добавляем текст ошибки
    errorElement.classList.add(validArguments.errorVisibleClass); //показываем элемент с текстом ошибки
}

//функция скрытия ошибки: удаляет текст ошибки и отменяет визуальное оформление полей с ошибкой
const hideError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); //получаем элемент для отображения текста ошибки
    inputElement.classList.remove(validArguments.inputErrorClass); //применяем стили для поля с ошибкой
    errorElement.textContent = ''; //удаляем текст ошибки
    errorElement.classList.remove(validArguments.errorVisibleClass); //показываем элемент с текстом ошибки
}

//функция проверяет поля на правильность ввода: если ошибка, то отображаем ошибку, иначе скрываем ошибку
const checkInputValidity = (formElement, inputElement) => {
    //console.log(inputElement.validity.valid);
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideError(formElement, inputElement);
    }
}

//функция полчает форму и устанавливает слушатели на поля ввода
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validArguments.inputSelector)); //получаем список инпутов с формы редактирвоания пофиля
    const buttonElement = formElement.querySelector(validArguments.submitButtonSelector);
    toggleButtonStatus(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement);
            toggleButtonStatus(inputList, buttonElement);
        });
        hideError(formElement, inputElement);
    })
}

//функция проверяет все инпуты внутри формы и если хотя бы один с ошибкой, возвращает true
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

const toggleButtonStatus = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(validArguments.inactiveButtonClass);
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(validArguments.inactiveButtonClass);
    };
}

//функция отменяет действие по-умолачнию для каждой формы и вызывает функцию установки слушателей
const enableValidate = () => {
    const formList = Array.from(document.querySelectorAll(validArguments.formSelector)); //получаем форму редактирования профиля
    formList.forEach((formElement)=>{
        formElement.addEventListener('submit', function(evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    })
}

enableValidate();