import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { paginationReducer } from "./paginationReducer";
import { todosReducer } from "./todosReducer";

export const rootReducer = combineReducers({
    todos: todosReducer,
    login: loginReducer,
    pagination: paginationReducer
})

export type RootState = ReturnType<typeof rootReducer> 