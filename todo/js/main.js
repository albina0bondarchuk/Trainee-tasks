const todoContainer = document.createElement('div');
const addInput = document.createElement('input');
const addtodo = document.createElement('button');
const todoList = document.createElement('ul');
const todoStatistic = document.createElement('div');
const todoTotal = document.createElement('div');
const todoDone = document.createElement('div');
const filterContainer = document.createElement('div');
const all = document.createElement('p');
const active = document.createElement('p');
const completed = document.createElement('p');

let todoItemsArray = [];
let todoAmount = localStorage.length;
let todoDoneAmount = 0;


todoContainer.classList.add('todo_container');
addInput.id = 'addInput';
addtodo.classList.add('todo_add');
addtodo.textContent = 'Add note';
todoList.classList.add('todo_list');
todoStatistic.classList.add('todo_statistic');
todoTotal.textContent = `total: ${todoAmount} items`;
todoDone.textContent = `done: ${todoDoneAmount} items`;
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

todoContainer.appendChild(addInput);
todoContainer.appendChild(addtodo);
todoContainer.appendChild(todoList);

document.body.appendChild(todoContainer);
document.body.appendChild(todoStatistic);

setTodoItems();
showTodoList(todoItemsArray);

addtodo.addEventListener('click', () => {
    if (addInput.value) {
        todoItemsArray.push({[addInput.value]: ''})
        localStorage.setItem(addInput.value, '')
        showTodoList(todoItemsArray);
        addInput.value = '';
        todoTotal.textContent = `total: ${++todoAmount} items`
    }
})

all.addEventListener('click', () => {
    all.classList.add('active');
    active.classList.remove('active');
    completed.classList.remove('active');

    showTodoList(todoItemsArray);
})

active.addEventListener('click', () => {
    active.classList.add('active');
    all.classList.remove('active');
    completed.classList.remove('active');

    let activeArray = todoItemsArray.filter(todo => todo[Object.keys(todo)[0]] === '')
    showTodoList(activeArray)
})

completed.addEventListener('click', () => {
    completed.classList.add('active');
    active.classList.remove('active');
    all.classList.remove('active');

    let doneArray = todoItemsArray.filter(todo => todo[Object.keys(todo)[0]] === 'done')
    showTodoList(doneArray)
})


function setTodoItems() {
    for(let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            todoItemsArray.push({[key]: localStorage[key]})
        }
    }
}

function showTodoList(arr) {
    todoList.innerHTML = "";
    todoDoneAmount = 0

    arr.forEach(todo => {
        let todoItem = document.createElement('li');
            todoItem.classList.add('todo_item');
            
            let itemState = document.createElement('div');
            itemState.classList.add('state');
            
            let deleteBut = document.createElement('div');
            deleteBut.classList.add('delete');
            deleteBut.innerHTML = `&#215;`;

            let todoText = document.createElement('input')
            todoText.readOnly = 'true';
            todoText.placeholder = Object.keys(todo)[0];

            todoItem.appendChild(itemState);
            todoItem.appendChild(todoText)
            todoItem.appendChild(deleteBut)
            todoList.appendChild(todoItem);

            if (todo[Object.keys(todo)[0]] === 'done'){
                done(itemState)
                todoItem.classList.toggle('done');
            }

            itemState.addEventListener('click', (e) => {
                done(e.target)
                todoItem.classList.toggle('done');
            })
    
            deleteBut.addEventListener('click', (e) => {
                todoItemsArray = todoItemsArray.filter(todo => Object.keys(todo)[0] !== e.target.parentNode.querySelector('input').getAttribute("placeholder"))
                localStorage.removeItem(e.target.parentNode.querySelector('input').getAttribute("placeholder"));
                showTodoList(todoItemsArray);
            })

            todoText.addEventListener('dblclick', (e) => {
                
                const prevKey = e.target.getAttribute("placeholder");
                const prevValue = localStorage[prevKey];
                prevValue ? e.target.parentNode.classList.remove(prevValue) : '';
                e.target.value = e.target.getAttribute("placeholder");
                e.target.removeAttribute('readonly');

                e.target.addEventListener('blur', (elem) => {
                    localStorage.removeItem(prevKey);
                    localStorage.setItem(elem.target.value, prevValue)
                    todoItemsArray.forEach(todo => {
                        if (Object.keys(todo)[0] === prevValue) {
                            Object.keys(todo)[0] = elem.target.value;
                        }
                    })
                    elem.target.placeholder = elem.target.value
                    elem.target.readOnly = 'true';
                    elem.target.parentNode.classList.add(prevValue);
                })
                
            })
    });
}

function done (elem) {
    elem.classList.toggle('done');
    
    if(elem.className === 'state done') {
        todoDoneAmount++;
        todoItemsArray.forEach(todo => {
            if (Object.keys(todo)[0] === elem.parentNode.querySelector('input').getAttribute("placeholder")) {
                todo[Object.keys(todo)[0]] = 'done'
            }
        })
        localStorage.setItem(elem.parentNode.querySelector('input').getAttribute("placeholder"), 'done');
    } else {
        todoDoneAmount--;
        todoItemsArray.forEach(todo => {
            if (Object.keys(todo)[0] === elem.parentNode.querySelector('input').getAttribute("placeholder")) {
                todo[Object.keys(todo)[0]] = ''
            }
        })
        localStorage.setItem(elem.parentNode.querySelector('input').getAttribute("placeholder"), '');
    }

    todoDone.textContent = `done: ${todoDoneAmount} items`
}

