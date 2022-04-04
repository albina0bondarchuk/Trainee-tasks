import React from 'react';
import styled from 'styled-components';
import AddTodo from './AddTodo';
import Pagination from './Pagination';
import TodoList from './TodoList';

const TodoContainer: React.FC = () => {
    return (
        <TodosContainer>
            <TodoHeading>To do list</TodoHeading>
            <AddTodo/>
            <TodoList/>
            <Pagination/>
        </TodosContainer>
    )
}


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

export default TodoContainer