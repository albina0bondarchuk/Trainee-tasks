export function addTodo(text) {
    return {
        type: 'ADD_TODO',
        payload: {
            text: text
        }
    }
}

export function removeTodo(id) {
    return {
        type: 'REMOVE_TODO',
        payload: {
            id: id
        }
    }
}

export function changeTodo(id, text) {
    return {
        type: 'CHANGE_TODO',
        payload: {
            id: id,
            text: text
        }

    }
}

export function toggleTodo(id) {
    return {
        type: 'TOGGLE_TODO',
        payload: {
            id: id
        }
    }
}

export function validation(name, password) {
    return {
        type: 'VALIDATION',
        payload: {
            name: name,
            password: password
        }
    }
}

export function filterCompleted() {
    return {
        type: 'FILTER_COMPLETED'
    }
}

export function filterActive() {
    return {
        type: 'FILTER_ACTIVE'
    }
}

export function filterAll() {
    return {
        type: 'FILTER_ALL'
    }
}

