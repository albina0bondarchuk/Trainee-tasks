import { ADD_TODO, AUTHORIZATION, CHANGE_COMPLETE, CHANGE_TEXT, EMPTY_INPUT, FAILED_AUTHORIZATION, FILTER_TODO, GET_TODOS, REMOVE_TODO, SAVE_INPUT, SUCCESS_AUTHORIZATION } from "./types";

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

function changeComplete(id) {
    return {
        type: CHANGE_COMPLETE,
        payload: {
            id
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

function removeTodo(id) {
    return {
        type: REMOVE_TODO,
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


export {saveInput, emptyInput, authorization, successAuthorization, failedAuthorization, addTodo, changeComplete, changeText, removeTodo, filterTodos, getTodos}