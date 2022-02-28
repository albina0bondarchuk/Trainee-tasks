import {ADD_TODO, REMOVE_TODO, CHANGE_TODO, TOGGLE_TODO, SUCCESS_AUTORIZATION, SET_TODOS, FAILED_AUTHORIZATION, FILTER_COMPLETED, FILTER_ACTIVE, FILTER_ALL} from './types.js'


function nextTodoId(todos) {
    const maxID = todos.reduce((maxId, todo) => Math.max(maxId, todo.id), -1)
    return maxID + 1
}

export function reducer(state, action) {
    switch (action.type) {
        case SUCCESS_AUTORIZATION:
            return {
                ...state,
                autorisation : {
                    status: 'done'
                }
            }

        case SET_TODOS:
            return {
                ...state,
                todos: [...action.payload.todos]
            }

        case FAILED_AUTHORIZATION:
            return state

        case ADD_TODO:
            return {
                ...state,
                todos: [
                  ...state.todos,
                  {
                    _id: action.payload.id,
                    text: action.payload.text,
                    completed: false
                  }
                ]
              }
        
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo._id !== action.payload.id)
            }

        case CHANGE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => {
                if (todo._id !== action.payload.id) {
                    return todo
                }

                return {
                    ...todo,
                    text: action.payload.text
                }
            })
        }

        case TOGGLE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo => {
                  if (todo._id !== action.payload.id) {
                    return todo
                  }
                  return {
                    ...todo,
                    completed: todo.completed === 'false' ? todo.completed = 'true':todo.completed = 'false'
                  }
                })
              }

        case FILTER_COMPLETED:
            return {
                ...state,
                filter: {
                    status: 'Completed'
                }
            }

        case FILTER_ACTIVE:
            return {
                ...state,
                filter: {
                    status: 'Active'
                }
            }

        case FILTER_ALL:
            return {
                ...state,
                filter: {
                    status: 'All'
                }
            }
        
        default:
            return state
    }  
}