
import {LogIn} from './loginClass.js'
import { TodoList } from './todoClass.js'
import {CreateStore} from './createStore.js'
import {reducer} from './todoReducer.js'

localStorage.clear()
let initialState = {
    autorisation : {
        status: 'in progress'
    },
    todos: [],
    filter: {
        status: 'All'
    },
}

let todoStore = new CreateStore(reducer, initialState)

todoStore.subscribe(() => {
    document.body.innerHTML = '';
    if (todoStore.getState().autorisation.status === 'in progress') {
        let logIn = new LogIn()
        logIn.render(todoStore)
    } else {
        let todoList = new TodoList()
        todoList.render(todoStore)
    }
})

todoStore.dispatch('_INIT_')

