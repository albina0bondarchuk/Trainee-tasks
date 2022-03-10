import {useState, useContext, useEffect} from 'react'
import { connect } from 'react-redux'
import { Context } from '../context'
import LogInInput from './LogInInput'
import { saveInput, authorization } from '../redux/actions'

function LogInForm( { authorizationData, validationError, saveInput, authorization} ) {
    function handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        saveInput(name, value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        authorization(authorizationData.login, authorizationData.password)
    }

    return (
        <form onSubmit={handleSubmit}>
            <LogInInput
                inputName = 'login'
                inputType = 'text'
                handleUserInput = {handleUserInput}
            />
            <LogInInput
                inputName = 'password'
                inputType = 'password'
                handleUserInput = {handleUserInput}
            /> 

            <span className='message_box'>{validationError}</span>

            { authorizationData.login && authorizationData.password ? (
                <button type="submit" className='login_submit'>Submit</button>
                ) : (
                    <button type="submit" disabled className='login_submit'>Submit</button>
                )
            }
            
        </form>
    )
}


const mapStatetoProps = state => ({
    authorizationData: state.login.authorizationData,
    validationError: state.login.validationError
})

const mapDispatchToProps = {
    saveInput,
    authorization,
}

export default connect(mapStatetoProps, mapDispatchToProps)(LogInForm)