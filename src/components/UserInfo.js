export default class UserInfo {
    constructor({elementNameSelector, elementJobSelector, elementAvatarSelector}) {
        this._elementNameSelector = elementNameSelector;
        this._elementJobSelector = elementJobSelector;
        this._elementAvatarSelector = elementAvatarSelector;
        this._nameElement = document.querySelector(this._elementNameSelector);
        this._jobElement = document.querySelector(this._elementJobSelector);
        this._avatarElement = document.querySelector(this._elementAvatarSelector);
    }

    getUserInfo() {
        this._userInfo = {
            name: this._nameElement.textContent,
            about: this._jobElement.textContent
        }
        return this._userInfo
    }

    setUserInfo(userInfo) {
        this._nameElement.textContent = userInfo.name;  //ранее .nameUser
        this._jobElement.textContent = userInfo.about;    //ранее .job
    }

    // loadUserInfo(userInfo) {
    //     this._nameElement.textContent = userInfo.name;
    //     this._jobElement.textContent = userInfo.about;

    // }

    setUserAvatar(userInfo) {
        this._avatarElement.style.backgroundImage = `url(${userInfo.avatar})`;
    }

}