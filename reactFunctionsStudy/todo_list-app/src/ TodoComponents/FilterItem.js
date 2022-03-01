import {useState, useContext} from "react";
import { Context } from "../context";

export function FilterItem({filter, active}) {
    const [name, setName] = useState(filter)
    const {filterTodos} = useContext(Context)

    const classList = name === active ? 'active' : ''
    return (
        <p 
            className={classList} 
            onClick={filterTodos.bind(null, name)}
        >{name}</p>
    )
}