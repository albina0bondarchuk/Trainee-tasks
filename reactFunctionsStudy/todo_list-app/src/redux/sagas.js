import {call, put, all, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import { addTodo, changeComplete, changeText, failedAuthorization, getTodos, removeTodo, successAuthorization } from './actions'
import { ASYNC_ADD_TODO, AUTHORIZATION, ASYNC_DELETE_TODO, ASYNC_CHANGE_COMPLETE, ASYNC_CHANGE_TEXT } from './types'
import { loginUrl, todosUrl } from '../url'

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
    yield takeEvery(AUTHORIZATION, authorizationWorker)
}

function* authorizationWorker({payload: {login, password}}) {
    const token = yield postUserSaga(login, password)

    if (token) {
        localStorage.setItem('token', token)
        yield call(getTodosWorker)
        yield put(successAuthorization())
        
    } else {
        yield put(failedAuthorization())
    }
}

async function postUserSaga(login, password) {
    const res = await axios.post(loginUrl, {
            login: login,
            password: password
        }, {
        headers: {
            'Content-type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
        }
        })

        return res.headers.autorization
}

function* getTodosWorker() {
    const data = yield call(getTodosSaga)
    yield put(getTodos(data))
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
    yield takeEvery(ASYNC_ADD_TODO, addTodoWorker)
}

function* addTodoWorker({payload: {text}}) {
    yield postTodoSaga(text)
    yield put(addTodo(text))
}

async function postTodoSaga(text) {
    let token = localStorage.getItem('token')
 
    await axios.post(todosUrl,{
        text: text
      }, {
        headers: {
            'Content-type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            'Authorization': token
        }
    })
}

function* onDeleteTodoStart() {
    yield takeEvery(ASYNC_DELETE_TODO, deleteTodoWorker)
}

function* deleteTodoWorker({payload: {id}}) {
    yield deleteTodoSaga(id)
    yield put(removeTodo(id))
}

async function deleteTodoSaga(id) {
    await axios.delete(todosUrl, {
        data: {
          id: id
        }
      }, {
          headers: {
              'Content-type': 'application/json;charset=utf-8',
              'Accept': 'application/json',
          }
    })
}

function* onChangeCompletedStart() {
    yield takeEvery(ASYNC_CHANGE_COMPLETE, changeCompletedWorker)
}

function* changeCompletedWorker({payload: {id, text, completed}}) {
    yield patchTodos(id, text, completed)
    yield put(changeComplete(id))
}

function* onChangeTextStart() {
    yield takeEvery(ASYNC_CHANGE_TEXT, changeTextWorker)
}

function* changeTextWorker({payload: {id, text, completed}}) {
    yield patchTodos(id, text, completed)
    yield put(changeText(id, text))
}

async function patchTodos(id, text, completed) {
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