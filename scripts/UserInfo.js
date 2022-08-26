class UserInfo {
    constructor({ profileName, profileMoreInfo }){
        this._profileName = document.querySelector(profileName);
        this._profileMoreInfo = document.querySelector(profileMoreInfo);
        console.log(this._profileName);
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

export { UserInfo };