import { useState, useContext } from "react";
import { connect } from "react-redux";
import { changeComplete, changeText, removeTodo } from '../redux/actions'


function TodoItem({todo, changeComplete, changeText, removeTodo}) {
    console.log(todo);
    const [input, setInput] = useState(todo.text);
    const [isChanged, setIsChanged] = useState(false)

    function handleChange(e) {
        setInput(e.target.value)
    }

    function handleDoubleClick(e) {
        setIsChanged(true)
    }

    function handleBlur() {
        // patchTodos(todo._id, input, todo.completed)
        changeText(todo._id, input)
        setIsChanged(false)
    }

    const className = todo.completed === 'true' ? 'todo_item done' : 'todo_item'
    return (
        <li className={className}>
            <span className='state' 
                onClick={() => { 
                    // patchTodos(todo._id, todo.input, todo.completed === 'true' ? 'false' : 'true')
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
                // deleteTodo(todo._id)
                removeTodo(todo._id)
            }}> &times;</button>
        </li>
    )
}

const mapDispatchToProps = {
    changeComplete,
    changeText,
    removeTodo
}

export default connect(null, mapDispatchToProps)(TodoItem)