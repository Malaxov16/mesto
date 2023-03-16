// Находим форму в DOM
let formElement = document.querySelector('.popup__form')// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__field_type_name')// Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__field_type_job') // Воспользуйтесь инструментом .querySelector()
let editButton = document.querySelector('.profile__edit-button') //получаем кнопку редактирования
let closeButton = document.querySelector('.popup__close-button') //получаем кнопку закрытия окна
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
let popupForm = document.querySelector('.popup'); //получаем popup
    //получаем текстовые узлы имя и профессию, присваиваем их значения полям на форме
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
function openPopup (){
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    //отображаем popup
    popupForm.classList.add('popup_opened');
}

function closePopup () {
    popupForm.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);