import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import {Field, FormikProvider, useFormik} from 'formik'
import * as Yup from 'yup';
import { authorization } from '../redux/loginActions'; 
import { useTypedSelector } from '../hooks/useTypedSelector';

interface styledProps {
    bordercolor: string
}

interface FormValues {
    login: string,
    password: string,
}

const LogInForm: React.FC = () => {
    const dispatch = useDispatch()
    const authorizationError = useTypedSelector(state => state.login.authorizationError)
    const initialValues: FormValues = {
        login: '',
        password: '',
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            login: Yup.string().required('all fields must be filled'),
            password: Yup.string().required('all fields must be filled')
        }),
        onSubmit: values => {
            dispatch(authorization(values.login, values.password))
        }
    })

    return (
        <FormikProvider value={formik}>
            <LoginForm onSubmit={formik.handleSubmit}>
                <StyledField
                    name = 'login'
                    type = 'text'
                    placeholder = 'login'
                    value = {formik.values.login}
                    bordercolor = {formik.errors.login ? 'red' : 'rgba(131,58,180,1)'}
                />
                <StyledField
                    name = 'password'
                    type = 'password'
                    placehoder = 'password'
                    value = {formik.values.password}
                    bordercolor = {formik.errors.password ? 'red' : 'rgba(131,58,180,1)'}
                /> 

                <MessageBox>{ formik.errors.login || formik.errors.password || authorizationError || ''}</MessageBox>

                { formik.isValid ? 
                    <LoginSubmit type="submit">Submit</LoginSubmit> : 
                    <LoginSubmit type="submit" disabled>Submit</LoginSubmit>
                }
                
            </LoginForm>
        </FormikProvider>
    )
}


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

const StyledField = styled(Field)<styledProps>`
    border: 1px solid ${props => props.bordercolor};
    height: 30px;
    min-width: 200px;
    border-radius: 7px;
    padding: 5px;

    &:first-child {
        margin-bottom: 20px;
    }
` 

export default LogInForm