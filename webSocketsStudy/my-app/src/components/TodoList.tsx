import { useMemo } from "react";
import styled from "styled-components";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Filters } from "../types/todos";
import TodoItem from "./TodoItem"


export default function TodoList() {
    const {todos, filter} = useTypedSelector(state => state.todos)

    const filteredTodos = useMemo(() => {
        if(filter === Filters.completed) {
            return todos.filter(todo => todo.completed==='true')
        }
        if(filter === Filters.active) {
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


const TodoUl = styled.ul`
    margin-top: 40px;
    padding: 0;
`