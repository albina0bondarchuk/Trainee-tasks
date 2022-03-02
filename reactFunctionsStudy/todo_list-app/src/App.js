import {useState, useEffect} from 'react'
import axios from 'axios' 
import {Context} from './context'
import {TodoContainer} from './ TodoComponents/TodoContainer'
import {TodoStatistic} from './ TodoComponents/TodoStatistic'
import {LogInContainer} from './ TodoComponents/LogInContainer'


function App() {
  const [authorization, setAuthorization] = useState(false);
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all')

  useEffect(()=>{
    localStorage.clear()
  }, [])

  useEffect(()=>{
    getTodos()
  }, [authorization])

  async function completeAuthorization(login, password, callback) {
    const res = await axios.post('http://localhost:8000/login', {
          login: login,
          password: password
      }, {
        headers: {
          'Content-type': 'application/json;charset=utf-8',
          'Accept': 'application/json',
        }
      }
    )

    if (res.headers.autorization) {
      localStorage.setItem('token', res.headers.autorization);
      setAuthorization(!!res.headers.autorization) 
    } else { 
      callback()
    }
  }

  async function getTodos() {
    let token = localStorage.getItem('token')
    const res = await axios('http://localhost:8000/todos', {
        headers: {
            'Authorization': `${token}`
        }
    })

    setTodos(res.data);
    
  }

  async function patchTodos(id, text, completed) {
    const res = await axios.patch('http://localhost:8000/todos', {
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
  
  async function addTodo(text) {
    let token = localStorage.getItem('authorization')
    await axios.post('http://localhost:8000/todos',{
        text: text
      }, {
        headers: {
            'Content-type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            'Authorization': `${token}`
        }
    })

    setTodos([
      ...todos,
      {
        _id: Date.now(),
        text,
        completed: false
      }
    ])
  }

  function changeComplete(id) {
    setTodos(
      todos.map(todo => {
        if(todo._id === id) {
          todo.completed = todo.completed === 'true' ? 'false' : 'true'
        }
        return todo
      })
    )
  }

  function changeText(id, value) {
    setTodos(
      todos.map(todo => {
        if(todo._id === id) {
          todo.text = value
        }
        return todo
      })
    )
  }

  async function removeTodo(id) {
    await axios.delete('http://localhost:8000/todos', {
        id: id
      }, {
          headers: {
              'Content-type': 'application/json;charset=utf-8',
              'Accept': 'application/json',
          }
    })
    
    setTodos(
      todos.filter(todo => todo._id !== id)
    )
  }

  function filterTodos(filter) {
    setFilter(filter)
  }

  let content = authorization ?  (
    <Context.Provider value={{
      patchTodos, changeComplete, changeText, removeTodo, addTodo, filterTodos
    }}>
      <div className='container'>
        <TodoContainer 
          todos = {todos}
          filter = {filter}
        />
        <TodoStatistic 
          todos = {todos}
          filter = {filter}
        /> 
    </div>
    </Context.Provider>
    
  ) : (
    <Context.Provider value={{completeAuthorization}}>
      <div className='container'>
        <LogInContainer/> 
      </div>
    </Context.Provider>
  )
  
  return content
}


export default App;
