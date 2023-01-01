import React, {Component} from 'react';
import styled from "styled-components";
import NavBar from "../components/general/NavBar";
import backgroundPic from "../img/JogadorTorneiosInicialBackground.png";
import backgroundPic2 from "../img/OrganizadorInicialBackground.png";
import backgroundPicTourney from "../img/TourneyPageBackgroundImage.png";
import AlertPopup from "../components/general/AlertPopup";
import axiosConfig from "../axiosConfig";
import {Navigate} from "react-router-dom";
import NavBarAdmin from "../components/general/NavBarAdmin";
import LoadingPopup from "../components/general/Loading";
import {Button, Grid, InputAdornment} from "@mui/material";
import TourneyHeader from "../components/tourney/tourneyHeader";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import PosterImageDefault from "../img/PosterImageDefault.png";
import TourneyGeneral from "../components/tourney/tourneyGeneral";
import TourneyInscritos from "../components/tourney/tourneyInscritos";
import TourneyMapaDeJogos from "../components/tourney/tourneyMapaDeJogos";
import { padding } from '@mui/system';

export default class TourneyPage extends Component {
    state = {
        user: [],
        tourney: [],
        MenuTourney: 0,
        storedAuth: localStorage.getItem('auth') ?? sessionStorage.getItem('auth'),
        goToAdminMenu: null,
        errorAlertSpecificTourney: {open: false, severity: 'error', errorStatus: '', description: 'Ocorreu um erro na busca do torneio. Verifique e tente novamente.'},
        tourneyNotFound: false,
        date: new Date()
    };
    componentDidMount() {
        if(this.state.storedAuth !== null) {
            this.getUser();
            this.props.setStoredAuth(this.state.storedAuth);
            
        }
        this.getTourney();
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
    getTourney = async () => {
        const res = await axiosConfig.get(`/gettournament/${window.location.pathname.substring(9)}`)
            .then((res) => res)
            .catch((error) => false);

        if(res !== false) {
            let {data} = res;
            this.setState({tourney: data});
        }
        else
        {
            this.setState(prevState => ({
                errorAlertSpecificTourney: {
                    ...prevState.errorAlertSpecificTourney,
                    open: true
                }
            }))
        }
    };
    handleErrorAlertCloseSpecificTourney = () => {
        this.setState(prevState => ({
            errorAlertSpecificTourney: {
                ...prevState.errorAlertSpecificTourney,
                open: false
            }
        }))
        this.setState({tourneyNotFound: true})
    }
    handleMenuTourneyChange = (value) =>{
        this.setState({MenuTourney: value})
    }

    setTrueGoToAdminMenu = () => {
        this.setState({goToAdminMenu: true});
    }

    tipoDeTorneio = (tipo) =>{
        switch (tipo) {
            case 1:
                return(<p>Feminino</p>);
            case 2:
                return(<p>Masculino</p>);
            case 3:
                return(<p>Misto</p>);
            default:
                return(<p>Carregando...</p>);
          }
    }

    render(){
        return(
            <>
                {this.state.tourneyNotFound && <Navigate to="/torneios" />}
                {this.state.goToAdminMenu && localStorage.getItem('loginForm') === 'admin' && <Navigate to="/menu-organizador" />}
                {this.state.goToAdminMenu && localStorage.getItem('loginForm') === 'player' && <Navigate to="/menu-jogador" />}
                {localStorage.getItem('loginForm') === 'admin' ?
                    <NavBarAdmin logoutAccount={this.props.logoutAccount} goToAdminMenu={this.setTrueGoToAdminMenu}/> :
                    <NavBar storedAuth={this.props.storedAuth} logoutAccount={this.props.logoutAccount}
                            isAdmin={(this.state.user.role === 'admin')} goToAdminMenu={this.setTrueGoToAdminMenu}/>
                }
                <LoadingPopup loading={this.props.loading}/>
                <AlertPopup errorAlert={this.props.errorAlertLogout} handleErrorAlert={this.props.handleErrorAlertCloseLogout} />
                <AlertPopup errorAlert={this.state.errorAlertSpecificTourney} handleErrorAlert={this.handleErrorAlertCloseSpecificTourney} />
                <img src={localStorage.getItem('loginForm') === 'admin' ? backgroundPic2 : backgroundPic} alt="background" style={{
                    width: "100%",
                    position: 'absolute',
                    zIndex: -10,
                    objectFit: "cover",
                    top: 0,
                    left: 0}}/>
                <TourneyHeader storedAuth={this.state.storedAuth} tourney={this.state.tourney} user={this.state.user} MenuTourney={this.state.MenuTourney} handleMenuTourneyChange={this.handleMenuTourneyChange}/>
                {this.state.MenuTourney === 0 && localStorage.getItem('loginForm') === 'admin' &&
                    <TourneyGeneral changeTourney={this.state.tourney} storedAuth={this.state.storedAuth}/>}
                {this.state.MenuTourney === 0 && localStorage.getItem('loginForm') === 'player' &&
                    <div style={{
                        width: "80%",
                        borderRadius: "1%",
                        position: 'absolute',
                        zIndex: 0,
                        objectFit: "cover",
                        top: 700,
                        left: 150,
                        backgroundColor: "#FFFFFF",
                        paddingLeft:'2rem',
                        color: "#052F53"
                    }}>
                        <Grid container rowSpacing={1} columnSpacing={0}
                              justifyContent="space-evenly"
                              alignItems="center">
                            <Grid item xs={6}>
                                <div>
                                    <h1>Descrição</h1>
                                    <p>{this.state.tourney.description}</p>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                    <h1>Tipo de torneio</h1>
                                    {this.tipoDeTorneio(this.state.tourney.tournament_type_id)}
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                    <h1>Localização</h1>
                                    <p>{this.state.tourney.location}</p>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                    <h1>Preço (€)</h1>
                                    <p>{this.state.tourney.price}</p>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                    <h1>Seguro</h1>
                                    <p>{this.state.tourney.seguro}</p>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div>
                                    <h1>Data de criação do torneio</h1>
                                    <p>{new Date(this.state.tourney.created_at).getDate() + '-' + (new Date(this.state.tourney.created_at).getMonth() + 1) + '-' + new Date(this.state.tourney.created_at).getFullYear()}</p>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                }
                {this.state.MenuTourney === 1  &&<TourneyInscritos storedAuth={this.state.storedAuth} tourney={this.state.tourney}/>}
                {this.state.MenuTourney === 2 && <TourneyMapaDeJogos storedAuth={this.state.storedAuth} tourney={this.state.tourney}/>}
            </>
        )
    }
}