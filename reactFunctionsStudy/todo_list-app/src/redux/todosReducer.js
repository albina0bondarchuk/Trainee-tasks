import { ADD_TODO, CHANGE_COMPLETE, CHANGE_TEXT, FILTER_TODO, GET_TODOS, REMOVE_TODO } from "./types";

const initialState = {
    todos: [],
    filter: 'all',
}

export const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return { 
                ...state, 
                todos: [...state.todos, {
                    _id: Date.now(),
                    text: action.payload.text,
                    completed: false
                }]
            }
        case CHANGE_COMPLETE:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if(todo._id === action.payload.id) {
                      todo.completed = todo.completed === 'true' ? 'false' : 'true'
                    }
                    return todo
                  })
            }
        case CHANGE_TEXT:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    if(todo._id === action.payload.id) {
                      todo.text = action.payload.text
                    }
                    return todo
                  })
            }
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== action.payload.id)
            }
        case FILTER_TODO:
            return {
                ...state,
                filter: action.payload.filter
            }
        case GET_TODOS:
            return {
                ...state,
                todos: action.payload.todos
            }
        default:
            return state;
    }
}