import {useState} from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { asyncAddTodo } from '../redux/actions'


const TodoForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const AddInput = styled.input.attrs(props => ({
    value: props.value
}))`
    border: 1px solid rgba(131,58,180,1);
    height: 30px;
    min-width: 200px;
    border-radius: 7px;
    padding: 5px;
`

const AddButton = styled.button.attrs(props => ({
    type: props.type
}))`
    border: 1px solid rgba(131,58,180,1);
    background: none;
    color: rgb(175, 107, 214);
    border-radius: 7px;
    padding: 10px 25px;
    margin-top: 30px;
  
    &:hover {
        background-color: rgba(131,58,180,1);
        color: #fff;
    }
`

export default function AddTodo() {
    const dispatch = useDispatch()

    const [input, setInput] = useState('')

    function handleChange(e) {
        setInput(e.target.value)
    }

    function handlerSubmit(e) {
        e.preventDefault();

        if (input.trim()) {
            dispatch(asyncAddTodo(input))
            setInput('')
        } 
    }

    return (
        <TodoForm onSubmit={handlerSubmit}>
            <AddInput onChange={handleChange} value={input}/>
            <AddButton className="todo_add" type="submit">Add todo</AddButton>
        </TodoForm>
    )
}