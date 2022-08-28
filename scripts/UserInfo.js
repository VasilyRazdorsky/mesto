export default class UserInfo {
    constructor({ profileName, profileMoreInfo }){
        this._profileName = document.querySelector(profileName);
        this._profileMoreInfo = document.querySelector(profileMoreInfo);
    }

    getUserInfo(){
        return {
            profileName: this._profileName.textContent,
            profileMoreInfo: this._profileMoreInfo.textContent
        };
    }

    setUserInfo(dataArray){
        this._profileName.textContent = dataArray[0];
        this._profileMoreInfo.textContent = dataArray[1];
    }
}

