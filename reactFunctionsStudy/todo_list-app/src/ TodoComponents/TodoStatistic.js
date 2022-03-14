import FilterList from './FilterList'
import { useSelector } from 'react-redux'
import styled from 'styled-components'


const StatisticContainer = styled.div`
    color: rgb(244, 203, 250);
    display: flex;
    justify-content: space-between;
    width: 400px;
    align-items: center;
`

export default function TodoStatistic() {
    const todos = useSelector(state => state.todos.todos)

    return (
        <StatisticContainer>
            <p>total: <span>{todos.length}</span></p>

            <FilterList/>

            <p>completed: <span>{
                todos.filter(todo => todo.completed==='true').length
            }</span></p>
        </StatisticContainer>
    )
}
