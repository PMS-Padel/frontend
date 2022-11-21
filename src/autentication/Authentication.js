import { Button } from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

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
    max-width: 1080px;
    margin: 10rem;
    height: 600px;
    padding: 30px;
    border-radius: 50px;
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
    width: 40%;
    height: 120%;
    left: 5%;
    transition: all 1s ease-in-out;
`

function Authentication() {
    const [mode, setMode] = useState(0) // 0-> login 1-> register
    return (
        <Background>
            <Container register={mode === 0}>
                <div className='modeChanger'>
                    <h2>Possui conta?</h2>
                    <Button onClick={() => {
                        setMode(1)
                    }}>Entrar</Button>
                </div>
                <div className='modeChanger'>
                    <h2>Possui conta?</h2>
                    <Button onClick={() => {
                        setMode(0)
                    }}>Entrar</Button>
                </div>
                <MovingContainer style={mode === 0 ? {transform: "translateX(125%)"} : null}>
                    {mode === 0 ? <LoginForm /> : <RegisterForm />}
                </MovingContainer>
            </Container>
        </Background >
    )
}

export default Authentication