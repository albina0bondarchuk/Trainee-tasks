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
            });
            this.props.errorMessageCreate('all fields must be filled')
        } else {
            this.setState({
                isEmpty: false
            });
            this.props.changeValue(e)
            this.props.errorMessageCreate('')
        }
    }

    render() {
        let classList;  
        this.state.isEmpty ? classList = 'empty' : classList = ''
        return(
            <input 
                onBlur={this.handleBlur}
                id={this.props.inputName} 
                className = {classList}
                placeholder={this.props.inputName} 
            />
        )
    }
}