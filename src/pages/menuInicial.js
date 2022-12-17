/** @format */

import zIndex from '@mui/material/styles/zIndex';
import { color, sizeHeight } from '@mui/system';
import Button from '../components/general/Button';
import Row from '../components/general/Row';
import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { HeaderLanding } from '../components/general/HeaderLandingPage';
import React, {Component} from 'react';
import NavBar from '../components/general/NavBar';
import {Navigate} from "react-router-dom";
import axiosConfig from "../axiosConfig";
import TourneyRow from "../components/tourney/TourneyRow";

const AccountButton = styled(AccountCircleIcon)`
  color: white;
  position: absolute; 
  top: 0;
  right: 10%
`

export default class MenuInicial extends Component {
    state = {
        user: [],
        storedAuth: localStorage.getItem('auth') ?? sessionStorage.getItem('auth'),
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
                {this.state.user.role === 'admin' && localStorage.getItem('loginForm') === null && <Navigate to="/menu-jogador"/>}
                {this.state.user.role === 'admin' && localStorage.getItem('loginForm') === 'player' && <Navigate to="/menu-jogador"/>}
                {this.state.user.role === 'admin' && localStorage.getItem('loginForm') === 'admin' && <Navigate to="/menu-organizador"/>}
                <NavBar storedAuth={this.props.storedAuth}/>
                <HeaderLanding firstText={'Vem competir'} secondText={'e divertir-te!'}/>
                <div>
                    <h1 style={{fontSize: "40px", color: "#052F53", paddingLeft: "2%"}}>Torneios</h1>
                </div>
                <TourneyRow maxLength={3}/>
                <div style={{ borderBottom: "3px solid #B8CEE2", paddingBottom: "50px" }}>
                    <h1 style={{fontSize: "40px", color: "#052F53", justifyContent: "middle", textAlign: "center", paddingTop: "30px"}}>VER MAIS ANTIGOS</h1>
                </div>
                <div style={{ paddingBottom: "50px" }} />
            </>
        );
    }
}
