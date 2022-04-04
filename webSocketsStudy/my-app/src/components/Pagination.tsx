import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { changePage } from "../redux/paginationActions";


interface styledProps {
    color: string
}

const Pagination: React.FC = () => {
    const todos = useTypedSelector(state => state.todos.todos)
    const {currentPage, todosPerPage} = useTypedSelector(state => state.pagination);
    const dispatch = useDispatch()
    
    const pageNumbers = []

    for( let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <PaginationContainer>
            {
                pageNumbers.map(number => (
                    <PaginationItem 
                        key = {number}
                        onClick = {() => dispatch(changePage(number))}
                        color = {number === currentPage ? 'rgba(253,29,29,1)' : 'rgb(38,12,56)'}
                    >{number}
                    </PaginationItem>
                ))
            }
        </PaginationContainer>
    )
}

const PaginationContainer = styled.ul`
    display: flex;
    justify-content: space-around;
    max-width: 500px;
    padding: 0
`

const PaginationItem = styled.li<styledProps>`
    list-style-type: none;
    color: ${props => props.color};
    border: 1px solid ${props => props.color};
    border-radius: 50%;
    padding: 5px 8px;
    margin-left: 5px;
    cursor: pointer;
`

export default Pagination