import { useState, useEffect } from "react";


export function LogInInput({inputName, inputType, handleUserInput, errorMessageCreate}) {
    const [isEmpty, setIsEmty] = useState(false) 

    useEffect((e)=>{
        if (isEmpty) {
            errorMessageCreate('all fields must be filled')
        } else {
            errorMessageCreate('')
        }
    }, [isEmpty])

    function handleBlur(e) {
        !e.target.value ?
            setIsEmty(true):
            setIsEmty(false)
    }

    const classList = isEmpty ? 'empty' : ''
    return(
        <input 
            onChange = {handleUserInput}
            onBlur = {handleBlur}
            id = {inputName} 
            type = {inputType}
            name = {inputName} 
            placeholder = {inputName} 
            className = {classList}
        />
    )
}