import {call, put, all, takeEvery, fork} from 'redux-saga/effects'
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
    yield call(postUser, {login, password})
    yield call(afterPostUser)
}

function postUser({login,password}: {login:string, password:string}) {
    socket.emit('postLogin', JSON.stringify({login, password}));
    socket.on('sendToken', result => localStorage.setItem('token', result))
}

function * afterPostUser() {
    if(localStorage.getItem('token')) {
        yield call(getTodosWorker)
        yield put(successAuthorization())  
    } else {
        yield put(failedAuthorization())
    }
}

function* getTodosWorker() {
    let token = localStorage.getItem('token')
    socket.emit('getTodos', token);
    socket.on('sendTodosArray', todos => {
        console.log(todos);
        
        put(getTodos(JSON.parse(todos) as ITodo[]))
    }) 
}

function* onAddTodoStart() {
    yield takeEvery(TodoTypes.ASYNC_ADD_TODO, addTodoWorker)
}

function* addTodoWorker({payload: {text}} : {type: typeof TodoTypes.ASYNC_ADD_TODO, payload:{text:string}}) {
    const id:ResponseGenerator = yield postTodoSaga(text)
    yield put(addTodo(text, id as string))
}

async function postTodoSaga(text: string) {
    const token: string = localStorage.getItem('token') as string
 
    const result = await axios.post(todosUrl,{
        text: text
    }, {
        headers: {
            'Content-type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            'Authorization': token
        }
    }) as any
    return result
}

function* onDeleteTodoStart() {
    yield takeEvery(TodoTypes.ASYNC_DELETE_TODO, deleteTodoWorker)
}

function* deleteTodoWorker({payload: {id}}: {type: typeof TodoTypes.ASYNC_DELETE_TODO, payload:{id:string}}) {
    yield deleteTodoSaga(id)
    yield put(removeTodo(id))
}

async function deleteTodoSaga(id: string) {
    await axios.delete(todosUrl, {
        data: {
          id: id
        }
    // } , {
    //       headers: {
    //           'Content-type': 'application/json;charset=utf-8',
    //           'Accept': 'application/json',
    //       }
    })
}

function* onChangeCompletedStart() {
    yield takeEvery(TodoTypes.ASYNC_CHANGE_COMPLETE, changeCompletedWorker)
}

function* changeCompletedWorker({payload: {id, text, completed}} :{type: typeof TodoTypes.ASYNC_CHANGE_COMPLETE, payload: {id:string, text:string, completed:string}} ) {
    yield patchTodos(id, text, completed)
    yield put(changeComplete(id))
}

function* onChangeTextStart() {
    yield takeEvery(TodoTypes.ASYNC_CHANGE_TEXT, changeTextWorker)
}

function* changeTextWorker({payload: {id, text, completed}}:{type: typeof TodoTypes.ASYNC_CHANGE_TEXT, payload: {id:string, text:string, completed:string}}) {
    yield patchTodos(id, text, completed)
    yield put(changeText(id, text))
}

async function patchTodos(id: string, text: string, completed:string | boolean) {
    await axios.patch(todosUrl, {
        id: id,
        text: text,
        completed: completed
      }, {
          headers: {
              'Content-type': 'application/json;charset=utf-8',
              'Accept': 'application/json',
          },
    })
  }