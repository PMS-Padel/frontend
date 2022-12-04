import React, { useState } from 'react'
import styled from 'styled-components'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Authentication from '../../autentication/Authentication';

const Container = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    padding: 10px 0;
    position: fixed;
    z-index: 10;

    & > div:nth-child(1), & > div:nth-child(3) {
        width: 200px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    & nav {
        display: flex;
        flex-direction: row;
        
        justify-content: space-between;
        max-width: 400px;
        margin: auto;
        z-index: 1;
        flex-grow: 1;
        align-items: center;
        gap: 30px;

        & a {
            color: white;
            text-decoration: none;
        }
    }
`

function NavBar() {
    const [showMenu, setShowMenu] = useState(false)

    return (
        <Container>
            <div></div>
            <nav>
                <a href='/' style={{ fontSize: '28px' }}>Início</a>
                <a href='/' style={{ fontSize: '28px' }}>Torneios</a>
                <a href='/' style={{ fontSize: '28px' }}>Padel</a>
            </nav>
            <div onClick={() => {
                setShowMenu(true)
            }}><AccountCircleIcon fontSize="large" style={{ color: 'white', cursor:'pointer' }} />
            </div>
            {showMenu && <Authentication />}
        </Container>
    )
}

export default NavBar