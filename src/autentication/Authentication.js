import { Button } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import LoginOrganizador from './LoginOrganizador'

const Background = styled.div`
    background-color: rgba(255,255,255,0.5);
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;

`

const Container = styled.div`
    background-color: ${props => props.register ? "#052F53" : "#007370"};
    max-width: 995px;
    margin: 10rem;
    height: 500px;
    padding: 30px;
    border-radius: 40px;
    display: flex;
    position: relative;
    flex-direction: row;
    gap: 100px;
    width: 70%;
    justify-content: space-around;
    align-items: center;
    transition: all 1s ease-in-out;
    

    & .modeChanger {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 35%;
        gap: 50px;

        
        & .MuiButtonBase-root {
            color: #000;
            padding: 5px 15px;
            background-color: #f0f4ff;
            width: 100%;
            font-family: 'Reem Kufi', sans-serif;

        }
    
    }
`

const MovingContainer = styled.div`
    background-color: #E5E5E5;
    position: absolute;
    width: 41%;
    height: 120%;
    left: 3%;
    border-radius: 30px;
    transition: all 1s ease-in-out;
`

function Authentication({showMenu}) {
    const [mode, setMode] = useState(1) // 0-> registar 1-> login jogador 2-> login organizador

    const showLoginOrganizador = () =>
        setMode(2);

    const backToLoginUser = () =>
        setMode(1);

    return (
        <Background>
            <Container register={mode === 0}>
                {mode !== 2 &&
                    <div className='modeChanger'>
                        <h2 style={{color: 'white', fontSize: '30px'}}>Possui conta?</h2>
                        <Button style={{textTransform: 'none'}} onClick={() => {
                            setMode(1)
                        }}>Entrar</Button>
                    </div>
                }
                {mode !== 2 &&
                    <div className='modeChanger'>
                        <h2 style={{color: 'white', fontSize: '30px'}}>Não possui conta?</h2>
                        <Button style={{textTransform: 'none'}} onClick={() => {
                            setMode(0)
                        }}>Registar-se</Button>
                    </div>
                }
                <MovingContainer style=
                     {(mode === 0 && {transform: "translateX(125%)"}) || (mode === 1 && {transform: null}) || (mode === 2 && {transform: "translateX(62.5%)"})}
                >
                    {mode === 0 && <RegisterForm showMenu={showMenu} setMode={backToLoginUser}/>}
                    {mode === 1 && <LoginForm showMenu={showMenu} setMode={showLoginOrganizador}/>}
                    {mode === 2 && <LoginOrganizador showMenu={showMenu} setMode={backToLoginUser}/>}
                </MovingContainer>
            </Container>
        </Background>
    )
}

export default Authentication