import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";


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

const editButton = document.querySelector('.profile__edit-button'); //получаем кнопку редактирования
const addButton = document.querySelector('.profile__add-button'); //получаем кнопку для добавления картинки

//селекторы
const containerCardSelector = '.elements';
const templateCardSelector = '#card';

//------------------------------------------------------------
//раздел карточек и попапов

//открыаем popup для просмотра картинки
function handleCardClick(clickImg){
    popupWithImage.open(clickImg);
}

//создание объекта экземпляра класса для данных профиля
const userInfo = new UserInfo({
    elementNameSelector: '.profile__name',
    elementJobSelector: '.profile__job'});

//создание popup для добавления картинки
const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();

//создание Popup для формы редактирования профиля
const popupWithFormEdit = new PopupWithForm('.popup_edit', (dataForm) => {
    userInfo.setUserInfo(dataForm);
});
popupWithFormEdit.setEventListeners();

//создание экземпляра класса section
const userCardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, templateCardSelector, handleCardClick);
        const cardElement = card.getCard();
        userCardList.addItem(cardElement);
        }
    },
    containerCardSelector)

//отрисовка предзагруженных карточек из переменной initialCards
userCardList.rendererItems();

//создание экземпляра PopupWithForm для редактирования профиля
const popupWithFormAdd = new PopupWithForm('.popup_add', (dataForm) => {
    const addCard = new Card(dataForm, templateCardSelector, handleCardClick);
    const addCardElement = addCard.getCard();
    userCardList.addItem(addCardElement);
});
popupWithFormAdd.setEventListeners();

//установка слушателя на кнопку открытия попапа редактирования профиля
editButton.addEventListener('click', function() {
    popupWithFormEdit.setInputValues(userInfo.getUserInfo());
    popupWithFormEdit.open();
    
});

//установка слушателя на кнопку открытия попапа добавления картинки
addButton.addEventListener('click', (evt) => {
    popupWithFormAdd.open();
}) //обработчик на кнопке Добавить



//--------------------------------------------------------------------------
//раздел проверки форм

//создаем экземпляр класса для каждой формы
const formEditValidator = new FormValidator(validArguments, formEdit);
const formAddValidator = new FormValidator(validArguments, formAdd);

//вызываем метод экземпляра класса
formEditValidator.enableValidation();
formAddValidator.enableValidation();
