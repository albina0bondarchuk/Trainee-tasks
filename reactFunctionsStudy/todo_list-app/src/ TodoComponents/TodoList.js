import {TodoItem} from "./TodoItem"

function TodoList({ todos, filter }) {
    
    function filteredTodos(filter='all', todos) {
        if(filter === 'completed') {
            return todos.filter(todo => todo.completed==='true')
        }
        if(filter === 'active') {
            return todos.filter(todo => todo.completed==='false')
        } 

        return todos
    }

    return (
        <ul className="todo_list">
            {
                filteredTodos(filter, todos)
                    .map(todo => {
                        return <TodoItem 
                            todo={todo} 
                            key={todo._id} 
                        />
                    })
            }
        </ul>
    )
}

export {TodoList}