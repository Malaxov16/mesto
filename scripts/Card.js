import { openPopupImage } from "./index.js";

//создать класс карточки с картинкой
export default class Card {
    constructor(dataCard, templateCardSelector) {
        this._name = dataCard.name;
        this._path = dataCard.link;
        this._templateCardSelector = templateCardSelector;
    }

    //создать пустую заготовку из шаблона для карточки
    _getTemplate() {
        this._articleImg = document
        .querySelector(this._templateCardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
        return this._articleImg;
    }
    
    //удалить карточку
    _onDelete = () => {
        this._cardImg.remove();
    }

    //изменить состояние кнопки "нравится"
    _onLike = () => {
        this._cardImg.querySelector('.element__like').classList.toggle('element__like_active');
    }

    //установить слушатели на кнопку удаления карточки, кнопку нравится и картинку
    _setEventListeners() {
        this._cardImg.querySelector('.element__like').addEventListener('click', this._onLike);
        this._cardImg.querySelector('.element__trash').addEventListener('click', this._onDelete);
        this._cardImg.querySelector('.element__image').addEventListener('click', (evt) => {openPopupImage(evt.target)});
    }

    //вернуть готовую карточку
    getCard() {
        this._cardImg = this._getTemplate();
        this._setEventListeners();
        //console.log(articleImg);
        const elementImg = this._cardImg.querySelector('.element__image');
        const elementTitle = this._cardImg.querySelector('.element__title');
        elementImg.src = this._path;
        elementImg.alt = this._name;
        elementTitle.textContent = this._name;
        
        return this._cardImg;
    }
}

