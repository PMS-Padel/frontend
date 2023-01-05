import React, { useState } from 'react'
import styled from 'styled-components'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import Authentication from '../../autentication/Authentication';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Navigate} from "react-router-dom";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  padding: 10px 0;
  position: fixed;
  z-index: 10;
  background-color: rgba(138, 21, 21, 0.4);
  border-bottom: 1px solid #FFF;

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
  }
`

const HRefA = styled.a`
  color: white;
  
  &:hover,
  &.active {
    font-weight: bold;
  }
  text-decoration: ${(props) =>
    props.href === window.location.pathname ? "underline" : "none"};
  font-weight: ${(props) =>
    props.href === window.location.pathname ? "bold" : "normal"};
`

function NavBarAdmin({logoutAccount, goToAdminMenu}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [redirectSettings, setRedirectSettings] = React.useState(false);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseChangeMenu = () => {
        setAnchorEl(null);
        localStorage.setItem('loginForm', 'player');
        goToAdminMenu();
    };
    const handleCloseToSettings = () => {
        setAnchorEl(null);
        setRedirectSettings(true);
    };
    const handleCloseLogout = () => {
        setAnchorEl(null);
        logoutAccount();
    };

    return (
        <Container>
            {redirectSettings === true && <Navigate to="/settings" />}
            <>
                <div></div>
                    <>
                        <nav>
                            <HRefA href='/menu-organizador' style={{fontSize: '28px'}}>Início</HRefA>
                            <HRefA href='/torneios' style={{fontSize: '28px'}}>Torneios</HRefA>
                            <HRefA href='/organizar' style={{fontSize: '28px'}}>Organizar</HRefA>
                        </nav>
                        <div>
                            <CircleNotificationsIcon fontSize="large" style={{color: 'white', cursor: 'pointer', marginRight: '20px'}}/>
                            <AccountCircleIcon id="icon-account" fontSize="large" style={{color: 'white', cursor: 'pointer'}}
                                               aria-controls={open ? 'basic-menu' : undefined}
                                               aria-haspopup="true"
                                               aria-expanded={open ? 'true' : undefined}
                                               onClick={handleClick}/>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'icon-account',
                                }}
                            >
                                <MenuItem sx={{ color: localStorage.getItem('loginForm') === 'admin' ? "#530508" : "#052F53", justifyContent: "center", fontWeight:'bold' }} divider={true} onClick={handleCloseChangeMenu}>Menu Jogador</MenuItem>
                                <MenuItem sx={{ color: localStorage.getItem('loginForm') === 'admin' ? "#530508" : "#052F53", justifyContent: "center", fontWeight:'bold' }} divider={true} disabled={window.location.pathname === "/settings"} onClick={handleCloseToSettings}>Definições</MenuItem>
                                <MenuItem sx={{ color: localStorage.getItem('loginForm') === 'admin' ? "#530508" : "#052F53", justifyContent: "center", fontWeight:'bold' }} onClick={handleCloseLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </>
            </>
        </Container>
    )
}

export default NavBarAdmin