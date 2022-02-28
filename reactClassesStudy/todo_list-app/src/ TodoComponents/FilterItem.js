import {Component} from "react";

export class FilterItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: this.props.filter,
        }
    }


    render() {
        const classList = this.state.name === this.props.active ? 'active' : ''
        return (
            <p className={classList} onClick={this.props.filterTodos.bind(null, this.state.name)}>{this.state.name}</p>
        )
    }
}