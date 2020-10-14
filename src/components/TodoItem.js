import React from 'react';

const TodoItem = props => {
    return (
        <li class="list-group-item">{props.todo.name}</li>
    )
}

export default TodoItem;