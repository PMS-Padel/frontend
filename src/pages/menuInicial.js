/** @format */

import zIndex from '@mui/material/styles/zIndex';
import { color, sizeHeight } from '@mui/system';
import Button from '../components/general/Button';
import Row from '../components/general/Row';
import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { HeaderLanding } from '../components/general/HeaderLandingPage';
import React, { useState } from 'react';
import NavBar from '../components/general/NavBar';
import {Navigate} from "react-router-dom";

const AccountButton = styled(AccountCircleIcon)`
  color: white;
  position: absolute; 
  top: 0;
  right: 10%
`

function MenuInicial() {
    const [storedAuth, setStoredAuth] = useState(localStorage.getItem('auth'));

    return (<>
        {storedAuth !== null && <Navigate to="/MenuJogador" />}
        <NavBar />
        <HeaderLanding />
        <div>
            <h1 style={{ fontSize: "40px", color: "#052F53" }}>Torneios</h1>
        </div>
        <Row style={{ color: 'white', justifyContent: "center", gap: "20px" }}>
            <div style={{ width: "230px", height: "250px", backgroundColor: "#6F9BC3", borderRadius: "5%" }}></div>
            <div style={{ width: "230px", height: "250px", backgroundColor: "#6F9BC3", borderRadius: "5%" }}></div>
            <div style={{ width: "230px", height: "250px", backgroundColor: "#6F9BC3", borderRadius: "5%" }}></div>
        </Row>
        <div>

        </div>
    </>
    );
}

export default MenuInicial;
