export default class UserInfo {
    constructor({elementNameSelector, elementJobSelector}) {
        this._elementNameSelector = elementNameSelector;
        this._elementJobSelector = elementJobSelector;
        this._nameElement = document.querySelector(this._elementNameSelector);
        this._jobElement = document.querySelector(this._elementJobSelector)
    }

    getUserInfo() {
        this._userInfo = {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent
        }
        return this._userInfo
    }

    setUserInfo(userInfo) {
        this._nameElement.textContent = userInfo.name;
        this._jobElement.textContent = userInfo.job;
    }
}