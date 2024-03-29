import React from "react";
import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as MoviesApi from "../../utils/MoviesApi";
import * as MainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { LoginEmailError, 
    LoginFieldsError, 
    ProfileError, 
    ProfileUpdateError, 
    ProfileUpdateSuccess, 
    RegistrationError, 
    RegistrationErrorFields, 
    SHORT_MOVIE_DURATION, 
    TryAgainError } from "../../utils/constants";

function App() {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);         
    const [currentUser, setCurrentUser] = React.useState({});

    const [token, setToken] = React.useState('');
    const [resultMovies, setResultMovies] = React.useState([]);
    const [savedMoviesList, setSavedMoviesList] = React.useState([]);
    const [searchText, setSearchText] = React.useState(""); 
    const [moviesList, setMoviesList] = React.useState([]);

    const [isLoading, setIsLoading] = React.useState(false);
    const [filter, setFilter] = React.useState();
    const [isReady, setIsReady] = React.useState(false);
   
    const [filterMoviesList, setFilterMoviesList] = React.useState([]);
    const [filterSavedMoviesList, setFilterSavedMoviesList] = React.useState([]);
    const [filterShortMoviesList, setFilterShortMoviesList] = React.useState([]);
    const [filterShortSavedMoviesList, setFilterShortSavedMoviesList] = React.useState([]);

    const [loginError, setLoginError] = React.useState('');
    const [registrationError, setRegistrationError] = React.useState('');
    const [foundError, setFoundError] = React.useState(false);
    const [serverError, setServerError] = React.useState(false);
    const [profileError, setProfileError] = React.useState('');
   
    const history = useHistory();
    const location = useLocation();

    function goBack() {
        history.goBack()
    }

    function checkToken() {
        const jwt = localStorage.getItem('jwt');
        const movies = localStorage.getItem('movies');
        const savedMovies = localStorage.getItem('saved');
        const searchedMovies = localStorage.getItem('resultMovies');
        const textValue = localStorage.getItem('resultSearchText');
        if (jwt) {
            setToken(jwt);
            if (movies) {
                const data = JSON.parse(movies);
                setMoviesList(data);
            } 
            if (savedMovies) {
                const dataSaved = JSON.parse(savedMovies);
                setSavedMoviesList(dataSaved);
                setFilterSavedMoviesList(dataSaved);
            } if (searchedMovies) {
                const searchedData = JSON.parse(searchedMovies);
                setResultMovies(searchedData);
            } if (textValue) {
                setSearchText(textValue);
            }
            MoviesApi.getToken(jwt)
                .then((user) => {
                    setCurrentUser(user);
                    setIsLoggedIn(true);
                    history.push(location.pathname);
                })
                .catch(() => {
                    setServerError(true);
                })
            }  else {
                localStorage.clear();
            }
    }


    React.useEffect(() => {
        checkToken();
        setIsReady(true)
    }, []);

    React.useEffect(() => {
        if (token) localStorage.setItem('jwt', token)
    }, [token]);

    React.useEffect(() => {
        if (isReady) localStorage.setItem('saved', JSON.stringify(savedMoviesList))
    }, [savedMoviesList]);

    React.useEffect(() => {
        if (isReady) localStorage.setItem('resultSearchText', searchText)
    }, [searchText]);

    React.useEffect(() => {
        if (isReady) localStorage.setItem('resultMovies', JSON.stringify(resultMovies))
    }, [resultMovies]);

    React.useEffect(() => {
        if (isReady) localStorage.setItem('movies', JSON.stringify(moviesList))
    }, [moviesList]);

    function onLogin({email, password}) {
        MoviesApi.authorize({email, password})
            .then((data) => {
                if (data.token) {
                    setToken(data.token);
                    localStorage.setItem('jwt', data.token);
                    setIsLoggedIn(true);
                    history.push('/movies');
                    MoviesApi.getUserMovies(data.token)
                        .then((movies) => {
                            setSavedMoviesList(movies);
                            setFilterSavedMoviesList(movies);
                            localStorage.setItem('saved', JSON.stringify(movies));
                        })
                        .catch((err) => console.log(`Ошибка ${err}`));
                        MoviesApi.getToken(data.token) 
                            .then((user) => {
                                setCurrentUser(user);
                            })
                            .catch((err) => {
                                setServerError(true);
                            })
                }
            })
            .catch((err) => {
                if (err === 400) {
                    return setLoginError(LoginFieldsError);
                } if (err === 401) {
                    return setLoginError(LoginEmailError);
                }
                setLoginError(TryAgainError);
            })
            if (isLoggedIn) {
                MoviesApi.getToken()
                    .then((user) => {
                        setCurrentUser(user)
                    })
                    .catch(() => setProfileError(ProfileError))
            }
    }

    function onRegistration({ email, password, name }) {
        MoviesApi.registration({ email, password, name })
            .then(() => {
                if ({ email, password }) {
                    onLogin({ email, password })
                }
                })
                .catch((err) => {
                    setRegistrationError(RegistrationError);
                    if (err === 400) {
                        return setRegistrationError(RegistrationErrorFields)
                    }
            })
    }
    
    function clearAllErrors() {
        setLoginError("");
        setRegistrationError("");
        setFoundError(false);
        setServerError(false);
        setProfileError("");
    }

    function onLogout() {
        localStorage.clear()
        setIsLoggedIn(false);
        setMoviesList([]);
        setSavedMoviesList([]);
        setFilterMoviesList([]);
        setFilterSavedMoviesList([]);
        setFilterShortMoviesList([]);
        setFilterShortSavedMoviesList([]);
        setResultMovies([]);
        setSearchText('');
        clearAllErrors();
        history.push('/');
    }

    function search(itemList, searchText) {
        let result = [];
        itemList.forEach((movie) => {
            if (movie.nameRU.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
                result.push(movie);
            }
        })
        return result;
    }

    function searchFilterTime(itemList) {
        let result = [];
        itemList.forEach((movie) => {
            if (movie.duration <= SHORT_MOVIE_DURATION) {
                result.push(movie);
            }
        })
        return result;
    }

    function searchMovies(searchText) {
        setSearchText(searchText)
        setServerError(false);
        setIsLoading(true);
        if (moviesList.length > 0) {
            const result = search(moviesList, searchText);
            if (result.length > 0) {
                setFoundError(false)
            } else {
                setFoundError(true);
            }
            setResultMovies(result);
            setFilterMoviesList(result);
        } else {
            MainApi.getInitialData()
                .then((res) => {
                    setMoviesList(res);
                    localStorage.setItem('resultMovies', JSON.stringify(res));
                    const result = search(res, searchText);
                    if (result.length > 0) {
                        setFoundError(false);
                    } else {
                        setFoundError(true);
                    }
                    setFilterMoviesList(result);
                    if (filter) {
                        const resultShortFilter = searchFilterTime(result);
                        if (resultShortFilter.lenght > 0) {
                            setFoundError(false);
                        } else {
                            setFoundError(true);
                        }
                        setResultMovies(resultShortFilter);
                    }
                })
                .catch(() => setServerError(true));
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 625)
    }

    function searchSavedMovies(searchText) {
        setServerError(false);
        if (savedMoviesList.length > 0) {
            setFilterSavedMoviesList(search(savedMoviesList, searchText))
        } else {
            MoviesApi.getUserMovies()
                .then((res) => {
                    setSavedMoviesList(res);
                    localStorage.setItem('saved', JSON.stringify(res));
                    setFilterSavedMoviesList(search(savedMoviesList, searchText));
                })
                .catch((err) => {setServerError(true)
                    console.log(err)
                }
                );
        }
    }

    React.useEffect(() => {
        setFoundError(false);
        if (filter) {
            if (location.pathname === '/movies') {
                if (moviesList.length > 0) {
                    const result = searchFilterTime(resultMovies);
                    if (result.length > 0) {
                        setFoundError(false);
                    } else {
                        setFoundError(true);
                    }
                    setFilterShortMoviesList(result);
                }
            }
            else if (location.pathname === '/saved-movies') {
                const result = searchFilterTime(filterSavedMoviesList);
                if (result.length > 0) {
                    setFoundError(false);
                } else {
                    setFoundError(true);
                }
                setFilterShortMoviesList(result);
            }
        }
    }, [filter]);

    function filterMoviesById(itemList, id) {
        return itemList.filter((item) => { return item._id !== id });
    }

    function deleteMovieFromSaved(id) {
        MoviesApi.dislikeMovie({ token, id })
            .then(() => {
                const res = filterMoviesById(savedMoviesList, id);
                setSavedMoviesList(res);
                localStorage.setItem('saved', JSON.stringify(res));
                setFilterSavedMoviesList(filterMoviesById(filterSavedMoviesList, id));
                setFilterShortSavedMoviesList(filterMoviesById(filterShortSavedMoviesList, id));
            })
            .catch(() => setServerError(true));
    }

    function saveMovie(movie) {
         MoviesApi.likeMovie({ token, movie })
            .then((res) => {
                const savedMovies = [...savedMoviesList, res];
                localStorage.setItem('saved', JSON.stringify(savedMovies));
                setSavedMoviesList(prev => [...prev, res]);
                if (filter) {
                    setFilterSavedMoviesList(prev => [...prev, res]);
                    setFilterShortSavedMoviesList(prev => [...prev, res]);
                } else {
                    setFilterSavedMoviesList(prev => [...prev, res]);
                }
            })
            .catch((err) => {
                setServerError(true);
                console.log(err)
            });
    }

    function editUser({ name, email }) {
        MoviesApi.updateUser({ token, name, email })
            .then((newUser) => {
                if (newUser._id) {
                    setCurrentUser(newUser);
                    setProfileError(ProfileUpdateSuccess);
                } else if (newUser.message) {
                    setProfileError(newUser.message);
                }
            })
            .catch(() => setProfileError(ProfileUpdateError))
    }

    React.useEffect(() => {
        clearAllErrors();
        if (location === '/saved-movies') {
            setFilterSavedMoviesList(savedMoviesList);
        }
    }, [location])

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Switch>
                <Route exact path="/" isLoggedIn={isLoggedIn}>
                    <Main isLoggedIn={isLoggedIn} />
                </Route>
                <ProtectedRoute exact path="/movies" isLoggedIn={isLoggedIn}>
                    <Movies
                        searchText={searchText}
                        isLoggedIn={isLoggedIn} 
                        filter={filter} 
                        setFilter={setFilter}
                        moviesList={filter ? filterShortMoviesList : resultMovies}
                        searchMovies={searchMovies}
                        searchSavedMovies={searchSavedMovies}
                        isLoading={isLoading}
                        savedMovies={savedMoviesList}
                        deleteMovieFromSaved={deleteMovieFromSaved}
                        saveMovie={saveMovie}
                        foundError={foundError}
                        serverError={serverError}
                        clearAllErrors={clearAllErrors}
                         />
                </ProtectedRoute>
                <ProtectedRoute exact path="/saved-movies" isLoggedIn={isLoggedIn}>
                    <SavedMovies 
                        isLoggedIn={isLoggedIn} 
                        filter={filter} 
                        setFilter={setFilter}
                        moviesList={filter ? filterShortSavedMoviesList : filterSavedMoviesList}
                        searchMovies={searchMovies}
                        searchSavedMovies={searchSavedMovies}
                        isLoading={isLoading}
                        savedMovies={savedMoviesList}
                        deleteMovieFromSaved={deleteMovieFromSaved}
                        saveMovie={saveMovie}
                        foundError={foundError}
                        serverError={serverError}
                        clearAllErrors={clearAllErrors}
                        />
                </ProtectedRoute>
                <ProtectedRoute exact path="/profile" isLoggedIn={isLoggedIn}>
                    <Profile 
                        isLoggedIn={isLoggedIn}
                        onLogout={onLogout}
                        editUser={editUser}
                        profileError={profileError}
                        setProfileError={setProfileError}
                    />
                </ProtectedRoute>
                <Route exact path="/signin">
                    {isLoggedIn ? 
                    <Redirect to='/' /> : 
                    <Login 
                        onLogin={onLogin}
                        clearErrors={clearAllErrors} 
                        loginError={loginError} 
                        setLoginError={setLoginError} 
                    />}
                </Route>
                <Route exact path="/signup">
                    {isLoggedIn ? 
                    <Redirect to='/' /> : 
                    <Register 
                        onRegistration={onRegistration} 
                        clearErrors={clearAllErrors} 
                        registrationError={registrationError} 
                        setRegistrationError={setRegistrationError} 
                    />}
                </Route>
                <Route path="*" >
                    <NotFound goBack={goBack}/>
                </Route>
            </Switch>
        </CurrentUserContext.Provider>
    )
};

export default App;
