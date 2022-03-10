import FilterList from './FilterList'
import { connect } from 'react-redux'


function TodoStatistic({todos}) {
    return (
        <div className='todo_statistic'>
            <p>total: <span>{todos.length}</span></p>

            <FilterList/>

            <p>completed: <span>{
                todos.filter(todo => todo.completed==='true').length
            }</span></p>
        </div>
    )
}

const mapStateToProps = state => ({
    todos: state.todos.todos,
})

export default connect(mapStateToProps)(TodoStatistic)