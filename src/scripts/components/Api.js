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
}
