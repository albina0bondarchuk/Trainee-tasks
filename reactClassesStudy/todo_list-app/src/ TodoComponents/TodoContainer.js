import {Component} from 'react'
import {AddTodo} from './AddTodo'
import {TodoList} from './TodoList'


class TodoContainer extends Component {
    render() {
        return (
            <div className="todo_container">
                <h1 className='login_heading'>To do list</h1>
                <AddTodo 
                    addTodo = {this.props.addTodo}
                />
                <TodoList 
                    todos = { this.props.todos}
                    filter = {this.props.filter}
                    changeComplete = {this.props.changeComplete}
                    changeText = {this.props.changeText}
                    removeTodo = {this.props.removeTodo}
                />
            </div>
        )
    }
}

export {TodoContainer}