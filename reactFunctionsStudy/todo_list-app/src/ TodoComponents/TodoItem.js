import { useState, useContext } from "react";
import { connect } from "react-redux";
import { asyncChangeComplete, asyncDeleteTodo, asyncChangeText } from '../redux/actions'


function TodoItem({todo, asyncChangeComplete, asyncChangeText, asyncDeleteTodo}) {
    const [input, setInput] = useState(todo.text);
    const [isChanged, setIsChanged] = useState(false)

    function handleChange(e) {
        setInput(e.target.value)
    }

    function handleDoubleClick(e) {
        setIsChanged(true)
    }

    function handleBlur() {
        asyncChangeText(todo._id, input, todo.completed)
        setIsChanged(false)
    }

    const className = todo.completed === 'true' ? 'todo_item done' : 'todo_item'

    return (
        <li className={className}>
            <span className='state'
                onClick={
                    asyncChangeComplete.bind(null, todo._id, todo.text, todo.completed === 'true' ? 'false' : 'true')
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
                asyncDeleteTodo(todo._id)
            }}> &times;</button>
        </li>
    )
}

const mapDispatchToProps = {
    asyncChangeComplete,
    asyncChangeText,
    asyncDeleteTodo
}

export default connect(null, mapDispatchToProps)(TodoItem)