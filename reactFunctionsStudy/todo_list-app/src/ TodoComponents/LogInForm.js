import {useState, useContext, useEffect} from 'react'
import { Context } from '../context'
import { LogInInput } from './LogInInput'

export function LogInForm() {
    const [authorization, setAuthorization] = useState({
        login: '',
        password: ''
    })
    const [errorMessage, setErrorMessage] = useState('')

    const {completeAuthorization} = useContext(Context)

    function handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        setAuthorization({
            ...authorization,
            [name]: value
        });
    }

    function errorMessageCreate(text) {
        setErrorMessage(text)
    }

    function handleSubmit(e) {
        e.preventDefault();
        completeAuthorization(authorization.login, authorization.password, () => {
            errorMessageCreate('incorrect login or password'); 
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <LogInInput
                inputName = 'login'
                inputType = 'text'
                handleUserInput = {handleUserInput}
                errorMessageCreate = {errorMessageCreate}
            />
            <LogInInput
                inputName = 'password'
                inputType = 'password'
                handleUserInput = {handleUserInput}
                errorMessageCreate = {errorMessageCreate}
            /> 

            <span className='message_box'>{errorMessage}</span>

            { authorization.login && authorization.password ? (
                <button type="submit" className='login_submit'>Submit</button>
                ) : (
                    <button type="submit" disabled className='login_submit'>Submit</button>
                )
            }
            
        </form>
    )
}