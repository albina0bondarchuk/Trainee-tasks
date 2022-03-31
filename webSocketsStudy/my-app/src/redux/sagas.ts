import {call, put, all, takeEvery, fork, apply, take, ActionPattern} from 'redux-saga/effects'
import axios from 'axios'
import { addTodo, changeComplete, changeText, getTodos, removeTodo } from './todosActions'
import { failedAuthorization, successAuthorization } from './loginActions'
import { loginUrl, todosUrl } from '../url'
import { LoginTypes } from '../types/login'
import { ITodo, TodoTypes } from '../types/todos'
import {io} from 'socket.io-client'
import { eventChannel } from 'redux-saga'
import { emit } from 'process'

interface ResponseGenerator{
    config?:any,
    data?:any,
    headers?:any,
    request?:any,
    status?:number,
    statusText?:string
}

const socket = io("ws://localhost:8000");

function createSocketChannel() {
    return eventChannel(emit => {
        socket.on('sendToken', result => emit(result))

        socket.on('sendTodosArray', todos => emit(JSON.parse(todos))) 

        socket.on('sendId', id => emit(id))

        const unsubscribe = () => {
            socket.off('sendToken', result => emit(result))
            socket.off('sendTodosArray', todos => emit(JSON.parse(todos)))
            socket.off('sendId', id => emit(id))
        }
      
        return unsubscribe
    })
}

export function* sagaWatcher() {
    yield all([
        onAuthorizationStart(), 
        onAddTodoStart(), 
        onDeleteTodoStart(),
        onChangeCompletedStart(),
        onChangeTextStart()
    ])
}

function* onAuthorizationStart() {
    yield takeEvery(LoginTypes.AUTHORIZATION, authorizationWorker)
}

function* authorizationWorker({payload: {login, password}} : {type: typeof LoginTypes.AUTHORIZATION, payload:{login:string, password:string}}) {
    const socketChannel:ResponseGenerator = yield call(createSocketChannel)

    try {
        yield fork(postLogin, {login, password})
        const token:ResponseGenerator = yield take(socketChannel as ActionPattern)
        if (token) {
            localStorage.setItem('token', token as string)
            yield call(getTodosWorker)
            yield put(successAuthorization())
        } else {
            yield put(failedAuthorization())
        }
    } catch(err) {
        console.error('socket error:', err)
    }
}

function* postLogin({login,password}: {login:string, password:string}) {
    yield apply(socket, socket.emit, ['postLogin', JSON.stringify({login, password})]) // 
}


function* getTodosWorker() {
    const socketChannel:ResponseGenerator = yield call(createSocketChannel)

    try {
        yield fork(sendTodos)
        const todos:ResponseGenerator = yield take(socketChannel as ActionPattern)

        yield put(getTodos(todos as ITodo[]))
    } catch(err) {
        console.error('socket error:', err)
    }
}

function* sendTodos() {
    const token = localStorage.getItem('token')
    yield apply(socket, socket.emit, ['getTodos', token]) // 
}

function* onAddTodoStart() {
    yield takeEvery(TodoTypes.ASYNC_ADD_TODO, addTodoWorker)
}

function* addTodoWorker({payload: {text}} : {type: typeof TodoTypes.ASYNC_ADD_TODO, payload:{text:string}}) {
    const socketChannel:ResponseGenerator = yield call(createSocketChannel)

    try {
        yield fork(postTodo, text)
        const id:ResponseGenerator = yield take(socketChannel as ActionPattern)

        yield put(addTodo(text, id as string))
    } catch(err) {
        console.error('socket error:', err)
    }
}

function* postTodo(text: string) {
    const token = localStorage.getItem('token')
    yield apply(socket, socket.emit, ['postTodo', {token, text}]) 
}

function* onDeleteTodoStart() {
    yield takeEvery(TodoTypes.ASYNC_DELETE_TODO, deleteTodoWorker)
}

function* deleteTodoWorker({payload: {id}}: {type: typeof TodoTypes.ASYNC_DELETE_TODO, payload:{id:string}}) {
    yield fork(deleteTodo, id)
    yield put(removeTodo(id))
}

function* deleteTodo(id: string) {
    yield apply(socket, socket.emit, ['deleteTodo', id])
}

function* onChangeCompletedStart() {
    yield takeEvery(TodoTypes.ASYNC_CHANGE_COMPLETE, changeCompletedWorker)
}

function* changeCompletedWorker({payload: {id, text, completed}} :{type: typeof TodoTypes.ASYNC_CHANGE_COMPLETE, payload: {id:string, text:string, completed:string}} ) {
    yield fork(patchTodos, id, text, completed)
    yield put(changeComplete(id))
}

function* onChangeTextStart() {
    yield takeEvery(TodoTypes.ASYNC_CHANGE_TEXT, changeTextWorker)
}

function* changeTextWorker({payload: {id, text, completed}}:{type: typeof TodoTypes.ASYNC_CHANGE_TEXT, payload: {id:string, text:string, completed:string}}) {
    yield fork(patchTodos, id, text, completed)
    yield put(changeText(id, text))
}

function* patchTodos(id: string, text: string, completed:string | boolean) {
    yield apply(socket, socket.emit, ['patchTodo', {id, text, completed}])
}