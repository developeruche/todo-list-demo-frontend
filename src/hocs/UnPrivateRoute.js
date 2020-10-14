import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

const UnPrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useContext(AuthContext)
    return (
        <Route {...rest} render={props => {
            if (isAuthenticated) {
                return <Redirect to="/" />
            }
            return <Component {...props} />

        }} />
    )

}

export default UnPrivateRoute