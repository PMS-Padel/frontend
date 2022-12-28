import React, {Component, useState} from 'react';
import styled from "styled-components";
import NavBar from "../components/general/NavBar";
import backgroundPic from "../img/JogadorTorneiosInicialBackground.png";
import backgroundPic2 from "../img/OrganizadorInicialBackground.png";
import backgroundPicTourney from "../img/TourneyPageBackgroundImage.png";
import AlertPopup from "../components/general/AlertPopup";
import axiosConfig from "../axiosConfig";
import {Navigate} from "react-router-dom";
import TourneyRow from "../components/tourney/TourneyRow";
import NavBarAdmin from "../components/general/NavBarAdmin";
import {Button, Grid, InputAdornment} from "@mui/material";
import { padding } from '@mui/system';

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  padding: 10px 0;
  background-color: #052F53;
  //border-bottom:1px solid #FFF;
  position: absolute;
  top: 580px;

  & nav {
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    max-width: 900px;
    margin: auto;
    z-index: 1;
    flex-grow: 1;
    align-items: center;
    gap: 30px;
    
    & a {
      color: white;

      &:hover,
      &.active {
        font-weight: bold;
      }
      text-decoration: ${(props) =>
              props.href === window.location.pathname ? "underline" : "none"};
      font-weight: ${(props) =>
              props.href === window.location.pathname ? "bold" : "normal"};
    }
  }
`

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
            this.getTourney(this.props.id)
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
    getTourney = async (id) => {
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

                <img src={localStorage.getItem('loginForm') === 'admin' ? backgroundPic2 : backgroundPic} alt="background" style={{
                    width: "100%",
                    position: 'relative',
                    zIndex: -10,
                    objectFit: "cover",
                    top: 0,
                    left: 0}}/>
                    <img src={backgroundPicTourney} alt="background" style={{
                        width: "100%",
                        position: 'absolute',
                        opacity: 0.8,
                        zIndex: -10,
                        objectFit: "cover",
                        top: 65,
                        left: 0
                    }}/>
                    <Container>
                        <nav>
                            <a href='/' style={{fontSize: '28px'}}>Inscritos</a>
                            <a href='/' style={{fontSize: '28px'}}>Mapa de jogos</a>
                            <a href='/' style={{fontSize: '28px'}}>Calendário</a>
                            <a href='/' style={{fontSize: '28px'}}>Resultados</a>
                        </nav>
                    </Container>
            </>
        )
    }
}