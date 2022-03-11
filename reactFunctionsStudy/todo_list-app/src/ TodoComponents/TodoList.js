import { useMemo } from "react";
import { connect } from "react-redux"
import TodoItem from "./TodoItem"

function TodoList({ todos, filter }) {
    
    // function filteredTodos(filter='all', todos) {
        
    // }

    const filteredTodos = useMemo(()=>{
        if(filter === 'completed') {
            return todos.filter(todo => todo.completed==='true')
        }
        if(filter === 'active') {
            return todos.filter(todo => todo.completed==='false')
        } 

        return todos
    },[todos, filter])

    return (
        <ul className="todo_list">
            {
                filteredTodos.map(todo => {
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