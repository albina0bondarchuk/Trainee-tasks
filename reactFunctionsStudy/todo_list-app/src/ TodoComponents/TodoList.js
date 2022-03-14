import { useMemo } from "react";
import { useSelector } from "react-redux"
import styled from "styled-components";
import TodoItem from "./TodoItem"


const TodoUl = styled.ul`
    margin-top: 40px;
    padding: 0;
`

export default function TodoList() {
    const todos = useSelector(state => state.todos.todos)
    const filter = useSelector(state => state.todos.filter)

    const filteredTodos = useMemo(()=>{
        if(filter === 'completed') {
            return todos.filter(todo => todo.completed==='true')
        }
        if(filter === 'active') {
            return todos.filter(todo => todo.completed==='false')
        } 

        return todos
    },[todos, filter])

    return (
        <TodoUl>
            {
                filteredTodos.map(todo => {
                        return <TodoItem 
                            key={todo._id}
                            todo={todo}  
                        />
                    })
            }
        </TodoUl>
    )
}
