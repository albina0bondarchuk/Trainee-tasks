export enum TodoTypes {
    ADD_TODO = 'TODO/ADD_TODO',
    ASYNC_ADD_TODO = 'TODO/ASYNC_ADD_TODO',
    CHANGE_COMPLETE = 'TODO/CHANGE_COMPLETE',
    ASYNC_CHANGE_COMPLETE = 'TODO/ASYNC_CHANGE_COMPLETE',
    CHANGE_TEXT = 'TODO/CHANGE_TEXT',
    ASYNC_CHANGE_TEXT = 'TODO/ASYNC_CHANGE_TEXT',
    REMOVE_TODO = 'TODO/REMOVE_TODO',
    ASYNC_DELETE_TODO = 'TODO/ASYNC_DELETE_TODO',
    FILTER_TODO = 'TODO/FILTER_TODO',
    GET_TODOS = 'TODO/GET_TODOS'
}

export interface ITodo {
    _id: string,
    text: string,
    completed: string | boolean
}

export interface TodoState {
    todos: ITodo[],
    filter: string;
}

interface AddTodoAction {
    type: TodoTypes.ADD_TODO,
    payload: {
        id: string,
        text: string
    }
}

interface ChangeCompleteAction {
    type: TodoTypes.CHANGE_COMPLETE,
    payload: {
        id: string
    }
}

interface ChangeTextAction {
    type: TodoTypes.CHANGE_TEXT,
    payload: {
        id: string,
        text: string
    }
}

interface RemoveTodoAction {
    type: TodoTypes.REMOVE_TODO;
    payload: {
        id: string
    }
}

interface FilterTodoAction {
    type: TodoTypes.FILTER_TODO;
    payload: {
        filter: Filters.all | Filters.active | Filters.completed
    }
}


interface GetTodosAction {
    type: TodoTypes.GET_TODOS,
    payload: {
        todos: ITodo[]
    }
}

export type TodoAction = AddTodoAction | ChangeCompleteAction | ChangeTextAction | ChangeTextAction | RemoveTodoAction | FilterTodoAction | GetTodosAction

export enum Filters {
    all = 'all',
    active = 'active',
    completed = 'completed'
} 