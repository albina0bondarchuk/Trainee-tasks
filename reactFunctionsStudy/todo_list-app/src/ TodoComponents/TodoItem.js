import {useState, useContext} from "react";
import { Context } from "../context";


function TodoItem({todo}) {
    const [input, setInput] = useState(todo.text);
    const [isChanged, setIsChanged] = useState(false)

    const {changeComplete, changeText, removeTodo} = useContext(Context)

    function handleChange(e) {
        setInput(e.target.value)
    }

    function handleDoubleClick(e) {
        setIsChanged(true)
    }

    function handleBlur() {
        changeText(todo.id, input)
        setIsChanged(false)
    }

    const done = todo.completed ? 'done' : '';
    return (
        <li className={`todo_item ${done}`}>
            <span className='state' onClick={changeComplete.bind(null, todo.id)}/>
            { isChanged ? (
                    <input value={input} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                ) : (
                    <input readOnly 
                        value={input} 
                        onChange={handleChange} 
                        onDoubleClick={handleDoubleClick}
                    />
                )
            }
            
            <button className="delete" onClick={removeTodo.bind(null, todo.id)}> &times;</button>
        </li>
    )
}

// TodoItem.propTypes = {
//     todo : PropTypes.object.isRequired,
//     changeState : PropTypes.func.isRequired,
// }

export {TodoItem}