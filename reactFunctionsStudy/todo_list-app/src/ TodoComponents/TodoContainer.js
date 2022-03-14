import styled from 'styled-components'
import AddTodo from './AddTodo'
import TodoList from './TodoList'


const TodosContainer = styled.div`
    width: 400px;
    margin: 40px auto 20px;
    border-radius: 20px;
    background-color: #fff;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const TodoHeading = styled.h1`
    color: rgb(38, 12, 56);
`

export default function TodoContainer() {
    return (
        <TodosContainer>
            <TodoHeading>To do list</TodoHeading>
            <AddTodo/>
            <TodoList/>
        </TodosContainer>
    )
}