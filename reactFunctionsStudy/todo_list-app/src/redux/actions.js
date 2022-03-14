import { ADD_TODO, ASYNC_ADD_TODO, ASYNC_CHANGE_COMPLETE, ASYNC_CHANGE_TEXT, ASYNC_DELETE_TODO, AUTHORIZATION, CHANGE_COMPLETE, CHANGE_TEXT, EMPTY_INPUT, FAILED_AUTHORIZATION, FILTER_TODO, GET_TODOS, REMOVE_TODO, SAVE_INPUT, SUCCESS_AUTHORIZATION } from "./action_types";

function saveInput(name, value) {
    return {
        type: SAVE_INPUT,
        payload: {
            name,
            value
        }
    }
}

function emptyInput() {
    return {
        type: EMPTY_INPUT
    }
}

function authorization(login, password) {
    return {
        type: AUTHORIZATION,
        payload: {
            login,
            password
        }
    }
}

function successAuthorization() {
    return{
        type: SUCCESS_AUTHORIZATION
    }
}

function failedAuthorization() {
    return {
        type: FAILED_AUTHORIZATION
    }
}

function addTodo(text) {
    return {
        type: ADD_TODO,
        payload: {
            text
        }
    }
}

function asyncAddTodo(text) {
    return {
        type: ASYNC_ADD_TODO,
        payload: {
            text
        }
    }
}

function changeComplete(id) {
    return {
        type: CHANGE_COMPLETE,
        payload: {
            id
        }
    }
}

function asyncChangeComplete(id, text, completed) {
    return {
        type: ASYNC_CHANGE_COMPLETE,
        payload: {
            id,
            text,
            completed
        }
    }
}

function changeText(id, text) {
    return {
        type: CHANGE_TEXT,
        payload: {
            id,
            text
        }
    }
}

function asyncChangeText(id, text, completed) {
    return {
        type: ASYNC_CHANGE_TEXT,
        payload: {
            id,
            text,
            completed
        }
    }
}

function removeTodo(id) {
    return {
        type: REMOVE_TODO,
        payload: {
            id
        }
    }
}

function asyncDeleteTodo(id) {
    return {
        type: ASYNC_DELETE_TODO,
        payload: {
            id
        }
    }
}

function filterTodos(filter) {
    return {
        type: FILTER_TODO,
        payload: {
            filter
        }
    }
}

function getTodos(todos) {
    return {
        type: GET_TODOS,
        payload: {
            todos
        } 
    }
}


export {saveInput, emptyInput, authorization, successAuthorization, failedAuthorization, addTodo, asyncAddTodo, changeComplete, asyncChangeComplete, changeText, asyncChangeText, removeTodo, asyncDeleteTodo, filterTodos, getTodos}