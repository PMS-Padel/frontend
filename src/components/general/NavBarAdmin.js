import React, { useState } from 'react'
import styled from 'styled-components'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import Authentication from '../../autentication/Authentication';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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

    & a {
      color: white;
      text-decoration: none;
    }
  }
`

function NavBarAdmin({logoutAccount, goToAdminMenu}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseChangeMenu = () => {
        setAnchorEl(null);
        goToAdminMenu();
    };
    const handleCloseLogout = () => {
        setAnchorEl(null);
        logoutAccount();
    };

    return (
        <Container>
            <>
                <div></div>
                    <>
                        <nav>
                            <a href='/menu-organizador' style={{fontSize: '28px'}}>Início</a>
                            <a href='/' style={{fontSize: '28px'}}>Torneios</a>
                            <a href='/' style={{fontSize: '28px'}}>Organizar</a>
                        </nav>
                        <div>
                            <CircleNotificationsIcon fontSize="large" style={{color: 'white', cursor: 'pointer'}}/>
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
                                <MenuItem onClick={handleClose}>Conta</MenuItem>
                                <MenuItem onClick={handleCloseChangeMenu}>Ir a Jogador</MenuItem>
                                <MenuItem onClick={handleClose}>Definições</MenuItem>
                                <MenuItem onClick={handleCloseLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </>
            </>
        </Container>
    )
}

export default NavBarAdmin