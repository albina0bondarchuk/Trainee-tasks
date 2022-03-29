import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from './hooks/useTypedSelector';
import LogInContainer from './components/LogInContainer';
import TodoContainer from './components/TodoContainer';
import TodoStatistic from './components/TodoStatistic';



const App: React.FC = () => {
  const isSuccess = useTypedSelector(state => state.login.isSuccess)

  useEffect(()=>{
    localStorage.clear()
  }, [])
  
  return (
    <Container>
      {
        !isSuccess ? 
        <LogInContainer/> :
        <>
          <TodoContainer />
          <TodoStatistic /> 
        </>
      }
    </Container>
  )
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`

export default App;
