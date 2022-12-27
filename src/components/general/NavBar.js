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
  background-color: rgba(21, 96, 138, 0.4);
  border-bottom:1px solid #FFF;

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

function NavBar({storedAuth, logoutAccount, isAdmin, goToAdminMenu}) {
    const [showMenu, setShowMenu] = useState(false)
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
        localStorage.setItem('loginForm', 'admin');
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

    const disableMenu = () =>
        setShowMenu(false);

    return (
        <Container>
            {redirectSettings === true && <Navigate to="/settings" />}
            <>
                <div></div>
                {storedAuth === null &&
                    <>
                        <nav>
                            <HRefA href='/' style={{fontSize: '28px'}}>Início</HRefA>
                            <HRefA href='/torneios' style={{fontSize: '28px'}}>Torneios</HRefA>
                            <HRefA href='/info' style={{fontSize: '28px'}}>Padel</HRefA>
                        </nav>
                        <div onClick={() => {
                            setShowMenu(true)
                        }}><AccountCircleIcon fontSize="large" style={{color: 'white', cursor: 'pointer'}}/>
                        </div>
                        {showMenu && <Authentication showMenu={disableMenu}/>}
                    </>
                }
                {storedAuth !== null &&
                    <>
                        <nav>
                            <HRefA href='/menu-jogador' style={{fontSize: '28px'}}>Início</HRefA>
                            <HRefA href='/torneios' style={{fontSize: '28px'}}>Torneios</HRefA>
                            <HRefA href='/info' style={{fontSize: '28px'}}>Padel</HRefA>
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
                                {isAdmin && <MenuItem sx={{ color: "#052F53", justifyContent: "center", fontWeight:'bold' }} divider={true} onClick={handleCloseChangeMenu}>Menu Organizador</MenuItem>}
                                <MenuItem sx={{ color: "#052F53", justifyContent: "center", fontWeight:'bold' }} divider={true} disabled={window.location.pathname === "/settings"} onClick={handleCloseToSettings}>Definições</MenuItem>
                                <MenuItem sx={{ color: "#052F53", justifyContent: "center", fontWeight:'bold' }} onClick={handleCloseLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </>
                }
            </>
        </Container>
    )
}

export default NavBar