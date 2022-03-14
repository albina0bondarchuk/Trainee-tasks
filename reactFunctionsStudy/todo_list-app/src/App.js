import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import TodoContainer from './ TodoComponents/TodoContainer'
import TodoStatistic from './ TodoComponents/TodoStatistic'
import LogInContainer from './ TodoComponents/LogInContainer'
import styled from 'styled-components'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`

const Todos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

function App() {
  const isSuccess = useSelector(state => state.login.isSuccess)

  useEffect(()=>{
    localStorage.clear()
  }, [])
  
  return (
    <Container>
      {
        !isSuccess ? 
        <LogInContainer/> :
        <Todos>
          <TodoContainer />
          <TodoStatistic /> 
        </Todos>
      }
    </Container>
  )
}

export default App;
