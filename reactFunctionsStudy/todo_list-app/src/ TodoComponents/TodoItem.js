import {useState, useContext} from "react";
import { Context } from "../context";


function TodoItem({todo}) {
    const [input, setInput] = useState(todo.text);
    const [isChanged, setIsChanged] = useState(false)

    const {patchTodos, changeComplete, changeText, removeTodo, deleteTodo} = useContext(Context)

    function handleChange(e) {
        setInput(e.target.value)
    }

    function handleDoubleClick(e) {
        setIsChanged(true)
    }

    function handleBlur() {
        patchTodos(todo._id, input, todo.completed)
        changeText(todo._id, input)
        setIsChanged(false)
    }

    return (
        <li className={`todo_item ${todo.completed === 'true' ? 'done' : ''}`}>
            <span className='state' 
                onClick={()=> { 
                    patchTodos(todo._id, todo.input, todo.completed === 'true' ? 'false' : 'true')
                    changeComplete(todo._id) 
                }
            }/>
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
            
            <button className="delete" onClick={() => {
                deleteTodo(todo._id)
                removeTodo(todo._id)
            }}> &times;</button>
        </li>
    )
}

// TodoItem.propTypes = {
//     todo : PropTypes.object.isRequired,
//     changeState : PropTypes.func.isRequired,
// }

export {TodoItem}