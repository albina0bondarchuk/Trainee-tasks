import styled from 'styled-components'
import LogInForm from './LogInForm'


const LogInContainer: React.FC = () => {
    return (
        <LoginContainer>
            <LoginHeading>Sign in</LoginHeading>
            <LogInForm/>
        </LoginContainer>
    )
}


const LoginContainer = styled.div`
    width: 400px;
    margin: 40px auto 20px;
    border-radius: 20px;
    background-color: #fff;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LoginHeading = styled.h1`
    color: rgb(38, 12, 56);
`

export default LogInContainer