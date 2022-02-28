// const todoContainer = document.createElement('div');
// const addInput = document.createElement('input');
// const addtodo = document.createElement('button');
// const todoList = document.createElement('ul');
// const todoStatistic = document.createElement('div');
// const todoTotal = document.createElement('div');
// const todoDone = document.createElement('div');
// const filterContainer = document.createElement('div');
// const all = document.createElement('p');
// const active = document.createElement('p');
// const completed = document.createElement('p');

// let todoItemsArray = [];
// setTodoItems();
// let todoAmount = todoItemsArray.length;
// let todoDoneAmount = 0;


// todoContainer.classList.add('todo_container');
// addInput.id = 'addInput';
// addtodo.classList.add('todo_add');
// addtodo.textContent = 'Add note';
// todoList.classList.add('todo_list');
// todoStatistic.classList.add('todo_statistic');
// todoTotal.textContent = `total: ${todoAmount} items`;
// todoDone.textContent = `done: ${todoDoneAmount} items`;
// filterContainer.classList.add('filter_container')
// all.textContent = 'All';
// all.classList.add('active');
// active.textContent = 'Active';
// completed.textContent = 'Completed';

// filterContainer.appendChild(all);
// filterContainer.appendChild(active);
// filterContainer.appendChild(completed);

// todoStatistic.appendChild(todoTotal);
// todoStatistic.appendChild(filterContainer)
// todoStatistic.appendChild(todoDone);

// todoContainer.appendChild(addInput);
// todoContainer.appendChild(addtodo);
// todoContainer.appendChild(todoList);

document.body.appendChild(todoContainer);
// document.body.appendChild(todoStatistic);


showTodoList(todoItemsArray);

addtodo.addEventListener('click', () => {
    if (addInput.value) {
        todoItemsArray.push({[addInput.value]: ''})
        showTodoList(todoItemsArray);
        addInput.value = '';
        todoTotal.textContent = `total: ${++todoAmount} items`
        getTodoItems()
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
    showTodoList(activeArray);
})

completed.addEventListener('click', () => {
    completed.classList.add('active');
    active.classList.remove('active');
    all.classList.remove('active');

    let doneArray = todoItemsArray.filter(todo => todo[Object.keys(todo)[0]] === 'done')
    showTodoList(doneArray)
})

// function setTodoItems() {
//     for(let key in localStorage) {
//         if (localStorage.hasOwnProperty(key)) {
//             todoItemsArray = JSON.parse(localStorage.getItem('1'));
//         }
//     }
// }

// function getTodoItems() {
//     localStorage.clear();
//     localStorage.setItem('1', JSON.stringify(todoItemsArray))
// }

function showTodoList(arr) {
    // todoList.innerHTML = "";
    // todoDoneAmount = 0

    // arr.forEach(todo => {
    //     let todoItem = document.createElement('li');
    //         todoItem.classList.add('todo_item');
            
    //         let itemState = document.createElement('div');
    //         itemState.classList.add('state');
            
    //         let deleteBut = document.createElement('div');
    //         deleteBut.classList.add('delete');
    //         deleteBut.innerHTML = `&#215;`;

    //         let todoText = document.createElement('input')
    //         todoText.readOnly = 'true';
    //         todoText.placeholder = Object.keys(todo)[0];

    //         todoItem.appendChild(itemState);
    //         todoItem.appendChild(todoText)
    //         todoItem.appendChild(deleteBut)
    //         todoList.appendChild(todoItem);

            if (todo[Object.keys(todo)[0]] === 'done'){
                done(itemState, arr)
                todoItem.classList.toggle('done');
            }

            itemState.addEventListener('click', (e) => {
                done(e.target, arr)
                if(arr !== todoItemsArray) {
                    e.target.parentNode.style.display = 'none'
                }
                todoItem.classList.toggle('done');
            })
    
            deleteBut.addEventListener('click', (e) => {
                todoItemsArray = todoItemsArray.filter(todo => Object.keys(todo)[0] !== e.target.parentNode.querySelector('input').getAttribute("placeholder"))
                showTodoList(todoItemsArray);
                todoTotal.textContent = `total: ${--todoAmount} items`;
                getTodoItems();
            })

            todoText.addEventListener('dblclick', (e) => {
                const prevKey = e.target.getAttribute("placeholder");
                const elementInArray = todoItemsArray.findIndex(todo => Object.keys(todo)[0] === prevKey);
                const prevValue = todoItemsArray[elementInArray][Object.keys(todo)[0]]

                prevValue ? e.target.parentNode.classList.remove(prevValue) : '';
                
                e.target.value = e.target.getAttribute("placeholder");
                e.target.removeAttribute('readonly');
                e.target.placeholder = '';

                e.target.addEventListener('blur', (elem) => {
                    todoItemsArray.splice(elementInArray, 1);
                    
                    todoItemsArray.push({[elem.target.value]: prevValue})
                    
                    
                    elem.target.placeholder = elem.target.value
                    elem.target.readOnly = 'true';
                    prevValue ? elem.target.parentNode.classList.add(prevValue) : null;

                    console.log(todoItemsArray);
                    getTodoItems();
                })
                
            })
    });
}

function done (elem, arr) {
    elem.classList.toggle('done');
    
    if(elem.className === 'state done') {
        todoDoneAmount++;
        todoItemsArray.forEach(todo => {
            if (Object.keys(todo)[0] === elem.parentNode.querySelector('input').getAttribute("placeholder")) {
                todo[Object.keys(todo)[0]] = 'done'
            }
        })
        
    } else {
        todoDoneAmount--;
        todoItemsArray.forEach(todo => {
            if (Object.keys(todo)[0] === elem.parentNode.querySelector('input').getAttribute("placeholder")) {
                todo[Object.keys(todo)[0]] = ''
            }
        })
    }

    todoDone.textContent = `done: ${todoDoneAmount} items`
    getTodoItems()
}