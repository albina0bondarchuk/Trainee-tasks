import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { asyncChangeComplete, asyncDeleteTodo, asyncChangeText } from '../redux/actions'


export default function TodoItem({todo}) {
    

    const dispatch = useDispatch()

    const [input, setInput] = useState(todo.text);
    const [isChanged, setIsChanged] = useState(false)

    function handleChange(e) {
        setInput(e.target.value)
    }

    function handleDoubleClick(e) {
        setIsChanged(true)
    }

    function handleBlur() {
        dispatch(asyncChangeText(todo._id, input, todo.completed))
        setIsChanged(false)
    }

    const className = todo.completed === 'true' ? 'done' : ''

    return (
        <TodoLi className={className}>
            <State
                completed={todo.completed}
                onClick={() => dispatch(asyncChangeComplete(todo._id, todo.text, todo.completed === 'true' ? 'false' : 'true'))}/>
            { isChanged ? (
                    <Text 
                        value={input} 
                        completed={todo.completed}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                ) : (
                    <Text readOnly 
                        value={input} 
                        completed={todo.completed}
                        onChange={handleChange} 
                        onDoubleClick={handleDoubleClick}
                    />
                )
            }
            
            <Delete 
                className="delete" 
                onClick={() => dispatch(asyncDeleteTodo(todo._id))}
            > &times;</Delete>
        </TodoLi>
    )
}


const TodoLi = styled.li`
    list-style-type: none;
    background: rgba(131,58,180,1);
    color: #fff;
    min-width: 200px;
    padding: 10px;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    position: relative;
`

const State = styled.div`
    width: 15px;
    height: 15px;
    margin-right: 15px;
    background-color: ${props => props.completed === 'true' ? 'rgba(252,176,69,1)' : '#fff'};
    order: -1;
`
const Text = styled.input.attrs(props => ({
    value: props.value
}))`
    color: ${props => props.completed === 'true' ? 'rgb(170, 170, 170);' : '#fff'};
    text-decoration: ${props => props.completed === 'true' ? 'line-through' : 'none'};
    background: none;
    border: 0;
    outline: -webkit-focus-ring-color auto 0px;

    &:focus-visible {
        background: none;
        border: 0;
        outline: -webkit-focus-ring-color auto 0px;
    }

    &::placeholder {
        color:#fff
    }

    &:read-only {
        cursor: pointer;
    }
    `

const Delete = styled.button`
    color: #fff;
    background: none;
    border: 0;
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        color: rgba(253,29,29,1);
    }
`