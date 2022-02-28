import {ADD_TODO, REMOVE_TODO, CHANGE_TODO, TOGGLE_TODO, SUCCESS_AUTORIZATION, SET_TODOS, FAILED_AUTHORIZATION, FILTER_COMPLETED, FILTER_ACTIVE, FILTER_ALL} from './types.js'


export function addTodo(text, id) {
    return {
        type: ADD_TODO,
        payload: {
            id: id,
            text: text
        }
    }
}

export function removeTodo(id) {
    return {
        type: REMOVE_TODO,
        payload: {
            id: id
        }
    }
}

export function changeTodo(id, text) {
    return {
        type: CHANGE_TODO,
        payload: {
            id: id,
            text: text
        }

    }
}

export function toggleTodo(id) {
    return {
        type: TOGGLE_TODO,
        payload: {
            id: id
        }
    }
}

export function succesAutorization() {
    return {
        type: SUCCESS_AUTORIZATION,
    }
}

export function setTodos(todos) {
    return {
        type: SET_TODOS,
        payload: {
            todos:todos
        }
    }
}

export function failedAutorization() {
    return {
        type: FAILED_AUTHORIZATION
    }
}

export function filterCompleted() {
    return {
        type: FILTER_COMPLETED
    }
}

export function filterActive() {
    return {
        type: FILTER_ACTIVE
    }
}

export function filterAll() {
    return {
        type: FILTER_ALL
    }
}

