import React, { useState, useContext, useEffect } from 'react';
import TodoItem from './TodoItem'
import TodoActions from '../actions/TodosActions'
import { AuthContext } from '../Context/AuthContext';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Message from "./Message"
import "./todos.css"


const Todos = props => {
    const [todo, setTodo] = useState({ name: "" })
    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState(null)
    const authContext = useContext(AuthContext)
    const [sDisable, setSDisable] = useState(true)

    useEffect(() => {
        TodoActions.getTodos().then(data => {
            setTodos(data.todos)
        })
    }, [])

    const delFirst = () => {
        TodoActions.delFirstTodo().then(data => {
            const { message } = data
            setMessage(message)
        })
        TodoActions.getTodos().then(data => {
            setTodos(data.todos)
        })
    }
    const delLast = () => {
        TodoActions.delLastTodo().then(data => {

            const { message } = data
            setMessage(message)
        })
        TodoActions.getTodos().then(data => {
            setTodos(data.todos)
        })
    }

    const onChange = e => {
        setTodo({ name: e.target.value })
        funcDisable(e.target.value)
    }
    const resetForm = () => {
        setTodo({ name: "" })
    }

    const onSubmit = e => {
        e.preventDefault();
        TodoActions.postTodo(todo).then(data => {

            const { message } = data

            if (!message.msgError) {
                TodoActions.getTodos().then(getData => {
                    setTodos(getData.todos)
                    setMessage(message);

                })
            } else if (message.msgBody === "UnAuthorized") {
                authContext.setUser({ username: "", role: "" })
                authContext.setIsAuthenticated(false)
            } else {
                setMessage(message)
            }
        })
        resetForm();
    }
    const funcDisable = (x) => {
        if (x !== "")
            setSDisable(false)
        else
            setSDisable(true)
    }


    return (
        <div className="container mt-2">
            <ul className="list-group container todo-list">
                {
                    todos.map(todo => {
                        return <TodoItem key={todo._id} todo={todo} />
                    })
                }
            </ul>

            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={onSubmit}>
                            <div className="modal-body">
                                <input type="text"
                                    name="todo"
                                    value={todo.name}
                                    onChange={onChange}
                                    className='form-control'
                                    placeholder="Enter Todo Here">
                                </input>

                            </div>
                            <div className="modal-footer">
                                <button type="submit" disabled={sDisable} className="btn btn-primary">Save Todo</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {message ? <Message message={message} /> : null}

            <div className="container-fluid control-btn">
                <IconButton className="del-btn" onClick={delFirst}>
                    <DeleteIcon /> First Todo
                </IconButton>
                <IconButton className="plus-btn">
                    <AddCircleIcon className="" data-toggle="modal" data-target="#exampleModal" />
                </IconButton>
                <IconButton className="del-btn" onClick={delLast}>
                    <DeleteIcon /> Last Todo
                </IconButton>
            </div>
        </div>
    )

}

export default Todos