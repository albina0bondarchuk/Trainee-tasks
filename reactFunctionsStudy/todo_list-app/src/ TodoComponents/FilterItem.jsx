import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { filterTodos } from '../redux/actions'


export default function FilterItem({filterName}) {
    const filter = useSelector(state => state.todos.filter)
    const dispatch = useDispatch()

    const isActive = filterName === filter

    return (
        <Item 
            textColor={isActive ? 'rgb(26, 25, 25)' : 'rgb(244,203,250)'} 
            fontWeight={isActive ? 'bold' : 'normal'}
            onClick={() => dispatch(filterTodos(filterName))}
        >{filterName}</Item>
    )
}


const Item = styled.p`
    margin-right: 10px;
    font-size: 14px;
    color: ${ props => props.textColor };
    font-weight: ${ props => props.fontWeight };

    &:last-child {
        margin-right: 0px;
    }

    &:hover {
        color: rgb(26, 25, 25);
        font-weight: bold;
    }
`