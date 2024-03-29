import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "./index.css";

import {url, headers, cohortId, validArguments, formEdit, formAdd, formAvatar, initialCards, editButton, addButton, avatarElement, containerCardSelector, templateCardSelector, handleSubmit} from "../utils/constants.js";

let userId = null;


//------------------------------------------------------------
//раздел карточек и попапов

//открыаем popup для просмотра картинки
function handleCardClick(clickImg){
    popupWithImage.open(clickImg);
}

function openPopupDelete() {
    popupWithConfirmDelete.open()
}

//функция создания карточки с картинкой
const createCard = (dataCard) => {
  const card = new Card(dataCard, userId, templateCardSelector, handleCardClick, 
    () => {
    popupWithConfirmDelete.open();
    popupWithConfirmDelete.setSubmitAction(() => {
        function makeRequest() {
            return api.deleteCard(dataCard._id)
                .then(() => {
                    card.onDelete();
                })
        }
        handleSubmit(makeRequest, popupWithConfirmDelete, 'Удаление...')
    })
    }, 
    (cardId) => { 
        api.setLikeCard(cardId)
            .then((res) => {
                card.updateLike(res.likes)})
            .catch((err) => console.log('Ошибка добавления лайка ' + err))
    },
    (cardId) => {
        api.deleteLikeCard(cardId)
            .then((res) => card.updateLike(res.likes))
            .catch((err) => console.log('Ошибка удаления лайка ' + err))
    });
  const cardElement = card.getCard();
  return cardElement;
}

//создание объекта экземпляра класса для данных профиля
const userInfo = new UserInfo({
    elementNameSelector: '.profile__name',
    elementJobSelector: '.profile__job',
    elementAvatarSelector: '.profile__avatar'});

//создание popup для добавления картинки
const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();



//создание Popup для формы редактирования профиля
const popupWithFormEdit = new PopupWithForm('.popup_edit', (dataForm) => {
    function makeRequest() {
        return api.loadUserInfo(dataForm).then(res => {
                userInfo.setUserInfo(res);
            });
    }
    handleSubmit(makeRequest, popupWithFormEdit);
});
popupWithFormEdit.setEventListeners();

//создание Popup для формы загрузки аватара
const popupWithFormAvatar = new PopupWithForm('.popup_avatar-edit', (linkAvatar) => {
    function makeRequest() {
        return api.setAvatar(linkAvatar.link).then(res => {
                userInfo.setUserAvatar(res);
            })
    }
    handleSubmit(makeRequest, popupWithFormAvatar);
})
popupWithFormAvatar.setEventListeners();

//создание Popup для подтверждения удаления
const popupWithConfirmDelete = new PopupWithConfirm('.popup_delete-image-confirm');
popupWithConfirmDelete.setEventListeners();

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
//userCardList.rendererItems();

//создание экземпляра PopupWithForm для редактирования профиля
const popupWithFormAdd = new PopupWithForm('.popup_add', (dataForm) => {
    function makeRequest() {
        return api.loadAddCard(dataForm).then((res) => {
                const cardElement = createCard(res);
                userCardList.addItem(cardElement);
                })
    }
    handleSubmit(makeRequest, popupWithFormAdd);
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

avatarElement.addEventListener('click', (evt) => {
    popupWithFormAvatar.open();
})

//--------------------------------------------------------------------------
//раздел проверки форм

//создаем экземпляр класса для каждой формы
const formEditValidator = new FormValidator(validArguments, formEdit);
const formAddValidator = new FormValidator(validArguments, formAdd);
const formAvatarValidator = new FormValidator(validArguments, formAvatar);

//вызываем метод экземпляра класса
formEditValidator.enableValidation();
formAddValidator.enableValidation();
formAvatarValidator.enableValidation();

//создание экземпляра класса API
const api = new Api(url, headers, cohortId);

Promise.all([api.getUserInfo(),api.getCardList()])
    .then(([userDataRes, cardDataRes]) => {
        userId = userDataRes._id;
        userInfo.setUserInfo(userDataRes);
        userInfo.setUserAvatar(userDataRes);
        userCardList.rendererItems(cardDataRes)
    })
    .catch(err => console.log('Ошибка получения данных ' + err));


// api.loadAddCard()
//     .then(res => console.log(res))
//     .catch(err => console.log('Ошибка добавления карточки: ' + err));