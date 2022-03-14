import { useDispatch } from "react-redux";
import styled from "styled-components";


const LoginInput = styled.input.attrs(props => ({
    type: props.type,
    name: props.name,
    placeholder: props.placeholder
}))`
    border: 1px solid ${props => props.borderColor};
    height: 30px;
    min-width: 200px;
    border-radius: 7px;
    padding: 5px;

    &:first-child {
        margin-bottom: 20px;
    }
`

export default function LogInInput({inputName, inputType, handleChange, handleBlur, value, isEmpty}) {
    return(
        <LoginInput 
            borderColor = {isEmpty ? 'red' : 'rgba(131,58,180,1)'}
            onChange = {handleChange}
            onBlur = {handleBlur} 
            type = {inputType}
            name = {inputName} 
            placeholder = {inputName} 
            value = {value}
        />
    )
}
