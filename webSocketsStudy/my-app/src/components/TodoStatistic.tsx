import styled from 'styled-components'
import { useTypedSelector } from '../hooks/useTypedSelector'
import FilterList from './FilterList'


const TodoStatistic : React.FC = () => {
    const todos = useTypedSelector(state => state.todos.todos)

    return (
        <StatisticContainer>
            <p>total: <span>{todos.length}</span></p>

            <FilterList/>

            <p>completed: <span>{
                todos.filter(todo => todo.completed === 'true').length
            }</span></p>
        </StatisticContainer>
    )
}


const StatisticContainer = styled.div`
    color: rgb(244, 203, 250);
    display: flex;
    justify-content: space-between;
    width: 400px;
    align-items: center;
`

export default TodoStatistic