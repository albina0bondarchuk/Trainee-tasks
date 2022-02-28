function nextTodoId(todos) {
    const maxID = todos.reduce((maxId, todo) => Math.max(maxId, todo.id), -1)
    return maxID + 1
}

export function reducer(state, action) {
    switch (action.type) {
        case 'VALIDATION':
            if (action.payload.name === 'Ivan' && action.payload.password === 'qwerty') {
                return state = Object.assign(state, {
                    autorisation : {
                        status: 'done'
                    }
                })
            } else return state

        case 'ADD_TODO':
            return {
                ...state,
                todos: [
                  ...state.todos,
                  {
                    id: nextTodoId(state.todos),
                    text: action.payload.text,
                    completed: false
                  }
                ]
              }
        
        case 'REMOVE_TODO':
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload.id)
            }

        case 'CHANGE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo => {
                if (todo.id !== action.payload.id) {
                    return todo
                }

                return {
                    ...todo,
                    text: action.payload.text
                }
            })
        }

        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo => {
                  if (todo.id !== action.payload.id) {
                    return todo
                  }
                  return {
                    ...todo,
                    completed: !todo.completed
                  }
                })
              }

        case 'FILTER_COMPLETED':
            return {
                ...state,
                filter: {
                    status: 'Completed'
                }
            }

        case 'FILTER_ACTIVE':
            return {
                ...state,
                filter: {
                    status: 'Active'
                }
            }

        case 'FILTER_ALL':
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