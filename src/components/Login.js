import React, { useState, useContext } from 'react';
import AuthService from '../actions/AuthActions'
import Message from './Message'
import { AuthContext } from '../Context/AuthContext'


const Login = (props) => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const [message, setMessage] = useState(null)
    const authContext = useContext(AuthContext)

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }


    const onSubmit = e => {
        e.preventDefault();
        AuthService.login(user)
            .then(data => {
                const { isAuthenticated, user, message } = data;
                if (isAuthenticated) {
                    console.log(authContext.user)
                    authContext.setUser(user)
                    authContext.setIsAuthenticated(isAuthenticated)
                    props.history.push('/todos')
                }
                else
                    setMessage(message)
            })
    }
    return (
        <div className="container">
            <h2 className="text-center">Please Login</h2>
            <form onSubmit={onSubmit}>
                <label htmlfor="usernameinput" className="sr-only">User Name</label>
                <input type="text"
                    name="username"
                    className="form-control"
                    id="userNameInput"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    placeholder="Enter User Name" />
                <label htmlfor="password">Password</label>
                <input type="password"
                    name='password'
                    className="form-control"
                    id="passwordInput"
                    onChange={onChange}
                    placeholder="Enter Password" />
                <button
                    type="submit"
                    className="btn btn-primary mt-2 btn-block">Login</button>
            </form>
            { message ? <Message message={message} /> : null}
        </div>
    )
}

export default Login