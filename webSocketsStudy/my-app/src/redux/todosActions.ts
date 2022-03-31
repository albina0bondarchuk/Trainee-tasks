import { ITodo, TodoTypes } from "../types/todos";


function addTodo(text: string, id: string) {
    return {
        type: TodoTypes.ADD_TODO,
        payload: {
            text,
            id
        }
    }
}

function asyncAddTodo(text: string) {
    return {
        type: TodoTypes.ASYNC_ADD_TODO,
        payload: {
            text
        }
    }
}

function changeComplete(id: string) {
    return {
        type: TodoTypes.CHANGE_COMPLETE,
        payload: {
            id
        }
    }
}

function asyncChangeComplete(id: string, text: string, completed: boolean | string) {
    return {
        type: TodoTypes.ASYNC_CHANGE_COMPLETE,
        payload: {
            id,
            text,
            completed
        }
    }
}

function changeText(id: string, text: string) {
    return {
        type: TodoTypes.CHANGE_TEXT,
        payload: {
            id,
            text
        }
    }
}

function asyncChangeText(id: string, text: string, completed: boolean | string) {
    return {
        type: TodoTypes.ASYNC_CHANGE_TEXT,
        payload: {
            id,
            text,
            completed
        }
    }
}

function removeTodo(id: string) {
    return {
        type: TodoTypes.REMOVE_TODO,
        payload: {
            id
        }
    }
}

function asyncDeleteTodo(id: string) {
    return {
        type: TodoTypes.ASYNC_DELETE_TODO,
        payload: {
            id
        }
    }
}

function filterTodos(filter: string) {
    return {
        type: TodoTypes.FILTER_TODO,
        payload: {
            filter
        }
    }
}

function getTodos(todos: ITodo[]) {
    return {
        type: TodoTypes.GET_TODOS,
        payload: {
            todos
        } 
    }
}


export {addTodo, asyncAddTodo, changeComplete, asyncChangeComplete, changeText, asyncChangeText, removeTodo, asyncDeleteTodo, filterTodos, getTodos}