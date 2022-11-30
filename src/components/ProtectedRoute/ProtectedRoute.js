import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, ...routeProps }) => {
    return isLoggedIn ? <Route {...routeProps} /> : <Redirect to="/" />;
};

export default ProtectedRoute;
