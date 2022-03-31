import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {applyMiddleware, compose, createStore} from 'redux'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import reportWebVitals from './reportWebVitals';
import { rootReducer } from './redux/rootReducer';
import { sagaWatcher } from './redux/sagas';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, compose(
  applyMiddleware(sagaMiddleware),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
))

sagaMiddleware.run(sagaWatcher)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
