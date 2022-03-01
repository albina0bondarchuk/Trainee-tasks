import {useState} from 'react'
import {Context} from './context'
import {TodoContainer} from './ TodoComponents/TodoContainer'
import {TodoStatistic} from './ TodoComponents/TodoStatistic'
import {LogInContainer} from './ TodoComponents/LogInContainer'


function App() {
  const [authorization, setAuthorization] = useState(false);
  const [todos, setTodos] = useState([
    {id: 1, text: 'react.js', completed: true},
    {id: 2, text: 'node.js', completed: false},
    {id: 3, text: 'html', completed: false},
  ]);
  const [filter, setFilter] = useState('all')


  function completeAuthorization() {
    setAuthorization(true)
  }
  
  function addTodo(text) {
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text,
        completed: false
      }
    ])
  }

  function changeComplete(id) {
    setTodos(
      todos.map(todo => {
        if(todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  function changeText(id, value) {
    setTodos(
      todos.map(todo => {
        if(todo.id === id) {
          todo.text = value
        }
        return todo
      })
    )
  }

  function removeTodo(id) {
    setTodos(
      todos.filter(todo => todo.id !== id)
    )
  }

  function filterTodos(filter) {
    setFilter(filter)
  }

  let content = authorization ?  (
    <Context.Provider value={{
      changeComplete, changeText, removeTodo, addTodo, filterTodos
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
