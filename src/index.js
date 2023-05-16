import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";
import "./pages/index.css";

import {validArguments, formEdit, formAdd, initialCards, editButton, addButton, containerCardSelector, templateCardSelector} from "./utils/constants.js";

//------------------------------------------------------------
//раздел карточек и попапов

//открыаем popup для просмотра картинки
function handleCardClick(clickImg){
    popupWithImage.open(clickImg);
}

//функция создания карточки с картинкой
const createCard = (dataCard) => {
  const card = new Card(dataCard, templateCardSelector, handleCardClick);
  const cardElement = card.getCard();
  return cardElement;
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
        const cardElement = createCard(item);
        userCardList.addItem(cardElement);
        }
    },
    containerCardSelector)

//отрисовка предзагруженных карточек из переменной initialCards
userCardList.rendererItems();

//создание экземпляра PopupWithForm для редактирования профиля
const popupWithFormAdd = new PopupWithForm('.popup_add', (dataForm) => {
    const addCardElement = createCard(dataForm);
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
