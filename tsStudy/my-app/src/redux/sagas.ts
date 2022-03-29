import {call, put, all, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import { addTodo, changeComplete, changeText, getTodos, removeTodo } from './todosActions'
import { failedAuthorization, successAuthorization } from './loginActions'
import { loginUrl, todosUrl } from '../url'
import { LoginTypes } from '../types/login'
import { ITodo, TodoTypes } from '../types/todos'

interface ResponseGenerator{
    config?:any,
    data?:any,
    headers?:any,
    request?:any,
    status?:number,
    statusText?:string
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
    yield takeEvery(LoginTypes.AUTHORIZATION as any, authorizationWorker)
}

function* authorizationWorker({payload: {login, password}} : {payload:{login:string, password:string}}) {
    const token:ResponseGenerator = yield postUserSaga(login, password)

    if (token) {
        localStorage.setItem('token', token as string)
        yield call(getTodosWorker)
        yield put(successAuthorization())
        
    } else {
        yield put(failedAuthorization())
    }
}

async function postUserSaga(login: string, password: string) {
    const res = await axios.post<string>(loginUrl, {
            login: login,
            password: password
        }, {
        headers: {
            'Content-type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
        }
        })

        return res.headers.authorization
}

function* getTodosWorker() {
    const data:ResponseGenerator = yield call(getTodosSaga)
    yield put(getTodos(data as ITodo[]))
}

async function getTodosSaga() {
    let token = localStorage.getItem('token')
    const res = await axios(todosUrl, {
        headers: {
            'Authorization': `${token}`
        }
    })

    return res.data
}

function* onAddTodoStart() {
    yield takeEvery(TodoTypes.ASYNC_ADD_TODO  as any, addTodoWorker)
}

function* addTodoWorker({payload: {text}} : {payload:{text:string}}) {
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
    yield takeEvery(TodoTypes.ASYNC_DELETE_TODO as any, deleteTodoWorker)
}

function* deleteTodoWorker({payload: {id}}: {payload:{id:string}}) {
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
    yield takeEvery(TodoTypes.ASYNC_CHANGE_COMPLETE as any, changeCompletedWorker)
}

function* changeCompletedWorker({payload: {id, text, completed}} :{payload: {id:string, text:string, completed:string}} ) {
    yield patchTodos(id, text, completed)
    yield put(changeComplete(id))
}

function* onChangeTextStart() {
    yield takeEvery(TodoTypes.ASYNC_CHANGE_TEXT as any, changeTextWorker)
}

function* changeTextWorker({payload: {id, text, completed}}:{payload: {id:string, text:string, completed:string}}) {
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