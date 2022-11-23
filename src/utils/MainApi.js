const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";

export const getInitialData = () => {
  return fetch(`${BASE_URL}`, {
    headers: {
      'Content-Type': 'Application/JSON',
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
