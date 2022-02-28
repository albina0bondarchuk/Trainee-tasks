import { Component } from "react";


export class LogInInput extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isEmpty: false
        }

        this.handleBlur = this.handleBlur.bind(this)
    }

    handleBlur(e) {
        if (!e.target.value) {
            this.setState({
                isEmpty: true
            }, ()=> {
                this.props.errorMessageCreate('all fields must be filled')
            });
        } else {
            this.setState({
                isEmpty: false
            },()=> {
                this.props.errorMessageCreate('')
            });
        }
    }

    render() {
        const classList = this.state.isEmpty ? 'empty' : ''
        return(
            <input 
                onChange = {this.props.handleUserInput}
                onBlur = {this.handleBlur}
                id = {this.props.inputName} 
                type = {this.props.inputType}
                name = {this.props.inputName} 
                placeholder = {this.props.inputName} 
                className = {classList}
            />
        )
    }
}