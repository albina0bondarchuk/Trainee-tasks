import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { filterTodos } from '../redux/todosActions'

interface FilterItemProps {
    filterName: string
}

interface styledProps {
    textColor: string,
    fontWeight: string
}

const FilterItem: React.FC<FilterItemProps> = ({filterName}) => {
    const filter = useTypedSelector(state => state.todos.filter)
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


const Item = styled.p<styledProps>`
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

export default FilterItem