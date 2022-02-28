import {Component} from 'react'
import {TodoContainer} from './ TodoComponents/TodoContainer'
import {TodoStatistic} from './ TodoComponents/TodoStatistic'
import {LogInContainer} from './ TodoComponents/LogInContainer'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authorization: false,
      todos: [
        {id: 1, text: 'react.js', completed: true},
        {id: 2, text: 'node.js', completed: false},
        {id: 3, text: 'html', completed: false},
      ],
      filter: 'all'
    }

    this.completeAuthorization = this.completeAuthorization.bind(this)

    this.addTodo = this.addTodo.bind(this)
    this.changeComplete = this.changeComplete.bind(this)
    this.changeText = this.changeText.bind(this)
    this.removeTodo = this.removeTodo.bind(this)
    this.filterTodos = this.filterTodos.bind(this)
  } 


  completeAuthorization() {
    this.setState({
        authorization:true
    })
  }
  
  addTodo(text) {
    this.setState({
      todos: [
        ...this.state.todos,
        {
          id: Date.now(),
          text,
          completed: false
        }
      ]
    })
  }

  changeComplete(id) {
    this.setState(
      this.state.todos.map(todo => {
        if(todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  changeText(id, value) {
    this.setState(
      this.state.todos.map(todo => {
        if(todo.id === id) {
          todo.text = value
        }
        return todo
      })
    )
  }

  removeTodo(id) {
    this.setState( {
      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }

  filterTodos(filter) {
    this.setState({
      filter
    })
  }

  render() {
    if (this.state.authorization) {
      return (
        <div className='container'>
          <TodoContainer 
            todos = {this.state.todos}
            filter = {this.state.filter}
            addTodo = {this.addTodo}
            changeComplete = {this.changeComplete}
            changeText = {this.changeText}
            removeTodo = {this.removeTodo}
          />
          <TodoStatistic 
            todos = {this.state.todos}
            filter = {this.state.filter}
            filterTodos = {this.filterTodos}
          /> 
        </div>
      )
    } else {
      return (
        <div className='container'>
          <LogInContainer
            completeAuthorization = {this.completeAuthorization}
          /> 
        </div>
      )
    }
  }
}

export default App;
