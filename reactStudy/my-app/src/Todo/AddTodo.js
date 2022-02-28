import {useState} from 'react'
import {PropTypes} from 'prop-types' 

function AddTodo({createItem}) {
    const [value, setValue] = useState('')

    function submitHandler(event) {
        event.preventDefault()

        if(value.trim()) {
            createItem(value)
            setValue('')
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <input id="addInput" value={value} onChange={event => setValue(event.target.value)}/>
            <button className="todo_add" type="submit">Add todo</button>
        </form>
    )
}

AddTodo.propTypes = {
    createItem: PropTypes.func.isRequired
}

export {AddTodo}