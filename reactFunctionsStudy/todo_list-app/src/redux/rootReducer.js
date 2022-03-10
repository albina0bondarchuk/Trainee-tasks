import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { todosReducer } from "./todosReducer";

export const rootReducer = combineReducers({
    todos: todosReducer,
    login: loginReducer
})