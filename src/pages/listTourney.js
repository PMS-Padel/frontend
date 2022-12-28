import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, {Component, useState} from 'react';
import styled from "styled-components";
import NavBar from "../components/general/NavBar";
import Row from "../components/general/Row";
import App from "../App";
import backgroundPic from "../img/JogadorTorneiosInicialBackground.png";
import backgroundPic2 from "../img/OrganizadorInicialBackground.png";
import AlertPopup from "../components/general/AlertPopup";
import axiosConfig from "../axiosConfig";
import {Navigate} from "react-router-dom";
import TourneyRow from "../components/tourney/TourneyRow";
import NavBarAdmin from "../components/general/NavBarAdmin";

const AccountButton = styled(AccountCircleIcon)`
  color: white;
  position: absolute; 
  top: 0;
  right: 10%
`

export default class TourneyList extends Component {
    state = {
        user: [],
        storedAuth: localStorage.getItem('auth') ?? sessionStorage.getItem('auth'),
        goToAdminMenu: null
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
    setTrueGoToAdminMenu = () => {
        this.setState({goToAdminMenu: true});
    }

    render() {
        return (<>
                {this.state.goToAdminMenu && localStorage.getItem('loginForm') === 'admin' && <Navigate to="/menu-organizador" />}
                {this.state.goToAdminMenu && localStorage.getItem('loginForm') === 'player' && <Navigate to="/menu-jogador" />}
                {localStorage.getItem('loginForm') === 'admin' ?
                    <NavBarAdmin logoutAccount={this.props.logoutAccount} goToAdminMenu={this.setTrueGoToAdminMenu}/> :
                    <NavBar storedAuth={this.props.storedAuth} logoutAccount={this.props.logoutAccount} isAdmin={(this.state.user.role === 'admin')} goToAdminMenu={this.setTrueGoToAdminMenu}/>}
                <div style={{position: "relative", top: 0, left: 0}}>
                    <img src={localStorage.getItem('loginForm') === 'admin' ? backgroundPic2 : backgroundPic} alt="background" style={{
                        width: "100%",
                        position: 'relative',
                        zIndex: -10,
                        objectFit: "cover",
                        top: 0,
                        left: 0}}/>
                    <h1 style={{
                        textAlign: 'center',
                        fontSize: "40px",
                        color: "white",
                        position: 'absolute',
                        bottom: "90%",
                        left: "5%",
                        zIndex: "-1"}}>Os melhores torneios estão à tua espera!</h1>
                    <div style={{
                        width: "94%",
                        height: "90%",
                        borderRadius: "1%",
                        position: 'absolute',
                        zIndex: 0,
                        objectFit: "cover",
                        top: 400,
                        left: 45,
                        backgroundColor: "#FFFFFF"}}>
                        <TourneyRow maxLength={undefined}/>
                    </div>
                </div>
                <AlertPopup errorAlert={this.props.errorAlertLogout} handleErrorAlert={this.props.handleErrorAlertCloseLogout} />
            </>
        )
    }
}