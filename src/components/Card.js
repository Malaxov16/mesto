
//создать класс карточки с картинкой
export default class Card {
    constructor({_id, name, link, owner, likes}, userId, templateCardSelector, openPopupImage, openPopupDelete, setLike, deleteLike) {
        this._id = _id;
        this._name = name;
        this._link = link;
        this._ownerId = owner._id;
        this._likes = likes;
        this._userId = userId;
        this._templateCardSelector = templateCardSelector;
        this._openPopupImage = openPopupImage;
        this._openPopupDelete = openPopupDelete;
        this._setLike = setLike;
        this._deleteLike = deleteLike;
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
        if (this._ownerId != this._userId) {
            this._trashButtonElement.classList.add('element__trash_hidden')
        };
        this._likeCounter = this._cardImg.querySelector('.element__like-counter');
        this._changeLikeCounter();
        this._imageElement.src = this._link;
        this._imageElement.alt = this._name;
        this._elementTitle.textContent = this._name;
        return this._cardImg;
    }

    _changeLikeCounter() {
        this._likeCounter.textContent = this._likes.length;
        if (this._likes.some((item) => {return item._id === this._userId})) {
            this._likeButtonElement.classList.add('element__like_active');
        } else {
            this._likeButtonElement.classList.remove('element__like_active');
        }
    }

    //установить слушатели на кнопку удаления карточки, кнопку нравится и картинку
    _setEventListeners() {
        this._likeButtonElement.addEventListener('click', this._onLike);
        this._trashButtonElement.addEventListener('click', this._openPopupDelete);
        this._imageElement.addEventListener('click', () => this._openPopupImage(this._cardImg.querySelector('.element__image')));
    }

    //удалить карточку
    onDelete = () => {
        this._cardImg.remove();
    }

    //изменить состояние кнопки "нравится"
    _onLike = () => {
        if (!this._likes.some((item) => {return item._id == this._userId})){
            this._setLike(this._id);
        } else {
            this._deleteLike(this._id);
        }
        
    }

    updateLike = (likesList) => {
        this._likes = likesList;
        this._changeLikeCounter();
    }
}

