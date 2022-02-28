import {Component} from 'react'
import { LogInInput } from './LogInInput'

export class LogInForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            authorizationData: {
                login: '',
                password: ''
            },
            errorMessage:'',
        }

        this.changeLogin = this.changeLogin.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.errorMessageCreate = this.errorMessageCreate.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    changeLogin(e) {
        this.setState({
            authorizationData: {
                ...this.state.authorizationData,
                login: e.target.value,
            }
        })
        console.log(this.state);
    }

    changePassword(e) {
        this.setState({
            authorizationData: {
                ...this.state.authorizationData,
                password: e.target.value
            }
        })
        console.log(this.state);
    }

    errorMessageCreate(message) {
        this.setState({
            errorMessage: message
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.authorizationData.name === 'vasil' && this.state.authorizationData.password === 'qwerty') {
            this.props.completeAuthorization()
        } 
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <LogInInput
                    inputName = 'login'
                    changeValue = {this.changeLogin}
                    errorMessageCreate = {this.errorMessageCreate}
                />
                <LogInInput
                    inputName = 'password'
                    changeValue = {this.changePassword}
                    errorMessageCreate = {this.errorMessageCreate}
                />
                <span className='message_box'>{this.state.errorMessage}</span>
                <button type="submit" className='login_submit'>Submit</button>
            </form>
        )
    }
}