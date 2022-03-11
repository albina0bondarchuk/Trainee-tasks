import { useEffect } from 'react'
import axios from 'axios' 
import { connect } from 'react-redux'
import {TodoContainer} from './ TodoComponents/TodoContainer'
import TodoStatistic from './ TodoComponents/TodoStatistic'
import {LogInContainer} from './ TodoComponents/LogInContainer'
import{ getTodos} from './redux/actions'


function App({ isSuccess }) {

  useEffect(()=>{
    localStorage.clear()
  }, [])
  
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
  
}

export default connect(mapStatetoProps, mapDispatchToProps)(App);
