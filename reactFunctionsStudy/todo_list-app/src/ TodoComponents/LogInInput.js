import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { emptyInput } from "../redux/actions";


function LogInInput({inputName, inputType, handleUserInput, emptyInput}) {
    const [isEmpty, setIsEmty] = useState(false) 

    useEffect(()=>{
        if (isEmpty) {
            emptyInput()
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

const mapDispatchToProps = {
    emptyInput,
}

export default connect(null, mapDispatchToProps)(LogInInput)