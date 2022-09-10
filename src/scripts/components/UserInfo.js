export default class UserInfo {
  constructor({ profileName, profileMoreInfo, profileAvatar }) {
    this._profileName = document.querySelector(profileName);
    this._profileMoreInfo = document.querySelector(profileMoreInfo);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    return {
      profileName: this._profileName.textContent,
      profileMoreInfo: this._profileMoreInfo.textContent,
      profileId: this._userId,
    };
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileMoreInfo.textContent = data.moreInfo;
    this._userId = data.userId;
    if (data.avatarUrl) {
      this._profileAvatar.src = data.avatarUrl;
    }
  }
}
