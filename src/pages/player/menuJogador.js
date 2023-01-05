/** @format */

import zIndex from '@mui/material/styles/zIndex';
import { color, sizeHeight } from '@mui/system';
import AlertPopup from '../../components/general/AlertPopup';
import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { HeaderLanding } from '../../components/general/HeaderLandingPage';
import React, {Component, useState} from 'react';
import NavBar from '../../components/general/NavBar';
import axiosConfig from "../../axiosConfig";
import {Navigate} from "react-router-dom";
import LoadingPopup from "../../components/general/Loading";

const AccountButton = styled(AccountCircleIcon)`
  color: white;
  position: absolute; 
  top: 0;
  right: 10%
`

export default class MenuJogador extends Component {
    state = {
        user: [],
        storedAuth: localStorage.getItem('auth') ?? sessionStorage.getItem('auth'),
        goToAdminMenu: null
    };
    componentDidMount() {
        if(this.state.storedAuth !== null) {
            this.getUser();
            this.props.setStoredAuth(this.state.storedAuth);
            localStorage.setItem('loginForm', 'player');
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
        else
        {
            this.props.handleErrorAlertOpenAuth();
        }
    };
    setTrueGoToAdminMenu = () => {
        this.setState({goToAdminMenu: true});
    }

    render()
    {
        return (
            <>
                {(this.state.storedAuth === null || this.props.storedAuth === null) && <Navigate to="/" />}
                {this.state.goToAdminMenu &&  <Navigate to="/menu-organizador" />}
                <LoadingPopup loading={this.props.loading}/>
                <NavBar storedAuth={this.props.storedAuth} logoutAccount={this.props.logoutAccount} isAdmin={(this.state.user.role === 'admin')} goToAdminMenu={this.setTrueGoToAdminMenu}/>
                <HeaderLanding firstText={'Bem-vindo'} secondText={(this.state.user.name ?? '') + '!'}/>
                <AlertPopup errorAlert={this.props.errorAlertAuth} handleErrorAlert={this.props.handleErrorAlertCloseAuth} />
                <AlertPopup errorAlert={this.props.errorAlertLogout} handleErrorAlert={this.props.handleErrorAlertCloseLogout} />
            </>
        );
    }
}
