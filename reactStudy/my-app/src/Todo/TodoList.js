import {React} from 'react'
import {PropTypes} from 'prop-types'
import {TodoItem} from './TodoItem'

function TodoList(props) {
    return (
        <ul className='todo_list'>
            {
                props.todos.map(todo => {
                    return <TodoItem 
                        todo={todo} 
                        key={todo.id} 
                        changeState = {props.changeState}
                    />
                })
            }
        </ul>
    )
}

TodoList.propTypes = {
    todos : PropTypes.arrayOf(PropTypes.object).isRequired,
    changeState : PropTypes.func.isRequired
}

export {TodoList}