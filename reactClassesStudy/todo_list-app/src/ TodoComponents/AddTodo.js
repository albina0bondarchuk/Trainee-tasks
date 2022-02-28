import {Component} from 'react'

export class AddTodo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            input: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handlerSubmit = this.handlerSubmit.bind(this)
    } 

    
    handleChange(e) {
        this.setState({
            input: e.target.value
        })
    }

    handlerSubmit(e) {
        e.preventDefault();

        if (this.state.input.trim()) {
            this.props.addTodo(this.state.input);
            this.setState({
                input: ''
            })
        } 
    }

    render(){
        return (
            <form onSubmit={this.handlerSubmit}>
                <input id="addInput" onChange={this.handleChange} value={this.state.input}/>
                <button className="todo_add" type="submit">Add todo</button>
            </form>
        )
    }
}