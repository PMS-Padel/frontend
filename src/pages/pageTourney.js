import React, {Component, useState} from 'react';
import styled from "styled-components";
import NavBar from "../components/general/NavBar";
import backgroundPic from "../img/JogadorTorneiosInicialBackground.png";
import backgroundPic2 from "../img/OrganizadorInicialBackground.png";
import AlertPopup from "../components/general/AlertPopup";
import axiosConfig from "../axiosConfig";
import {Navigate} from "react-router-dom";
import TourneyRow from "../components/tourney/TourneyRow";
import NavBarAdmin from "../components/general/NavBarAdmin";
import {Button, Grid, InputAdornment} from "@mui/material";

export default class TourneyPage extends Component {

    state = {
        user: [],
        tourney: [],
        storedAuth: localStorage.getItem('auth') ?? sessionStorage.getItem('auth'),
        goToAdminMenu: null
    };
    componentDidMount() {
        if(this.state.storedAuth !== null) {
            this.getUser();
            this.getTurney(this.props.id)
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
    getTurney =  async (id) => {
        const res = await axiosConfig.get('/gettournament/{id}',{ id
        })
            .then((res) => res)
            .catch((error) => false);

        if(res !== false) {
            let {data} = res;
            this.setState({tourney: data});
        }
    };

    setTrueGoToAdminMenu = () => {
        this.setState({goToAdminMenu: true});
    }

    render(){
        return(
            <>
              {this.state.goToAdminMenu && localStorage.getItem('loginForm') === 'admin' && <Navigate to="/menu-organizador" />}
                {this.state.goToAdminMenu && localStorage.getItem('loginForm') === 'player' && <Navigate to="/menu-jogador" />}
                {localStorage.getItem('loginForm') === 'admin' ?
                    <NavBarAdmin logoutAccount={this.props.logoutAccount} goToAdminMenu={this.setTrueGoToAdminMenu}/> :
                    <NavBar storedAuth={this.props.storedAuth} logoutAccount={this.props.logoutAccount} isAdmin={(this.state.user.role === 'admin')} goToAdminMenu={this.setTrueGoToAdminMenu}/>}

            <h1>oi</h1>
            <div style={{backgroundColor:'#052F53', position:'relative', top:'25rem', }}>
            <Button style={{ color:'white', position:'relative', marginLeft:'35%'}}>Inscritos</Button>
            <Button style={{ color:'white', position:'relative', marginLeft:'2rem'}}>Mapa de jogos</Button>
            <Button style={{ color:'white', position:'relative', marginLeft:'2rem'}}>Calendário</Button>
            <Button style={{ color:'white', position:'relative', marginLeft:'2rem'}}>Resultados</Button>
            </div>
            </>
        )
    }
}