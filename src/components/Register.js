import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../actions/AuthActions'
import Message from './Message'

const Register = (props) => {
    const [user, setUser] = useState({
        username: "",
        password: "",
        role: "admin"
    })
    const [message, setMessage] = useState(null)
    let timerID = useRef(null)

    useEffect(() => {
        return () => {
            clearTimeout(timerID)
        }
    }, [])
    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const resetFrom = () => {
        setUser({ username: '', password: "", role: "" })
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.register(user)
            .then(data => {
                console.log(data)
                const { message } = data;
                setMessage(message);
                resetFrom()
                if (!message.msgError) {
                    timerID = setTimeout(() => {
                        props.history.push('/login');;
                    }, 2)
                }
            })
    }
    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <h3 className="text-center">Sign Up Here</h3>
                <label htmlFor="usernameinput">User Name</label>
                <input type="text"
                    name="username"
                    value={user.username}
                    className="form-control"
                    id="userNameInput"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    placeholder="Enter User Name" />
                <label htmlFor="password">Password</label>
                <input type="password"
                    name='password'
                    value={user.password}
                    className="form-control"
                    id="passwordInput"
                    onChange={onChange}
                    placeholder="Enter Password" />
                <button
                    type="submit"
                    className="btn mt-2 btn-primary btn-block">Sign Up</button>
            </form>
            { message ? <Message message={message} /> : null}
        </div>
    )
}

export default Register