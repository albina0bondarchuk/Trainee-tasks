import { connect } from "react-redux";
import { filterTodos } from '../redux/actions'

function FilterItem({filterName, filter, filterTodos}) {
    const classList = filterName === filter ? 'active' : ''
    return (
        <p 
            className={classList} 
            onClick={filterTodos.bind(null, filterName)}
        >{filterName}</p>
    )
}

const mapDispatchToProps = {
    filterTodos
}

const mapStateToProps = state => ({
    filter: state.todos.filter
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterItem)