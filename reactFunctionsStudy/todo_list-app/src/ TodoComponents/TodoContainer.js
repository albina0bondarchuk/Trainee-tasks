import {AddTodo} from './AddTodo'
import {TodoList} from './TodoList'


function TodoContainer({todos, filter, addTodo, }) {
    return (
        <div className="todo_container">
            <h1 className='login_heading'>To do list</h1>
            <AddTodo/>
            <TodoList 
                todos = {todos}
                filter = {filter}
            />
        </div>
    )
}

export {TodoContainer}