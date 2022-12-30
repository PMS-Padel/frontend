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
import TourneyHeader from "../components/general/tourneyHeader";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import PosterImageDefault from "../img/PosterImageDefault.png";

export default class TourneyPage extends Component {
    state = {
        user: [],
        tourney: [],
        MenuTourney: 0,
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
    handleMenuTourneyChange = (value) =>{
        this.setState({MenuTourney: value})
    }

    setTrueGoToAdminMenu = () => {
        this.setState({goToAdminMenu: true});
    }

    getCategorias = () => {
        return [
            {
                value: null,
                label: '',
            },
            {
                value: 3,
                label: 'Misto',
            },
            {
                value: 2,
                label: 'Masculino',
            },
            {
                value: 1,
                label: 'Feminino',
            },
        ];
    }

    submitTourney = () => {
        console.log(this.state.changeTourney);
        axiosConfig.post('/updatetournament', {
            id:this.state.tourney.id,
            name: this.state.changeTourney.title,
            description: this.state.changeTourney.description,
            tournamenttype: this.state.changeTourney.category,
            initdate: this.state.changeTourney.initialDate,
            enddate: this.state.changeTourney.finalDate,
            maxplayers: this.state.changeTourney.maxPlayers,
            price: this.state.changeTourney.price,
            location: this.state.changeTourney.local,


        }, {
            headers: {
                Authorization: 'Bearer ' + this.state.storedAuth
            }
        })
            .then(response => {
              this.setState(prevState => ({
                  successAlertTourney: {
                      ...prevState.successAlertTourney,
                      open: true
                  }
              }))
            })
            .catch(error => {
              this.setState(prevState => ({
                  errorAlertTourney: {
                      ...prevState.errorAlertTourney,
                      open: true,
                      errorStatus: error.code
                  }
              }))
            })
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
                <TourneyHeader tourney={this.state.tourney} user={this.state.user} MenuTourney={this.state.MenuTourney} handleMenuTourneyChange={this.handleMenuTourneyChange}/>
                <div style={{
                    width: "82%",
                    borderRadius: "1%",
                    position: 'absolute',
                    zIndex: 0,
                    objectFit: "cover",
                    top: 700,
                    left: 150,
                    backgroundColor: "#FFFFFF"
                }}>
                    <div style={{ padding: "20px",}}>


                        {this.state.MenuTourney === 0 && localStorage.getItem('loginForm') === 'admin' ?
                        <div>
                        <Grid container spacing={2}
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}>

                                <Grid item xs={4} style={{ paddingTop: '25px'}}>
                                <Grid container spacing={2}
                                    justifyContent="center"
                                    alignItems="center">
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            variant="outlined"
                                            id="titulo"
                                            label="Título"
                                            placeholder="Título"
                                            value={this.state.changeTourney.name ?? ''}
                                            style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                            onChange={(event) =>
                                                {this.setState(prevState => ({changeTourney: {...prevState.changeTourney, title: event.target.value}}))}
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
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
                                    <Grid item xs={12}>
                                        <TextField
                                            id="categoria_select"
                                            select
                                            label="Categoria"
                                            required
                                            defaultValue={this.state.changeTourney.category ?? ''}
                                            onChange={(event) =>
                                                {this.setState(prevState => ({changeTourney: {...prevState.changeTourney, category: event.target.value}}))}
                                            }
                                        >
                                            {(this.getCategorias()).map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            variant="outlined"
                                            type="number"
                                            inputProps={{
                                                step: 0.5,
                                            }}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">€</InputAdornment>,
                                            }}
                                            id="preco"
                                            label="Preço de entrada"
                                            placeholder="Preço de entrada"
                                            value={this.state.changeTourney.price ?? ''}
                                            style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                            onChange={(event) =>
                                                {this.setState(prevState => ({changeTourney: {...prevState.changeTourney, price: event.target.value}}))}
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
                                        required
                                        InputLabelProps={{ shrink: true }}
                                        inputProps=
                                            {{ max: this.state.changeTourney.finalDate ?
                                                    new Date(this.state.changeTourney.finalDate).toISOString().slice(0, 10) : '' }}
                                        variant="outlined"
                                        id="data_inicio"
                                        type="date"
                                        label="Data início"
                                        placeholder="Data início"
                                        value={this.state.changeTourney.initialDate !== null ? this.state.changeTourney.initialDate.substring(0, 10) : ''}
                                    
                                        style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                        onChange={(event) =>
                                            {this.setState(prevState => ({changeTourney: {...prevState.changeTourney, initialDate: event.target.value}}))}
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        
                                        InputLabelProps={{ shrink: true }}
                                        inputProps=
                                            {{ min: this.state.changeTourney.initialDate ?
                                                    new Date(this.state.changeTourney.initialDate).toISOString().slice(0, 10) : '' }}
                                        variant="outlined"
                                        id="data_fim"
                                        type="date"
                                        label="Data fim"
                                        placeholder="Data fim"
                                        value={this.state.changeTourney.finalDate ?? ''}
                                        style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                        onChange={(event) =>
                                            {this.setState(prevState => ({changeTourney: {...prevState.changeTourney, finalDate: event.target.value}}))}
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        
                                        variant="outlined"
                                        type="number"
                                        InputProps={{ inputProps: { min: 4 } }}
                                        id="max_jogadores"
                                        label="Número máximo de jogadores"
                                        placeholder="Número máximo de jogadores"
                                        value={this.state.changeTourney.maxplayers ?? ''}
                                        style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                        onChange={(event) =>
                                            {this.setState(prevState => ({changeTourney: {...prevState.changeTourney, maxPlayers: event.target.value}}))}
                                        }
                                        
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        
                                        variant="outlined"
                                        id="localizacao"
                                        label="Localização"
                                        placeholder="Localização"
                                        value={this.state.changeTourney.local ?? ''}
                                        style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                        onChange={(event) =>
                                        {this.setState(prevState => ({changeTourney: {...prevState.changeTourney, local: event.target.value}}))}
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        
                                        variant="outlined"
                                        id="seguro"
                                        label="Seguro"
                                        placeholder="Seguro"
                                        style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                        value={this.state.changeTourney.insurance ?? ''}
                                        onChange={(event) =>
                                        {this.setState(prevState => ({changeTourney: {...prevState.changeTourney, insurance: event.target.value}}))}
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Button onClick={this.submitTourney}
                    style={{position:'relative', marginTop:'3rem', backgroundColor:'#052F53',
                    color:'white', width:'15%', borderRadius: '5px', textTransform: 'none', marginLeft:'40%'}}>Update</Button>
                </div>
                : 
                <div>

                    <Button variant="contained" style={{textTransform: 'none', backgroundColor: "#052F53"}} onClick={undefined}>Inscreve-te!</Button>
                </div>
                
                        }

                {this.state.MenuTourney === 1 && localStorage.getItem('loginForm') === 'admin' ?
                <div>
                    <h1>Inscritos</h1>
                </div>
                :
                <div></div>
                }
                {this.state.MenuTourney === 2 && localStorage.getItem('loginForm') === 'admin' ?
                <div>
                    <h1>Mapa de Jogos</h1>
                </div>
                :
                <div></div>
                }
                {this.state.MenuTourney === 3 && localStorage.getItem('loginForm') === 'admin' ?
                <div>
                    <h1>Calendário</h1>
                </div>
                :
                <div></div>
                }
                {this.state.MenuTourney === 4 && localStorage.getItem('loginForm') === 'admin' ?
                <div>
                    <h1>Resultados</h1>
                </div>
                :
                <div></div>
                }
                    </div>
                </div>
                :<div></div>
            </>
        )
    }
}