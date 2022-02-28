class TodoArray {
    constructor(arr = []) {
        this.todoItemsArray = arr
    }

    setTodoItems() {
        for(let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                this.todoItemsArray = JSON.parse(localStorage.getItem('1'));
            }
        }
        return this.todoItemsArray
    }
    
    getTodoItems() {
        localStorage.clear();
        localStorage.setItem('1', JSON.stringify(this.todoItemsArray))
    }

    pushArr(obj) {
        this.todoItemsArray.push(obj);
    }

    getArr() {
        return this.todoItemsArray
    }
}

class TodoItems {
    constructor(obj) {
        this[Object.keys(obj)[0]] = obj[Object.keys(obj)[0]];
    }

    addHTML(list, arr, statistic) {
        let todoItem = document.createElement('li');
        todoItem.classList.add('todo_item');
            
        let itemState = document.createElement('div');
        itemState.classList.add('state');
            
        let deleteBut = document.createElement('div');
        deleteBut.classList.add('delete');
        deleteBut.innerHTML = `&#215;`;

        let todoText = document.createElement('input')
        todoText.readOnly = 'true';
        todoText.placeholder = [Object.keys(this)[0]];

        todoItem.appendChild(itemState);
        todoItem.appendChild(todoText);
        todoItem.appendChild(deleteBut);

        if (this[Object.keys(this)[0]] === 'done'){
            this.done(itemState, list, arr, statistic)
            todoItem.classList.toggle('done');
        }

        itemState.addEventListener('click', (e) => {
            this.done(e.target, list, arr, statistic)
            console.log(list);
            if(document.querySelector('.todo_list').className === 'todo_list active' || document.querySelector('.todo_list').className === 'todo_list completed') {
                e.target.parentNode.style.display = 'none'
                
            }
            todoItem.classList.toggle('done');
            
        })

        deleteBut.addEventListener('click', (e) => {
            list.itemsList = list.itemsList.filter(todo => Object.keys(todo)[0] !== e.target.parentNode.querySelector('input').getAttribute("placeholder"))

            arr.todoItemsArray = arr.todoItemsArray.filter(todo => Object.keys(todo)[0] !== e.target.parentNode.querySelector('input').getAttribute("placeholder"))

            list.addHTML(arr, statistic);
            arr.getTodoItems()
            statistic.totalAmount--;
            statistic.setTotalTextContent();
        })

        todoText.addEventListener('dblclick', (e) => {
            const prevKey = e.target.getAttribute("placeholder");
            const elementInArray = list.itemsList.findIndex(todo => Object.keys(todo)[0] === prevKey);
            const prevValue = list.itemsList[elementInArray][Object.keys(this)[0]]

            prevValue ? e.target.parentNode.classList.remove(prevValue) : '';
            
            e.target.value = e.target.getAttribute("placeholder");
            e.target.removeAttribute('readonly');
            e.target.placeholder = '';

            e.target.addEventListener('blur', (elem) => {
                list.itemsList.splice(elementInArray, 1);
                
                list.itemsList.push(new TodoItems({[elem.target.value]: prevValue}))

                arr.todoItemsArray.splice(elementInArray, 1);
                
                arr.todoItemsArray.push({[elem.target.value]: prevValue})
                
                elem.target.placeholder = elem.target.value
                elem.target.readOnly = 'true';
                prevValue ? elem.target.parentNode.classList.add(prevValue) : null;

                list.addHTML(arr, statistic);
                arr.getTodoItems()
            })
            
        })

        return todoItem
    }

    done (elem, list, arr, statistic) {
        elem.classList.toggle('done');
        
        if(elem.className === 'state done') {
            statistic.doneAmount++;
            statistic.setDoneTextContent();
            
            list.itemsList.forEach(todo => {
                if (Object.keys(todo)[0] === elem.parentNode.querySelector('input').getAttribute("placeholder")) {
                    todo[Object.keys(todo)[0]] = 'done'
                }
            })

            arr.todoItemsArray.forEach(todo => {
                if (Object.keys(todo)[0] === elem.parentNode.querySelector('input').getAttribute("placeholder")) {
                    todo[Object.keys(todo)[0]] = 'done'
                }
            })
            
        } else {
            statistic.doneAmount--;
            statistic.setDoneTextContent();
            list.itemsList.forEach(todo => {
                if (Object.keys(todo)[0] === elem.parentNode.querySelector('input').getAttribute("placeholder")) {
                    todo[Object.keys(todo)[0]] = ''
                }
            })

            arr.todoItemsArray.forEach(todo => {
                if (Object.keys(todo)[0] === elem.parentNode.querySelector('input').getAttribute("placeholder")) {
                    todo[Object.keys(todo)[0]] = ''
                }
            })
        }
        
        arr.getTodoItems()
        
        statistic.setDoneTextContent();
    }
}

class TodoItemsList {
    constructor(arr) {
        this.itemsList = []
        arr.forEach(todoItem => {
            this.itemsList.push(new TodoItems(todoItem));
        })
    }

    addHTML(arr, statistic) {

        console.log(this.itemsList);
        statistic.doneAmount = 0;
        document.querySelector('.todo_list') ? document.querySelector('.todo_container').removeChild(document.querySelector('.todo_list')) : '';

        const todoList = document.createElement('ul');
        todoList.classList.add('todo_list');

        this.itemsList.forEach(todo => {
            
            todoList.appendChild(todo.addHTML(this, arr, statistic))
            
        })

        document.querySelector('.todo_container').appendChild(todoList)

        

        return todoList;
    }

    pushArr(obj) {
        this.itemsList.push(new TodoItems(obj));
    }

    getArr() {
        return this.itemsList
    }
}

class TodoContainer {
    addHTML(arr, statistic, mainarr) {
        const todoContainer = document.createElement('div');
        const addInput = document.createElement('input');
        const addtodo = document.createElement('button');

        todoContainer.classList.add('todo_container');
        addInput.id = 'addInput';
        addtodo.classList.add('todo_add');
        addtodo.textContent = 'Add note';

        todoContainer.appendChild(addInput);
        todoContainer.appendChild(addtodo);;

        addtodo.addEventListener('click', () => {
            if (addInput.value) {
                arr.pushArr({[addInput.value]: ''}) 
                
                console.log(new TodoItems({[addInput.value]: ''}));
                
                statistic.totalAmount++;
                statistic.setTotalTextContent();
                mainarr.pushArr({[addInput.value]:''});
                

                arr.addHTML(mainarr, statistic);
                mainarr.getTodoItems()
                addInput.value = '';

                statistic.totalAmount++;
                statistic.setTotalTextContent();
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

    addHTML(arr, mainarr) {
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


        all.addEventListener('click', () => {
            all.classList.add('active');
            active.classList.remove('active');
            completed.classList.remove('active');
        
            arr.addHTML(mainarr, this);
            document.querySelector('.todo_list').classList.add('all');
        })
        
        active.addEventListener('click', () => {
            active.classList.add('active');
            all.classList.remove('active');
            completed.classList.remove('active');
        
            let activeArray = new TodoItemsList(mainarr.todoItemsArray.slice());

            activeArray.itemsList = activeArray.itemsList.filter(todo => todo[Object.keys(todo)[0]] === '')
            activeArray.addHTML(mainarr, this);
            document.querySelector('.todo_list').classList.add('active');
        })
        
        completed.addEventListener('click', () => {
            completed.classList.add('active');
            active.classList.remove('active');
            all.classList.remove('active');
        
            let doneArray = new TodoItemsList(mainarr.todoItemsArray.slice());
            doneArray.itemsList = doneArray.itemsList.filter(todo => todo[Object.keys(todo)[0]] === 'done')
            doneArray.addHTML(mainarr, this);
            document.querySelector('.todo_list').classList.add('completed');
        })

        return todoStatistic;
    }

    setTotalTextContent() {
        document.querySelector('.totalAmount').textContent = `total: ${this.totalAmount} items`
    }

    setDoneTextContent() {
        document.querySelector('.doneAmount').textContent = `done: ${this.doneAmount} items`
    }
}

export default function todoListShow() {
    let todoArray = new TodoArray();

    let statistic = new Statistic(todoArray.setTodoItems().length, 0);
    
    let todoItemsList = new TodoItemsList(todoArray.setTodoItems());
    
    let todoContainer = new TodoContainer()
    document.body.appendChild(todoContainer.addHTML(todoItemsList, statistic, todoArray))
    
    document.body.appendChild(statistic.addHTML(todoItemsList, todoArray))
    
    todoItemsList.addHTML(todoArray, statistic)
}





