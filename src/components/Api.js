export default class Api {
    constructor(url, token, cohortId) {
        this._url = url;
        this._token = token;
        this._cohortId = cohortId;
    }

    //метод полчает информациб о пользователе с сервера
    getUserInfo () {
        return fetch(`${this._url}/${this._cohortId}/users/me`, {
            headers: {
                authorization: `${this._token}`
            }
        })
        .then(res => 
            res.ok ? res.json() : Promise.reject(err.status)
            )
    };

    //метод получает список карточек, загруженных пользователями, с сервера
    getCardList () {
        return fetch(`${this._url}/${this._cohortId}/cards`, {
            headers: {
                authorization: `${this._token}`
            }
        })
        .then(res => res.ok ? res.json() : Promise.reject(err.status))
    };

    //метод отправляет на сервер данные о пользователе
    loadUserInfo (userInfo) {
        this._nameUser = userInfo.name;
        this._aboutUser = userInfo.about;
        return fetch(`${this._url}/${this._cohortId}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `${this._token}`,
                'content-type': 'application/json'
            },
            body:  JSON.stringify({
                name: this._nameUser,
                about: this._aboutUser
            })
        })
        .then(res => res.ok ? res.json() : Promise.reject(err.status));
    };

    //метод загружает новую карточку, добавленную пользователем, на сервер
    loadAddCard (cardInfo) {
        this._name = cardInfo.name;
        this._link = cardInfo.link;
        return fetch(`${this._url}/${this._cohortId}/cards`, {
            method: 'POST',
            headers: {
                authorization: `${this._token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name: this._name,
                link: this._link
            })
        })
        .then(res => res.ok ? res.json() : Promise.reject(err.status));
    };

    //метод удаляет карточку с сервера
    deleteCard (cardId) {
        this._cardId = cardId;
        return fetch(`${this._url}/${this._cohortId}/cards/${this._cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: `${this._token}`
            }
        })
        .then(res => res.ok ? res.json() : Promise.reject(err.status));
    };

    //метод установки лайка
    setLikeCard (cardId) {
        this._cardId = cardId;
        return fetch(`${this._url}/${this._cohortId}/cards/${this._cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: `${this._token}`
            }
        })
        .then(res => res.ok ? res.json() : Promise.reject(err.status))
    }

    //метод удаления лайка
    deleteLikeCard (cardId) {
        this._cardId = cardId;
        return fetch(`${this._url}/${this._cohortId}/cards/${this._cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: `${this._token}`
            }
        })
        .then(res => res.ok ? res.json() : Promise.reject(err.status))
    };

    setAvatar (linkAvatar) {
        this._linkAvatar = linkAvatar;
        return fetch(`${this._url}/${this._cohortId}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `${this._token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                avatar: this._linkAvatar
            })
        })
        .then(res => res.ok ? res.json() : Promise.reject(err.status))
    }
}