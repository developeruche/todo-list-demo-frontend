import React, { createContext, useState, useEffect } from 'react';
import AuthAction from "../actions/AuthActions"
import Loading from "../Loading"

export const AuthContext = createContext();

export default ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        AuthAction.isAuthenticated().then(data => {
            setUser(data.user)
            setIsAuthenticated(data.isAuthenticated)
            setIsLoaded(true)
        })
    }, [])

    return (
        <div>
            {!isLoaded ? <Loading /> :
                <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
                    {children}
                </AuthContext.Provider>
            }
        </div>
    )

}