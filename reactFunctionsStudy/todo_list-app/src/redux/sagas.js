import {call, put, all, takeEvery} from 'redux-saga/effects'
import axios from 'axios'
import { failedAuthorization, getTodos, successAuthorization } from './actions'
import { AUTHORIZATION, GET_TODOS } from './types'

export function* sagaWatcher() {
    yield all([
        call(onAuthorizationStart),
        // call(onRegisterSuccess),
      ]);
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
    const res = await axios.post('http://localhost:8000/login', {
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
    const res = await axios('http://localhost:8000/todos', {
        headers: {
            'Authorization': `${token}`
        }
    })

    return res.data
}