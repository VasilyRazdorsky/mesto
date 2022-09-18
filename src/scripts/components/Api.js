export default class Api {
  constructor({ baseUrl, headers }) {
    this._adress = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  } 

  getUserInfo() {
    return fetch(`${this._adress}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((data) => {
        return data;
      });
  }

  getCardsInfo() {
    return fetch(`${this._adress}/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((data) => {
        return data;
      });
  }

  changeUserInfo(inputValues) {
    return fetch(`${this._adress}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.moreInfo,
      }),
    })
    .then((res) => {
      return this._getResponseData(res);
    });
  }

  addNewCard(cardInfo) {
    return fetch(`${this._adress}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardInfo.postName,
        link: cardInfo.link,
      }),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((data) => {
        return data;
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._adress}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then((res) => {
      return this._getResponseData(res);
    });
  }

  addLikeOnPost(cardId) {
    return fetch(`${this._adress}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((data) => {
        return data;
      });
  }

  deleteLikeFromPost(cardId) {
    return fetch(`${this._adress}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((data) => {
        return data;
      });
  }

  changeAvatar(inputValues) {
    return fetch(`${this._adress}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: inputValues.avatarLink,
      }),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
      .then((data) => {
        return data;
      });
  }
}
