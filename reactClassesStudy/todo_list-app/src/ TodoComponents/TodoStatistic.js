import {Component} from 'react'
import {FilterList} from './FilterList'


export class TodoStatistic extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className='todo_statistic'>
                <p>total: <span>{this.props.todos.length}</span></p>

                <FilterList 
                    filter={this.props.filter}
                    filterTodos = {this.props.filterTodos}
                />

                <p>completed: <span>{
                    this.props.todos.filter(todo => todo.completed).length
                }</span></p>
            </div>
        )
    }
}