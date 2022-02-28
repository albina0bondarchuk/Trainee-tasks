import {useContext} from "react";
import {PropTypes} from 'prop-types'
import { Context } from "../context";

function TodoItem({todo, changeState}) {
    const {removeTodo} = useContext(Context)
    const done = todo.completed ? 'done' : '';
    return (
        <li className={`todo_item ${done}`}>
            <span className='state' onClick={() => changeState(todo.id)}/>
            <input placeholder={todo.text}/>
            <button className="delete" onClick = { removeTodo.bind(null, todo.id) }>&times;</button>
        </li>
    )
}

TodoItem.propTypes = {
    todo : PropTypes.object.isRequired,
    changeState : PropTypes.func.isRequired,
}

export {TodoItem}