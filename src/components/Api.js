export default class Api {
    constructor(url, headers, cohortId) {
        this._url = url;
        this._headers = headers;
        this._cohortId = cohortId;
    }

    //метод проверки ответа от сервера
    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(err.status)
    }

    //метод вызывает fetch с параметрами
    _request(urlBase, options) {
        return fetch(`${this._url}/${this._cohortId}${urlBase}`, options).then(this._checkResponse)
    }

    //метод получает информацию о пользователе с сервера
    getUserInfo () {
        return this._request('/users/me', {headers: this._headers})
    };

    //метод получает список карточек, загруженных пользователями, с сервера
    getCardList () {
        return this._request('/cards', {headers: this._headers})
    };

    //метод отправляет на сервер данные о пользователе
    loadUserInfo (userInfo) {
        this._nameUser = userInfo.name;
        this._aboutUser = userInfo.about;
        return this._request('/users/me',
            {
                method: 'PATCH',
                headers: this._headers,
                body:  JSON.stringify({
                    name: this._nameUser,
                    about: this._aboutUser
                })
            })
    };

    //метод загружает новую карточку, добавленную пользователем, на сервер
    loadAddCard (cardInfo) {
        this._name = cardInfo.name;
        this._link = cardInfo.link;
        return this._request('/cards',
            {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: this._name,
                    link: this._link
                })
            }
        )
    };

    //метод удаляет карточку с сервера
    deleteCard (cardId) {
        this._cardId = cardId;
        return this._request(`/cards/${this._cardId}`, 
            {
                method: 'DELETE',
                headers: this._headers
            }
        )
    };

    //метод установки лайка
    setLikeCard (cardId) {
        this._cardId = cardId;
        return this._request(`/cards/${this._cardId}/likes`, 
            {
                method: 'PUT',
                headers: this._headers
            }
        )
    }

    //метод удаления лайка
    deleteLikeCard (cardId) {
        this._cardId = cardId;
        return this._request(`/cards/${this._cardId}/likes`, 
            {
                method: 'DELETE',
                headers: this._headers
            }
        )
    };

    //метод загружает на сервер автар
    setAvatar (linkAvatar) {
        this._linkAvatar = linkAvatar;
        return this._request(`/users/me/avatar`,
            {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: this._linkAvatar
                })
            }
        )
    }
}