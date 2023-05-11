import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";


//------------------------------------------------------------
//переменные для проверки форм
const validArguments = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_status_disabled',
    inputErrorClass: 'popup__field_type_error',
    errorVisibleClass: 'popup__field-error_status_visible'
}; 

const formEdit = document.querySelector('.popup__form_edit'); //получаем форму редактирования профиля
const formAdd = document.querySelector('.popup__form_add'); // получаем форму добавления картинки


//--------------------------------------------------------------
//переменные для добавления карточек

//предзагруженные карточки
const initialCards = [
    {
      name: 'Вологда',
      link: './images/vologda.jpg'
    },
    {
      name: 'Череповец',
      link: './images/cherepovets.jpg'
    },
    {
      name: 'Андома гора',
      link: './images/andoma.jpg'
    },
    {
      name: 'Белозерск',
      link: './images/belozersk.jpg'
    },
    {
      name: 'Кирилло-Белозерский монастырь',
      link: './images/monastyr.jpg'
    },
    {
      name: 'Великий Устюг',
      link: './images/ustug.jpg'
    }
  ]; 



const formElementEdit = document.forms['popup-form-ProfileEdit']; // Находим форму редактирования профиля в DOM 
const formElementAdd = document.forms['popup-form-NewCard']; // получаем форму добавления картинки
// Находим поля формы в DOM
const nameInput = formElementEdit.querySelector('.popup__field_type_name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = formElementEdit.querySelector('.popup__field_type_job'); // Воспользуйтесь инструментом .querySelector()
const editButton = document.querySelector('.profile__edit-button'); //получаем кнопку редактирования
const closeButtonEdit = document.querySelector('.popup__close-button_edit'); //получаем кнопку закрытия окна редактирвоания профиля
const addButton = document.querySelector('.profile__add-button'); //получаем кнопку для добавления картинки
const closeButtonAdd = document.querySelector('.popup__close-button_add'); //получаем кнопку закрытия окна добавления картинки
const closeButtonImage = document.querySelector('.popup__close-button_image') //получаем кнопку закрытия popup для просмотра картинки
const closeButtons = document.querySelectorAll('.popup__close-button');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
const popupEdit = document.querySelector('.popup_edit'); //получаем popup
    //получаем текстовые узлы имя и профессию, присваиваем их значения полям на форме
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popupAdd = document.querySelector('.popup_add'); //получаем popup для добавления новой карточки
const popupImage = document.querySelector('.popup_image'); //получаем popup для просмотра картинки
const image = popupImage.querySelector('.popup__image'); //получаем картинку для popup
const titleImg = popupImage.querySelector('.popup__image-title'); //получаем заголовок для картинки в popup

const cardTemplate = document.querySelector('#card').content; //получаем шаблон для создания карточки
const templateCardSelector = '#card';


const elementsPart = document.querySelector('.elements'); //получаем секцию для карточек
const nameCardInput = formElementAdd.querySelector('.popup__field_type_title'); //получаем поле Название popup для добавления картинки
const linkCardInput = formElementAdd.querySelector('.popup__field_type_link'); //получаем поле Ссылка popup для добавления картинки

//селекторы
const containerCardSelector = '.elements';

//------------------------------------------------------------
//раздел карточек и попапов

//открываем popup
function openPopup (popupName){
    //отображаем popup
    popupName.classList.add('popup_opened');
    setCloseListeners(popupName);
}

//закрываем popup
function closePopup (popupName) {
    //скрываем popup
    removeCloseListeners(popupName);
    popupName.classList.remove('popup_opened');
}

//открыаем popup для просмотра картинки
function openPopupImage(clickImg){
    image.src = clickImg.src;
    image.alt = clickImg.alt;
    titleImg.textContent = clickImg.alt;
    openPopup(popupImage);
}


//сохраняем данные из формы popup
function editProfile (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupEdit);
}

//функция вставки карточки
function createCard(dataCard, templateCardSelector, openPopupImage) {
    //const articleImg = getCard(name, path);
    const card = new Card(dataCard, templateCardSelector, openPopupImage);
    const cardElement = card.getCard();
    return cardElement;
    
}

function addCard (dataAddCard, templateCardSelector) {
    const cardElement = createCard(dataAddCard, templateCardSelector, openPopupImage);
    elementsPart.prepend(cardElement);
}

const popupWithImage = new PopupWithImage('.popup_image');


//создание экземпляра класса section
const userCardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, templateCardSelector, 
            openPopup = (evt) => {
                popupWithImage.open(evt);
            });
        const cardElement = card.getCard();
        userCardList.addItem(cardElement);
        }
    },
    containerCardSelector
    )

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementEdit.addEventListener('submit', editProfile); //обработчик на кнопке "Сохранить"
formElementAdd.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const dataAddCard = Array.from({
        name : nameCardInput.value,
        link : linkCardInput.value,
    }) ;
    addCard(dataAddCard, templateCardSelector);

    evt.target.reset();
    closePopup(popupAdd);
}); //обработчик на кнопке Сохранить на форме добавления карточки

editButton.addEventListener('click', function() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openPopup(popupEdit);
}); //обработчик на кнопке Редаткировать

addButton.addEventListener('click', function() { 
    openPopup(popupAdd);
}) //обработчик на кнопке Добавить

// closeButtons.forEach((button) => {
//     const popup = button.closest('.popup');
//     button.addEventListener('click', () => closePopup(popup));
// })

// const setCloseListeners = (popupName) => {
//     popupName.addEventListener('click', checkClickOnOverlay);
//     document.addEventListener('keydown', checkKeyOnOverlay);
// }

const removeCloseListeners = (popupName) => {
    popupName.removeEventListener('click', checkClickOnOverlay);
    document.removeEventListener('keydown', checkKeyOnOverlay);
}

const checkClickOnOverlay = (evt) => {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
}

const checkKeyOnOverlay = (evt) => {
    if (evt.key === 'Escape') {
        const popupName = evt.currentTarget.querySelector('.popup_opened');
        closePopup(popupName);
    }
}


//создаем предзагруженные карточки
//initialCards.forEach((item) => addCard(item, templateCardSelector, openPopupImage));
userCardList.rendererItems();

//--------------------------------------------------------------------------
//раздел проверки форм

//создаем экземпляр класса для каждой формы
const formEditValidator = new FormValidator(validArguments, formEdit);
const formAddValidator = new FormValidator(validArguments, formAdd);

//вызываем метод экземпляра класса
formEditValidator.enableValidation();
formAddValidator.enableValidation();
