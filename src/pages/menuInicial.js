/** @format */

import zIndex from '@mui/material/styles/zIndex';
import { color, sizeHeight } from '@mui/system';
import Button from '../components/general/Button';
import Row from '../components/general/Row';
import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { HeaderLanding } from '../components/general/HeaderLandingPage';
import React, {Component, useState} from 'react';
import NavBar from '../components/general/NavBar';
import {Navigate} from "react-router-dom";
import axiosConfig from "../axiosConfig";

const AccountButton = styled(AccountCircleIcon)`
  color: white;
  position: absolute; 
  top: 0;
  right: 10%
`

export default class MenuInicial extends Component {
    state = {
        user: [],
        storedAuth: localStorage.getItem('auth')
    };
    componentDidMount() {
        if(this.state.storedAuth !== null) {
            this.getUser();
            this.props.setStoredAuth(this.state.storedAuth);
        }
    }
    getUser = async () => {
        const res = await axiosConfig.get('/test-authentication',{
            headers: {
                Authorization: 'Bearer ' + this.state.storedAuth
            }
        })
            .then((res) => res)
            .catch((error) => false);

        if(res !== false) {
            let {data} = res;
            this.setState({user: data});
        }
    };

    render() {
        return (<>
                {this.state.user.role === 'player' && <Navigate to="/menu-jogador"/>}
                {this.state.user.role === 'admin' && sessionStorage.getItem('loginForm') === 'player' && <Navigate to="/menu-jogador"/>}
                {this.state.user.role === 'admin' && sessionStorage.getItem('loginForm') === 'admin' && <Navigate to="/menu-organizador"/>}
                <NavBar storedAuth={this.props.storedAuth}/>
                <HeaderLanding firstText={'Vem competir'} secondText={'e divertir-te!'}/>
                <div>
                    <h1 style={{fontSize: "40px", color: "#052F53"}}>Torneios</h1>
                </div>
                <Row style={{color: 'white', justifyContent: "center", gap: "20px"}}>
                    <div
                        style={{width: "230px", height: "250px", backgroundColor: "#6F9BC3", borderRadius: "5%"}}></div>
                    <div
                        style={{width: "230px", height: "250px", backgroundColor: "#6F9BC3", borderRadius: "5%"}}></div>
                    <div
                        style={{width: "230px", height: "250px", backgroundColor: "#6F9BC3", borderRadius: "5%"}}></div>
                </Row>
                <div>

                </div>
            </>
        );
    }
}
