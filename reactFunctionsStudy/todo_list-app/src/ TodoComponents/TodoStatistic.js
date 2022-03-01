import {FilterList} from './FilterList'


export function TodoStatistic({todos, filter}) {
    return (
        <div className='todo_statistic'>
            <p>total: <span>{todos.length}</span></p>

            <FilterList 
                filter={filter}
            />

            <p>completed: <span>{
                todos.filter(todo => todo.completed).length
            }</span></p>
        </div>
    )
}