import {useState, useEffect} from 'react'
import axios from 'axios' 
import { connect } from 'react-redux'
import {Context} from './context'
import {TodoContainer} from './ TodoComponents/TodoContainer'
import TodoStatistic from './ TodoComponents/TodoStatistic'
import {LogInContainer} from './ TodoComponents/LogInContainer'
import{ getTodos} from './redux/actions'


function App({ getTodos, isSuccess }) {

  useEffect(()=>{
    localStorage.clear()
  }, [])

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
  
  async function postTodo(text) {
    let token = localStorage.getItem('token')
 
    await axios.post('http://localhost:8000/todos',{
        text: text
      }, {
        headers: {
            'Content-type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            'Authorization': token
        }
    })
  }

  async function deleteTodo(id) {
    const res = await axios.delete('http://localhost:8000/todos', {
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

  // let content = authorization ?  (
  //   <Context.Provider value={{
  //     patchTodos, deleteTodo, postTodo
  //   }}>
  //     <div className='container'>
  //       <TodoContainer />
  //       <TodoStatistic /> 
  //   </div>
  //   </Context.Provider>
    
  // ) : (
  //   <Context.Provider value={{completeAuthorization}}>
  //     <div className='container'>
  //       <LogInContainer/> 
  //     </div>
  //   </Context.Provider>
  // )
  
  return (
    <div className='container'>
      {
        !isSuccess ? 
        <LogInContainer/> :
        <div>
          <TodoContainer />
          <TodoStatistic /> 
        </div>
      }
    </div>
  )
}

const mapStatetoProps = state => ({
  isSuccess: state.login.isSuccess
})

const mapDispatchToProps = {
  getTodos
}

export default connect(mapStatetoProps, mapDispatchToProps)(App);
