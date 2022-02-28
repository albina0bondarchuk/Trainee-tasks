import {LogIn} from './loginClass.js'
import { TodoList } from './todoClass.js'
import {CreateStore} from './createStore.js'
import {reducer} from './todoReducer.js'

let initialState = {
    autorisation : {
        status: 'in progress'
    },
    todos: [...JSON.parse(localStorage.getItem('1'))||''],
    filter: {
        status: 'All'
    }
}

let todoStore = new CreateStore(reducer, initialState)

todoStore.subscribe(() => {
    document.body.innerHTML = '';
    if (todoStore.getState().autorisation.status === 'in progress') {
        let logIn = new LogIn('Ivan', 'qwerty')
        logIn.render(todoStore)
    } else {
        localStorage.clear();
        localStorage.setItem('1', JSON.stringify(todoStore.getState().todos))
        let todoList = new TodoList()
        todoList.render(todoStore)
    }
})

todoStore.dispatch('_INIT_')