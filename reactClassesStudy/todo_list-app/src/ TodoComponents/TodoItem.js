import {Component} from "react";

class TodoItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            input: this.props.todo.text,
            isChanged: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleDoubleClick = this.handleDoubleClick.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
    }

    handleChange(e) {
        this.setState({
            input: e.target.value
        })
    }

    handleDoubleClick(e) {
        this.setState({
            isChanged: true
        })
    }

    handleBlur() {
        this.props.changeText(this.props.todo.id, this.state.input)
        this.setState({
            isChanged: false
        })
    }

    render() {
        const done = this.props.todo.completed ? 'done' : '';
        return (
            <li className={`todo_item ${done}`}>
                <span className='state' onClick={this.props.changeComplete.bind(null, this.props.todo.id)}/>
                { this.state.isChanged ? (
                        <input value={this.state.input} 
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                        />
                    ) : (
                        <input readOnly 
                            value={this.state.input} 
                            onChange={this.handleChange} 
                            onDoubleClick={this.handleDoubleClick}
                        />
                    )
                }
                
                <button className="delete" onClick={this.props.removeTodo.bind(null, this.props.todo.id)}> &times;</button>
            </li>
        )
    }
}

// TodoItem.propTypes = {
//     todo : PropTypes.object.isRequired,
//     changeState : PropTypes.func.isRequired,
// }

export {TodoItem}