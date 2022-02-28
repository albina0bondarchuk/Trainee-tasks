import {addTodo, removeTodo, changeTodo, toggleTodo, filterAll, filterActive, filterCompleted} from './actions.js'

async function updateTodos(id, text, completed) { 
    const res = await fetch('http://localhost:8000/todos', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            text: text,
            completed: completed
        })
    })
    const result = await res.text()

    return result
}

async function deleteTodos(id, text, completed) { 
    const res = await fetch('http://localhost:8000/todos', {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            id: id
        })
    })
    const result = await res.text()

    return result
}

async function addTodos(text) { 
    let token = localStorage.getItem('authorization')
    const res = await fetch('http://localhost:8000/todos', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify({
            text: text
        })
    })
    const result = await res.text()

    return result
}



class TodoItems {
    constructor(obj) {
        this.id = obj._id;
        this.text = obj.text;
        this.completed = obj.completed;
    }

    render(store) {
        let todoItem = document.createElement('li');
        todoItem.classList.add('todo_item');
            
        let itemState = document.createElement('div');
        itemState.classList.add('state');
            
        let deleteBut = document.createElement('div');
        deleteBut.classList.add('delete');
        deleteBut.innerHTML = `&#215;`;

        let todoText = document.createElement('input')
        todoText.readOnly = 'true';
        todoText.placeholder = this.text;

        todoItem.appendChild(itemState);
        todoItem.appendChild(todoText);
        todoItem.appendChild(deleteBut);

        if (this.completed === 'true') {
            itemState.classList.add('done');
            todoItem.classList.add('done')
        }

        itemState.addEventListener('click', (e) => {
            store.dispatch(toggleTodo(this.id))
            const completed = this.completed === 'false' ? 'true' : false;
            updateTodos(this.id, this.text, completed)
        })

        deleteBut.addEventListener('click', (e) => {
            store.dispatch(removeTodo(this.id))
            deleteTodos(this.id)
        })

        todoText.addEventListener('dblclick', (e) => {
            const prevValue = this.completed

            prevValue ? e.target.parentNode.classList.remove(prevValue) : '';
            
            e.target.value = e.target.getAttribute("placeholder");
            e.target.removeAttribute('readonly');
            e.target.placeholder = '';

            e.target.addEventListener('blur', (elem) => {
                store.dispatch(changeTodo(this.id, elem.target.value,))
                elem.target.placeholder = elem.target.value
                elem.target.readOnly = 'true';
                prevValue ? elem.target.parentNode.classList.add(prevValue) : null;
                updateTodos(this.id, elem.target.value, this.completed)
            })
            
        })

        return todoItem
    }
}

class TodoItemsList {
    constructor(store) {
        this.itemsList = []
        store.forEach(todoItem => {
            this.itemsList = [...this.itemsList, new TodoItems(todoItem)];
        })
    }

    render(store) {
        const todoList = document.createElement('ul');
        todoList.classList.add('todo_list');

        if(store.getState().filter.status === 'Completed') {
            this.itemsList.filter(todo => todo.completed === 'true').forEach(todo => {  
                todoList.appendChild(todo.render(store))     
            })
        } else if(store.getState().filter.status === 'Active'){
            this.itemsList.filter(todo => todo.completed === 'false').forEach(todo => {  
                todoList.appendChild(todo.render(store))     
            })
        } else {
            this.itemsList.forEach(todo => {  
                todoList.appendChild(todo.render(store))     
            })
        }
        

        return todoList;
    }
}

class TodoContainer {
    render(store) {
        const todoContainer = document.createElement('div');
        const addInput = document.createElement('input');
        const addtodo = document.createElement('button');

        todoContainer.classList.add('todo_container');
        addInput.id = 'addInput';
        addtodo.classList.add('todo_add');
        addtodo.textContent = 'Add note';

        todoContainer.append(addInput, addtodo);

        const todoList = new TodoItemsList(store.getState().todos);
        todoContainer.appendChild(todoList.render(store))

        addtodo.addEventListener('click', () => {
            if (addInput.value) {
                addTodos(addInput.value).then(id => {
                    store.dispatch(addTodo(addInput.value, JSON.parse(id)))
                })  
            }
        })

        return todoContainer
    }

    
}

class Statistic {
    constructor(totalAmount = 0, doneAmount = 0) {
        this.totalAmount = totalAmount;
        this.doneAmount = doneAmount;
    }

    render(store) {
        const todoStatistic = document.createElement('div');
        const todoTotal = document.createElement('div');
        const todoDone = document.createElement('div');
        const filterContainer = document.createElement('div');
        const all = document.createElement('p');
        const active = document.createElement('p');
        const completed = document.createElement('p');

        todoStatistic.classList.add('todo_statistic');
        todoTotal.textContent = `total: ${this.totalAmount} items`;
        todoTotal.classList.add('totalAmount');
        todoDone.textContent = `done: ${this.doneAmount} items`;
        todoDone.classList.add('doneAmount');
        filterContainer.classList.add('filter_container')
        all.textContent = 'All';
        all.classList.add('active');
        active.textContent = 'Active';
        completed.textContent = 'Completed';

        filterContainer.appendChild(all);
        filterContainer.appendChild(active);
        filterContainer.appendChild(completed);

        todoStatistic.appendChild(todoTotal);
        todoStatistic.appendChild(filterContainer)
        todoStatistic.appendChild(todoDone);

        if(store.getState().filter.status === 'Completed') {
            completed.classList.add('active');
            active.classList.remove('active');
            all.classList.remove('active');
        } else if(store.getState().filter.status === 'Active'){
            active.classList.add('active');
            all.classList.remove('active');
            completed.classList.remove('active');
        } else {
            all.classList.add('active');
            active.classList.remove('active');
            completed.classList.remove('active'); 
        }

        all.addEventListener('click', () => {
            store.dispatch(filterAll())
        })
        
        active.addEventListener('click', () => {
            store.dispatch(filterActive())
        })
        
        completed.addEventListener('click', () => {
            store.dispatch(filterCompleted())
        })

        return todoStatistic;
    }
}

export class TodoList {
    render(store) {
        let doneAmount = 0
        store.getState().todos.forEach(todo => {
            if (todo.completed === 'true') {
                doneAmount++
            }
        })
        

        let todoContainer = new TodoContainer()
        let statistic = new Statistic(store.getState().todos.length, doneAmount);
        

        document.body.appendChild(todoContainer.render(store))
        document.body.appendChild(statistic.render(store))
    }
}

