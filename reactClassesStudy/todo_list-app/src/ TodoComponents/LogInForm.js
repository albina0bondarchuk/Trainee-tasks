import {Component} from 'react'
import { LogInInput } from './LogInInput'

export class LogInForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            login: '',
            password: '',
            errorMessage: '',
        }

        this.handleUserInput = this.handleUserInput.bind(this)
        this.errorMessageCreate = this.errorMessageCreate.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    errorMessageCreate(text) {
        this.setState({errorMessage: text})
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.login === 'Vasil' && this.state.password === 'qwerty') {
            this.props.completeAuthorization()
        } else {
            this.errorMessageCreate('incorrect login or password')
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <LogInInput
                    inputName = 'login'
                    inputType = 'text'
                    handleUserInput = {this.handleUserInput}
                    errorMessageCreate = {this.errorMessageCreate}
                />
                <LogInInput
                    inputName = 'password'
                    inputType = 'password'
                    handleUserInput = {this.handleUserInput}
                    errorMessageCreate = {this.errorMessageCreate}
                /> 

                <span className='message_box'>{this.state.errorMessage}</span>

                { this.state.login && this.state.password ? (
                    <button type="submit" className='login_submit'>Submit</button>
                    ) : (
                        <button type="submit" disabled className='login_submit'>Submit</button>
                    )
                }
                
            </form>
        )
    }
}