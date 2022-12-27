/** @format */

import AlertPopup from '../components/general/AlertPopup';
import { HeaderLanding } from '../components/general/HeaderLandingPage';
import React, {Component} from 'react';
import NavBar from '../components/general/NavBar';
import axiosConfig from "../axiosConfig";
import {Navigate} from "react-router-dom";
import LoadingPopup from "../components/general/Loading";
import NavBarAdmin from "../components/general/NavBarAdmin";
import backgroundPic2 from "../img/OrganizadorInicialBackground.png";
import backgroundPic from "../img/JogadorTorneiosInicialBackground.png";
import TourneyRow from "../components/tourney/TourneyRow";
import {Button, Grid, InputAdornment} from "@mui/material";
import TextField from "@mui/material/TextField";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default class SettingsAccount extends Component {
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
                    <div style={{
                        width: "94%",
                        height: "75%",
                        borderRadius: "1%",
                        position: 'absolute',
                        zIndex: 0,
                        objectFit: "cover",
                        top: 150,
                        left: 45,
                        backgroundColor: "#FFFFFF"}}>
                        <div style={{ padding: "20px" }}>
                            <Grid container spacing={2}
                                  justifyContent="center"
                                  alignItems="center"
                                  sx={{
                                      '& .MuiTextField-root': { m: 1, width: '25ch' },
                                  }}>
                                <Grid item xs={4}>
                                    <AccountCircleIcon fontSize="large" style={{
                                        color: ((localStorage.getItem('loginForm') === 'admin' && 'rgba(138, 21, 21, 0.8)') || 'rgba(21, 96, 138, 0.8)'), width: "350px", height: "350px"}}/>
                                </Grid>
                                <Grid item xs={4} style={{ paddingTop: '25px'}}>
                                    <Grid container spacing={2}
                                          justifyContent="center"
                                          alignItems="center">
                                        <Grid item xs={12}>
                                            <TextField
                                                //required
                                                //InputLabelProps={{ shrink: true }}
                                                variant="outlined"
                                                id="nome"
                                                label="Nome"
                                                placeholder="Nome"
                                                value={this.state.user.name ?? ''}
                                                style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                                onChange={(event) =>
                                                {console.log(event.target.value)}
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={4} style={{ paddingTop: '25px'}}>
                                    <Grid container spacing={2}
                                          justifyContent="center"
                                          alignItems="center">
                                        <Grid item xs={12}>
                                            <TextField
                                                //required
                                                //InputLabelProps={{ shrink: true }}
                                                variant="outlined"
                                                id="phoneNumber"
                                                type="number"
                                                label="Número de contacto"
                                                placeholder="Número de contacto"
                                                defaultValue={this.state.user.phone_number ?? ''}
                                                style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                                onChange={(event) =>
                                                //{this.setState(prevState => ({dataNewTourney: {...prevState.dataNewTourney, initialDate: event.target.value}}))}
                                                {console.log(event.target.value)}
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                        <div>
                            <h1 style={{fontSize: "40px", color: "#052F53", paddingLeft: "3%"}}>Os teus torneios</h1>
                        </div>
                        <TourneyRow maxLength={undefined}/>
                    </div>
                </div>
                <AlertPopup errorAlert={this.props.errorAlertLogout} handleErrorAlert={this.props.handleErrorAlertCloseLogout} />
            </>
        );
    }
}
