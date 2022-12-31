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
import {
    helperTextEmail,
    helperTextEmailLogin,
    helperTextName,
    helperTextPasswordLogin
} from "../autentication/dataConditions";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";


export default class SettingsAccount extends Component {
    state = {
        user: [],
        changedUser: {
            name: '',
            email: '',
            phone_number: '',
            gender: 'M',
            birth_date: '',
            level: '',
            user_code: '',
            role: ''
        },
        storedAuth: localStorage.getItem('auth') ?? sessionStorage.getItem('auth'),
        goToAdminMenu: null,
        loadingChangeUser: false,
        errorAlertChangeUser: {open: false, severity: 'error', errorStatus: '', description: 'Ocorreu um erro na atualização da conta. Verifique e tente novamente.'},
        successAlertChangeUser: {open: false, severity: 'success', errorStatus: 'SUCESSO', description: 'A conta foi alterada com sucesso!'},
        setPassword: '',
        isSignedUp: false,
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
            axiosConfig.post('/isteammate', {
                playerid: data.id
            }, {
                headers: {
                    Authorization: 'Bearer ' + this.state.storedAuth
                }
            })
                .then(res =>{
                    this.setState({isSignedUp: true});
                })
                .catch(err =>{
                    this.setState({isSignedUp: false});
                })
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
    insertPassword = (pass) => {
        this.setState({setPassword: pass});
    }
    setTrueGoToAdminMenu = () => {
        this.setState({goToAdminMenu: true});
    }

    updateAccount = () => {
        if(typeof helperTextPasswordLogin(this.state.setPassword) !== 'string') {
            this.setState({loadingChangeUser: true});
            //console.log(this.state.changedUser);
            axiosConfig.post('/update', {
                name: this.state.changedUser.name,
                email: this.state.changedUser.email,
                phone_number: this.state.changedUser.phone_number,
                gender: this.state.changedUser.gender,
                birth_date: this.state.changedUser.birth_date,
                id: this.state.changedUser.id,
                password: this.state.setPassword,
            }, {
                headers: {
                    Authorization: 'Bearer ' + this.state.storedAuth
                }
            })
                .then(response => {
                    this.setState({loadingChangeUser: false});
                    this.setState(prevState => ({
                        successAlertChangeUser: {
                            ...prevState.successAlertChangeUser,
                            open: true
                        }
                    }))
                })
                .catch(error => {
                    this.setState({loadingChangeUser: false});
                    this.setState(prevState => ({
                        errorAlertChangeUser: {
                            ...prevState.errorAlertChangeUser,
                            open: true,
                            errorStatus: error.code
                        }
                    }))
                })
        }
    }

    handleErrorAlertClose = () => {
        this.setState(prevState => ({
            errorAlertChangeUser: {
                ...prevState.errorAlertChangeUser,
                open: false
            }
        }))
    }
    handleSuccessAlertClose = () => {
        this.setState(prevState => ({
            successAlertChangeUser: {
                ...prevState.successAlertChangeUser,
                open: false
            }
        }))
        window.location.reload();
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
                <LoadingPopup loading={this.props.loading}/>
                <LoadingPopup loading={this.state.loadingChangeUser}/>
                <AlertPopup errorAlert={this.state.errorAlertChangeUser} handleErrorAlert={this.handleErrorAlertClose} />
                <AlertPopup errorAlert={this.state.successAlertChangeUser} handleErrorAlert={this.handleSuccessAlertClose} />
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
                                      '& .MuiButtonBase-root': { m: 1, width: '32ch', height: '6ch' },
                                  }}>
                                <Grid item xs={3}>
                                    {this.state.changedUser.name ? 
                                        <img src={'https://avatars.dicebear.com/api/initials/' + this.state.changedUser.name + '.svg'} style={{ width: "300px", height: "300px", borderRadius: '5px' }} alt={'Avatar da conta ' + this.state.changedUser.name}/>
                                        : <CircularProgress />}
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
                                                disabled={this.state.isSignedUp}
                                                InputProps={{
                                                    readOnly: this.state.isSignedUp,
                                                }}
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
                                        <Grid item xs={12}>
                                            <TextField
                                                disabled
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                variant="outlined"
                                                type="number"
                                                id="user_code"
                                                label="Código de utilizador"
                                                placeholder="Código de utilizador"
                                                style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                                value={this.state.changedUser.user_code ?? ''}
                                            />
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
                                                InputProps={{ inputProps: { min: 100000000 } }}
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
                                                placeholder="Não definido"
                                                style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                                value={this.state.changedUser.level ?? '-'}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                disabled
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                variant="outlined"
                                                id="role"
                                                label="Tipo de conta"
                                                placeholder="Tipo de conta"
                                                style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                                value={this.state.changedUser.role ?? ''}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        required
                                        id="password"
                                        label="Password atual"
                                        placeholder="Password atual"
                                        type="password"
                                        style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                        onChange={(event) => {this.insertPassword(event.target.value)}}
                                        error={typeof helperTextPasswordLogin(this.state.setPassword) === 'string'}
                                        helperText={helperTextPasswordLogin(this.state.setPassword)}
                                    />
                                    <Button onClick={this.updateAccount}
                                        style={{backgroundColor:'#052F53',
                                            color:'white', borderRadius: '5px', textTransform: 'none', marginTop: '19px', top: '6px' }}>Atualizar conta</Button>
                                </Grid>
                            </Grid>
                        </div>
                        <div>
                            <h1 style={{fontSize: "40px", color: "#052F53", paddingLeft: "3%"}}>Os teus torneios</h1>
                        </div>
                        <TourneyRow maxLength={undefined} adminId={undefined}/>
                    </div>
                </div>
                <AlertPopup errorAlert={this.props.errorAlertLogout} handleErrorAlert={this.props.handleErrorAlertCloseLogout} />
            </>
        );
    }
}
