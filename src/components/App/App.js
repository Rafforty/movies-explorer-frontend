import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";

function App() {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isFilterMovies, setIsFilterMovies] = React.useState(true);

    function changeFilter() {
        setIsFilterMovies(!isFilterMovies);
    }

    return (
        <>
            <Switch>
                <Route exact path="/" >
                    <Main isLoggedIn={isLoggedIn} />
                </Route>
                <Route exact path="/movies">
                    <Movies isLoggedIn={isLoggedIn} isFilterMovies={isFilterMovies} setFilter={changeFilter} />
                </Route>
                <Route exact path="/saved-movies">
                    <SavedMovies isLoggedIn={isLoggedIn} isFilterMovies={isFilterMovies} setFilter={changeFilter} />
                </Route>
                <Route exact path="/profile">
                    <Profile isLoggedIn={isLoggedIn} />
                </Route>
                <Route exact path="/signin">
                    <Login />
                </Route>
                <Route exact path="/signup">
                    <Register />
                </Route>
                <Route path="*" >
                    <NotFound />
                </Route>
            </Switch>
        </>
    )
};

export default App;
