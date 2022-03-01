import {useState, useContext} from 'react'
import { Context } from '../context';

export function AddTodo() {
    const [input, setInput] = useState('')
    const {addTodo} = useContext(Context)

    function handleChange(e) {
        setInput(e.target.value)
    }

    function handlerSubmit(e) {
        e.preventDefault();

        if (input.trim()) {
            addTodo(input);
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