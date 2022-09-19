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
      profileId: this._profileId,
    };
  }

  getUserName() {
    return this._profileName.textContent;
  }

  getUserMoreInfo() {
    return this._profileMoreInfo.textContent;
  }

  setUserId(id) {
    this.profileId = id;
  }

  getUserId() {
    return this.profileId;
  }

  setUserAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileMoreInfo.textContent = data.moreInfo;
    this.profileId = data.userId;
    if (data.avatarUrl) {
      this._profileAvatar.src = data.avatarUrl;
    }
  }
}
