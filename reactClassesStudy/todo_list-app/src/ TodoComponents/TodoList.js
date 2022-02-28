import { Component } from "react"
import {TodoItem} from "./TodoItem"

class TodoList extends Component {
    constructor(props) {
        super(props)

        this.filteredTodos = this.filteredTodos.bind(this)
    }

    filteredTodos(filter='all', todos) {
        if(filter === 'completed') {
            return todos.filter(todo => todo.completed)
        }
        if(filter === 'active') {
            return todos.filter(todo => !todo.completed)
        } 

        return todos
    }

    render() {
        return (
            <ul className="todo_list">
                {
                    this.filteredTodos(this.props.filter, this.props.todos)
                        .map(todo => {
                            return <TodoItem 
                                todo={todo} 
                                key={todo.id} 
                                changeComplete={this.props.changeComplete}
                                changeText = {this.props.changeText}
                                removeTodo = {this.props.removeTodo}
                            />
                        })
                }
            </ul>
        )
    }
}

export {TodoList}