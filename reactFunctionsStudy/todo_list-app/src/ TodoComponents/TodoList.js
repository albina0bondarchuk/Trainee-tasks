import { connect } from "react-redux"
import TodoItem from "./TodoItem"

function TodoList({ todos, filter }) {
    console.log(todos);
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
                            key={todo._id}
                            todo={todo}  
                        />
                    })
            }
        </ul>
    )
}


const mapStateToProps = state => ({
    todos: state.todos.todos,
    filter: state.todos.filter
})

export default connect(mapStateToProps)(TodoList)