const BASE_URL = "https://api.movies.diploma.nomoredomains.icu";

// const BASE_URL = "http://localhost:3500";

const checkIfResOk = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
} 

export const registration = ({ email, password, name }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'Application/JSON',
      'Content-Type' : 'Application/JSON'
    },
    body: JSON.stringify({
      'email': email,
      'password': password,
      'name': name,
    })
  })
  .then((res) => checkIfResOk(res));
}

export const authorize = ({email, password}) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'Application/JSON',
      'Content-Type' : 'Application/JSON'
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => checkIfResOk(res));
}

export const getToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'Application/JSON',
      'Content-Type' : 'Application/JSON',
      'Authorization': `Bearer ${token}`
    }
  })
  .then((res) => checkIfResOk(res));
}

export const getUserMovies = (token) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      Accept: 'Application/JSON',
      'Content-Type' : 'Application/JSON',
      'Authorization': `Bearer ${token}`
    }
  })
  .then((res) => checkIfResOk(res));
}

export const dislikeMovie = ({ token, id }) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      Accept: 'Application/JSON',
      'Content-Type' : 'Application/JSON',
      'Authorization': `Bearer ${token}`
    }
  })
  .then((res) => checkIfResOk(res));
}

export const likeMovie = ({ token, movie }) => {
  return fetch(`${BASE_URL}/movies/`, {
    method: 'POST',
    headers: {
      Accept: 'Application/JSON',
      'Content-Type' : 'Application/JSON',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailerLink: movie.trailerLink,
      thumbnail: movie.thumbnail,
      movieId: movie.movieId,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    })
  })
  .then((res) => checkIfResOk(res));
}

export const updateUser = ({ token, name, email }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      Accept: 'Application/JSON',
      'Content-Type' : 'Application/JSON',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: name,
      email: email,
    })
  })
  .then((res) => checkIfResOk(res));
}