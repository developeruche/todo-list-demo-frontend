export default {
    getTodos: () => {
        return fetch('/user/todos')
            .then(response => {
                if (response.status != 401) {
                    return response.json().then(data => data)
                } else
                    return { message: { msgBody: "Unauthorized" }, msgError: true }
            })
    },
    postTodo: todo => {
        return fetch('/user/todo', {
            method: "post",
            body: JSON.stringify(todo),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.status != 401) {
                return response.json().then(data => data)
            } else
                return { message: { msgBody: "Unauthorized" }, msgError: true }
        })
            .catch(
                (err) => {
                    console.log(err)
                }
            )
    },
    delFirstTodo: () => {
        return fetch('/user/deletefirsttodo', {
            method: "delete",
            headers: {
                'Content_Type': 'application/json'
            }
        }).then(response => {
            if (response.status !== 401) {
                return { message: { msgBody: "First Todo Deleted" }, msgError: true }
            } else
                return { message: { msgBody: "Unable to Delete First Todo" }, msgError: true }
        })
    },
    delLastTodo: () => {
        return fetch('/user/deletelasttodo', {
            method: "delete",
            headers: {
                'Content_Type': 'application/json'
            }
        }).then(response => {
            if (response.status !== 401) {
                return { message: { msgBody: "Last Todo Deleted" }, msgError: true }
            } else
                return { message: { msgBody: "Unable to Delete First Todo" }, msgError: true }
        })
    }

}
