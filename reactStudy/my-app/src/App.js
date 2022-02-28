import {useState} from 'react'
import {TodoList} from './Todo/TodoList.js'
import { AddTodo } from './Todo/AddTodo.js'
import {Context} from './context'

function App() {
  const [todos, setTodos] = useState([
    {id: 1, text: 'react.js', completed: false},
    {id: 2, text: 'node.js', completed: false},
    {id: 3, text: 'html', completed: false},
  ])

  function changeState(id) {
    setTodos(
      todos.map(todo => {
        if(todo.id === id) {
          todo.completed = !todo.completed
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

  function createItem(text) {
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: text,
        completed: false
      }
    ])
  }

  return (
    <Context.Provider value = {{
      removeTodo
    }}>
      <div className="todo_container">
        <AddTodo createItem={createItem}/>
        <TodoList 
          todos = {todos} 
          changeState = {changeState}
        />
      </div>
    </Context.Provider>
  );
}

export default App;
