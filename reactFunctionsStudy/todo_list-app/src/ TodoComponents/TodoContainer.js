import AddTodo from './AddTodo'
import TodoList from './TodoList'


function TodoContainer({todos, filter}) {
    return (
        <div className="todo_container">
            <h1 className='login_heading'>To do list</h1>
            <AddTodo/>
            <TodoList/>
        </div>
    )
}

export {TodoContainer}