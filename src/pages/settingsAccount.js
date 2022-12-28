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
import {helperTextEmail, helperTextName} from "../autentication/dataConditions";
import MenuItem from "@mui/material/MenuItem";


export default class SettingsAccount extends Component {
    state = {
        user: [],
        changedUser: {
            name: '',
            email: '',
            phone_number: '',
            gender: 'M',
            birth_date: '',
            level: ''
        },
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
            this.setState({changedUser: data});
        }
        else
        {
            this.props.handleErrorAlertOpenAuth();
        }
    };
    getGender = () => {
        return [
            {
                value: 'M',
                label: 'Masculino',
            },
            {
                value: 'F',
                label: 'Feminino',
            }
        ];
    }
    setTrueGoToAdminMenu = () => {
        this.setState({goToAdminMenu: true});
    }

    updateAccount = () => {

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
                        height: "90%",
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
                                      '& .MuiButtonBase-root': { m: 1, width: '25ch', height: '5ch' },
                                  }}>
                                <Grid item xs={3}>
                                    <AccountCircleIcon fontSize="large" style={{
                                        color: ((localStorage.getItem('loginForm') === 'admin' && 'rgba(138, 21, 21, 0.8)') || 'rgba(21, 96, 138, 0.8)'), width: "350px", height: "350px"}}/>
                                </Grid>
                                <Grid item xs={3} style={{ paddingTop: '25px'}}>
                                    <Grid container spacing={2}
                                          justifyContent="center"
                                          alignItems="center">
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                //InputLabelProps={{ shrink: true }}
                                                variant="outlined"
                                                id="nome"
                                                label="Nome"
                                                placeholder="Nome"
                                                value={this.state.changedUser.name ?? ''}
                                                style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                                onChange={(event) =>
                                                    {this.setState(prevState => ({changedUser: {...prevState.changedUser, name: event.target.value}}))}
                                                }
                                                error={typeof helperTextName(this.state.changedUser.name) === 'string'}
                                                helperText={helperTextName(this.state.changedUser.name)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                //InputLabelProps={{ shrink: true }}
                                                variant="outlined"
                                                id="email"
                                                label="Email"
                                                placeholder="Email"
                                                value={this.state.changedUser.email ?? ''}
                                                style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                                onChange={(event) =>
                                                    {this.setState(prevState => ({changedUser: {...prevState.changedUser, email: event.target.value}}))}
                                                }
                                                error={typeof helperTextEmail(this.state.changedUser.email) === 'string'}
                                                helperText={helperTextEmail(this.state.changedUser.email)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="gender-select"
                                                select
                                                label="Género"
                                                required
                                                defaultValue={this.state.changedUser.gender ?? ''}
                                                onChange={(event) =>
                                                {this.setState(prevState => ({changedUser: {...prevState.changedUser, gender: event.target.value}}))}
                                                }
                                            >
                                                {(this.getGender()).map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3} style={{ paddingTop: '25px'}}>
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
                                                value={this.state.changedUser.phone_number ?? ''}
                                                style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                                onChange={(event) =>
                                                {this.setState(prevState => ({changedUser: {...prevState.changedUser, phone_number: event.target.value}}))}
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                InputLabelProps={{ shrink: true }}
                                                inputProps={{ max: new Date().toISOString().slice(0, 10) }}
                                                variant="outlined"
                                                id="date-birth"
                                                type="date"
                                                label="Data de nascimento"
                                                placeholder="Data de nascimento"
                                                style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                                value={this.state.changedUser.birth_date !== null ? this.state.changedUser.birth_date.substring(0, 10) : ''}
                                                onChange={(event) =>
                                                    {this.setState(prevState => ({changedUser: {...prevState.changedUser, birth_date: event.target.value}}))}
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                disabled
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                variant="outlined"
                                                type="number"
                                                id="level"
                                                label="Nível"
                                                placeholder="Nível"
                                                style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                                value={this.state.changedUser.level ?? ''}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                    <Button onClick={this.updateAccount}
                                        style={{backgroundColor:'#052F53',
                                            color:'white', borderRadius: '5px', textTransform: 'none' }}>Atualizar conta</Button>
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
