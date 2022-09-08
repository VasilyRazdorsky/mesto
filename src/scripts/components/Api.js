export default class Api {
  constructor(baseUrl, headers) {
    this._adress = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._adress}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return {
          name: data.name,
          moreInfo: data.about,
          avatarUrl: data.avatar,
        };
      });
  }

  getCardsInfo() {
    return fetch(`${this._adress}/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        return Array.from(data);
      })
  }

  changeUserInfo(inputValues) {
    return fetch(`${this._adress}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.moreInfo,
      })
    })
  }

  addNewCard(cardInfo) {
    return fetch(`${this._adress}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardInfo.postName,
        link: cardInfo.link,  
      })
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      return {
        name: data.name,
        link: data.link,
      }
    })
  }
}
