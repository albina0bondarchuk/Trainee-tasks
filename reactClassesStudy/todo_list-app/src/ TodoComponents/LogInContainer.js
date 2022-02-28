import {Component} from 'react'
import {LogInForm} from './LogInForm'

export class LogInContainer extends Component {
    render() {
        return (
            <div className="login_container">
                <h1 className='login_heading'>Sign in</h1>
                <LogInForm 
                    completeAuthorization = {this.props.completeAuthorization}
                />
            </div>
        )
    }
}