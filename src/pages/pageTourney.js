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
import {Button, Grid} from "@mui/material";
import TourneyHeader from "../components/general/tourneyHeader";
import TextField from "@mui/material/TextField";

export default class TourneyPage extends Component {
    state = {
        user: [],
        tourney: [],
        changeTourney: [],
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
            this.setState({changeTourney: data});
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

    setTrueGoToAdminMenu = () => {
        this.setState({goToAdminMenu: true});
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
                <TourneyHeader tourney={this.state.tourney} user={this.state.user}/>
                <div style={{
                    width: "82%",
                    height: "230%",
                    borderRadius: "1%",
                    position: 'absolute',
                    zIndex: 0,
                    objectFit: "cover",
                    top: 700,
                    left: 150,
                    backgroundColor: "#FFFFFF"
                }}>
                    <div style={{ padding: "20px" }}>
                        <Grid container spacing={2}
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                              '& .MuiTextField-root': { m: 1, width: '25ch' },
                          }}>
                            <Grid item xs={6} style={{ paddingTop: '25px'}}>
                                <TextField
                                    required
                                    disabled={ this.state.user.id !== undefined ?
                                        !(localStorage.getItem('loginForm') === 'admin' && this.state.user.id === this.state.tourney.user_id)
                                        :
                                        true
                                    }
                                    InputProps={{
                                        readOnly: this.state.user.id !== undefined ?
                                        !(localStorage.getItem('loginForm') === 'admin' && this.state.user.id === this.state.tourney.user_id)
                                        :
                                        true,
                                    }}
                                    variant="outlined"
                                    id="titulo"
                                    label="Título"
                                    placeholder="Título"
                                    value={this.state.changeTourney.name ?? ''}
                                    style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                    onChange={(event) =>
                                        {this.setState(prevState => ({changeTourney: {...prevState.changeTourney, name: event.target.value}}))}
                                    }
                                />
                            </Grid>
                            <Grid item xs={6} style={{ paddingTop: '25px'}}>
                                <TextField
                                    required
                                    disabled={ this.state.user.id !== undefined ?
                                        !(localStorage.getItem('loginForm') === 'admin' && this.state.user.id === this.state.tourney.user_id)
                                        :
                                        true
                                    }
                                    InputProps={{
                                        readOnly: this.state.user.id !== undefined ?
                                            !(localStorage.getItem('loginForm') === 'admin' && this.state.user.id === this.state.tourney.user_id)
                                            :
                                            true,
                                    }}
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    id="descricao"
                                    label="Descrição"
                                    placeholder="Descrição"
                                    value={this.state.changeTourney.description ?? ''}
                                    style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                    onChange={(event) =>
                                    {this.setState(prevState => ({changeTourney: {...prevState.changeTourney, description: event.target.value}}))}
                                    }
                                />
                            </Grid>
                            {
                                localStorage.getItem('loginForm') === 'admin' && this.state.user.id === this.state.tourney.user_id &&
                                this.state.user.id !== undefined &&
                                <Grid item xs={12} style={{paddingTop: '25px'}}>
                                    <Button onClick={undefined}
                                            style={{
                                                backgroundColor: '#052F53',
                                                color: 'white', borderRadius: '5px', textTransform: 'none',
                                                marginTop: '19px', top: '6px', marginLeft: '20px'
                                            }}>Atualizar torneio</Button>
                                </Grid>
                            }
                        </Grid>
                    </div>
                </div>
            </>
        )
    }
}