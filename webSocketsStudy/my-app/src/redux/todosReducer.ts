import { Filters, TodoAction, TodoState, TodoTypes } from "../types/todos"

const initialState: TodoState = {
    todos: [],
    filter: Filters.all,
}

export const todosReducer = (state = initialState, action: TodoAction) :TodoState => {
    switch (action.type) {
        case TodoTypes.ADD_TODO:
            return { 
                ...state, 
                todos: [...state.todos, {
                    _id: action.payload.id,
                    text: action.payload.text,
                    completed: false
                }]
            }
        case TodoTypes.CHANGE_COMPLETE:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    return todo._id === action.payload.id ? {
                        ...todo, completed: todo.completed === 'true' ? 'false' : 'true'
                    } : todo
                  })
            }
        case TodoTypes.CHANGE_TEXT:
            return {
                ...state,
                todos: state.todos.map(todo => {
                    return todo._id === action.payload.id ? {
                      ...todo, text: action.payload.text
                    } : todo
                  })
            }
        case TodoTypes.REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== action.payload.id)
            }
        case TodoTypes.FILTER_TODO:
            return {
                ...state,
                filter: action.payload.filter
            }
        case TodoTypes.GET_TODOS:
            return {
                ...state,
                todos: action.payload.todos
            }
        default:
            return state;
    }
}