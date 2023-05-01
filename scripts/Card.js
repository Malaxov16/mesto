
//создать класс карточки с картинкой
export default class Card {
    constructor(dataCard, templateCardSelector, openPopupImage) {
        this._name = dataCard.name;
        this._path = dataCard.link;
        this._templateCardSelector = templateCardSelector;
        this._openPopupImage = openPopupImage;
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
    
    //вернуть готовую карточку
    getCard() {
        this._cardImg = this._getTemplate();
        this._likeButtonElement = this._cardImg.querySelector('.element__like');    
        this._trashButtonElement = this._cardImg.querySelector('.element__trash');
        this._imageElement = this._cardImg.querySelector('.element__image');
        this._setEventListeners();
        this._elementTitle = this._cardImg.querySelector('.element__title');
        this._imageElement.src = this._path;
        this._imageElement.alt = this._name;
        this._elementTitle.textContent = this._name;
        return this._cardImg;
    }

    //установить слушатели на кнопку удаления карточки, кнопку нравится и картинку
    _setEventListeners() {
        this._likeButtonElement.addEventListener('click', this._onLike);
        this._trashButtonElement.addEventListener('click', this._onDelete);
        this._imageElement.addEventListener('click', () => this._openPopupImage(this._cardImg.querySelector('.element__image')));
    }

    //удалить карточку
    _onDelete = () => {
        this._cardImg.remove();
    }

    //изменить состояние кнопки "нравится"
    _onLike = () => {
        this._likeButtonElement.classList.toggle('element__like_active');
    }
}

