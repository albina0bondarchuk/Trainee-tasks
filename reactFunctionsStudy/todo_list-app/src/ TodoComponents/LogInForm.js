import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {useFormik} from 'formik'
import * as Yup from 'yup';
import LogInInput from './LogInInput'
import { authorization } from '../redux/actions'


const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const MessageBox = styled.span`
    color: red;
    margin: 10px;
    font-size: 14px;
`

const LoginSubmit = styled.button`
    border: 1px solid rgba(131,58,180,1);
    background: none;
    color: rgb(175, 107, 214);
    border-radius: 7px;
    padding: 10px 25px;
    margin-top: 30px;

    &:hover {
        background-color: rgba(131,58,180,1);
        color: #fff;
    }

    &:disabled {
        border: 1px solid rgba(131,58,180,1);
        background: none;
        color: rgb(175, 107, 214)
    }
`

export default function LogInForm() {
    const dispatch = useDispatch()
    const isSuccess = useSelector(state => state.login.isSuccess)

    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',
        },
        validationSchema: Yup.object({
            login: Yup.string().required('all fields must be filled'),
            password: Yup.string().required('all fields must be filled')
        }),
        onSubmit: values => {
            dispatch(authorization(values.login, values.password))
        }
    })

    const authorizationData = useSelector(state => state.login.authorizationData)
    const validationError = useSelector(state => state.login.validationError) 

    return (
        <LoginForm onSubmit={formik.handleSubmit}>
            <LogInInput
                inputName = 'login'
                inputType = 'text'
                handleChange = {formik.handleChange}
                handleBlur = {formik.handleBlur}
                value = {formik.values.login}
                isEmpty = {!!formik.errors.login}
            />
            <LogInInput
                inputName = 'password'
                inputType = 'password'
                handleChange = {formik.handleChange}
                handleBlur = {formik.handleBlur}
                value = {formik.values.password}
                isEmpty = {!!formik.errors.password}
            /> 

            <MessageBox>{ formik.errors.login || formik.errors.password || '' }</MessageBox>

            { formik.isValid ? 
                <LoginSubmit type="submit">Submit</LoginSubmit> : 
                <LoginSubmit type="submit" disabled>Submit</LoginSubmit>
            }
            
        </LoginForm>
    )
}