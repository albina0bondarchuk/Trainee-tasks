import {useState, useContext} from 'react'
import { Context } from '../context';
import { connect } from 'react-redux';
import { asyncAddTodo } from '../redux/actions'

function AddTodo({asyncAddTodo}) {
    const [input, setInput] = useState('')

    function handleChange(e) {
        setInput(e.target.value)
    }

    function handlerSubmit(e) {
        e.preventDefault();

        if (input.trim()) {
            // postTodo(input)
            asyncAddTodo(input)
            setInput('')
        } 
    }

    return (
        <form onSubmit={handlerSubmit}>
            <input id="addInput" onChange={handleChange} value={input}/>
            <button className="todo_add" type="submit">Add todo</button>
        </form>
    )
}

const mapDispatchToProps = {
    asyncAddTodo,
}

export default connect(null, mapDispatchToProps)(AddTodo)