import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, {Component, useState} from 'react';
import styled from "styled-components";
import NavBar from "../../components/general/NavBar";
import Row from "../../components/general/Row";
import App from "../../App";
import backgroundPic from "../../img/JogadorTorneiosInicialBackground.png";
import backgroundPic2 from "../../img/OrganizadorInicialBackground.png";
import AlertPopup from "../../components/general/AlertPopup";
import axiosConfig from "../../axiosConfig";
import {Navigate} from "react-router-dom";
import TourneyRow from "../../components/tourney/TourneyRow";
import NavBarAdmin from "../../components/general/NavBarAdmin";
import LoadingPopup from "../../components/general/Loading";
import {Button, Grid, InputAdornment} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PosterImageDefault from "../../img/PosterImageDefault.png";
import TextField from "@mui/material/TextField";
import {helperTextName} from "../../autentication/dataConditions";
import MenuItem from "@mui/material/MenuItem";

const AccountButton = styled(AccountCircleIcon)`
  color: white;
  position: absolute; 
  top: 0;
  right: 10%
`

export default class OrganizeTourney extends Component {
    state = {
        user: [],
        storedAuth: localStorage.getItem('auth') ?? sessionStorage.getItem('auth'),
        goToAdminMenu: null,
        menuCreateTourney: false,
        dataNewTourney: {
            title: '',
            description: '',
            category: '',
            initialDate: '',
            finalDate: '',
            maxPlayers: undefined,
            file: null,
            price: null,
            local: '',
            insurance: ''}
    };
    componentDidMount() {
        if(this.state.storedAuth !== null) {
            this.getUser();
            this.props.setStoredAuth(this.state.storedAuth);
            localStorage.setItem('loginForm', 'admin');
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
    handleMenuCreateTourney = () => {
        this.setState({menuCreateTourney: !this.state.menuCreateTourney});
    }

    /*
    getTodayDate = () => {
        let dateNow = new Date();
        let monthNumber = dateNow.getMonth() + 1;
        let dayNumber = dateNow.getDate();
        let monthString = monthNumber.toString();
        let dayString = dayNumber.toString();
        if(monthNumber < 10)
        {
            monthString = '0' + monthNumber.toString();
        }
        if(dayNumber < 10)
        {
            dayString = '0' + dayNumber.toString();
        }
        return dateNow.getFullYear() + "-" + monthString + "-" + dayString;
    }
     */

    getCategorias = () => {
        return [
            {
                value: '',
                label: '',
            },
            {
                value: 'Misto',
                label: 'Misto',
            },
            {
                value: 'Masculino',
                label: 'Masculino',
            },
            {
                value: 'Feminino',
                label: 'Feminino',
            },
        ];
    }

    render() {
        return (<>
                {(this.state.user.role === 'player' || localStorage.getItem('loginForm') === 'player') && <Navigate to="/menu-jogador"/>}
                {(this.state.storedAuth === null || this.props.storedAuth === null) && <Navigate to="/" />}
                {this.state.goToAdminMenu && <Navigate to="/menu-jogador" />}
                <LoadingPopup loading={this.props.loading}/>
                <NavBarAdmin logoutAccount={this.props.logoutAccount} goToAdminMenu={this.setTrueGoToAdminMenu}/>
                {this.state.menuCreateTourney === false ?
                    <div style={{position: "relative", top: 0, left: 0}}>
                        <img src={localStorage.getItem('loginForm') === 'admin' ? backgroundPic2 : backgroundPic}
                             alt="background" style={{
                            width: "100%",
                            position: 'relative',
                            zIndex: -10,
                            objectFit: "cover",
                            top: 0,
                            left: 0
                        }}/>
                        <h1 style={{
                            textAlign: 'center',
                            fontSize: "40px",
                            color: "white",
                            position: 'absolute',
                            bottom: "90%",
                            left: "5%",
                            zIndex: "-1"
                        }}>Organiza os melhores torneios!</h1>
                        <Button onClick={this.handleMenuCreateTourney} style={{
                            textAlign: 'center',
                            fontSize: "30px",
                            color: "#530505",
                            backgroundColor: "white",
                            position: 'absolute',
                            bottom: "85%",
                            left: "43.5vw",
                            textTransform: 'none',
                            zIndex: "1"}}>Criar Torneio</Button>
                        <div style={{
                            width: "94%",
                            height: "75%",
                            borderRadius: "1%",
                            position: 'absolute',
                            zIndex: 0,
                            objectFit: "cover",
                            top: 550,
                            left: 45,
                            backgroundColor: "#FFFFFF"
                        }}>
                            <TourneyRow maxLength={undefined}/>
                        </div>
                    </div>
                    :
                    <div style={{position: "relative", top: 0, left: 0}}>
                        <img src={localStorage.getItem('loginForm') === 'admin' ? backgroundPic2 : backgroundPic}
                             alt="background" style={{
                            width: "100%",
                            position: 'relative',
                            zIndex: -10,
                            objectFit: "cover",
                            top: 0,
                            left: 0
                        }}/>
                        <Button onClick={this.handleMenuCreateTourney} style={{position:'absolute',left:'5px',top:'80px',color:'white'}}><ArrowBackIcon/></Button>
                        <div style={{
                            width: "82%",
                            height: "25%",
                            borderRadius: "1%",
                            position: 'absolute',
                            zIndex: 0,
                            objectFit: "cover",
                            top: 250,
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
                                    <Grid item xs={4}>
                                        <Button style={{textTransform: 'none'}} component="label">
                                            <input hidden accept="image/*" type="file" required
                                               onChange={(e) => this.setState(prevState => ({dataNewTourney: {...prevState.dataNewTourney, file: URL.createObjectURL(e.target.files[0])}}))} />
                                            <img src={this.state.dataNewTourney.file ?? PosterImageDefault} width={350} height={350} alt={"Imagem acerca de " + ""}/>
                                        </Button>
                                    </Grid>
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
                                                    style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                                    onChange={(event) =>
                                                        {this.setState(prevState => ({dataNewTourney: {...prevState.dataNewTourney, title: event.target.value}}))}
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
                                                    style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                                    onChange={(event) =>
                                                        {this.setState(prevState => ({dataNewTourney: {...prevState.dataNewTourney, description: event.target.value}}))}
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="categoria-select"
                                                    select
                                                    label="Categoria"
                                                    required
                                                    defaultValue=''
                                                    onChange={(event) =>
                                                        {this.setState(prevState => ({dataNewTourney: {...prevState.dataNewTourney, category: event.target.value}}))}
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
                                                    style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                                    onChange={(event) =>
                                                        {this.setState(prevState => ({dataNewTourney: {...prevState.dataNewTourney, price: event.target.value}}))}
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
                                                    variant="outlined"
                                                    id="data-inicio"
                                                    type="date"
                                                    label="Data início"
                                                    placeholder="Data início"
                                                    style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                                    onChange={(event) =>
                                                        {this.setState(prevState => ({dataNewTourney: {...prevState.dataNewTourney, initialDate: event.target.value}}))}
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    InputLabelProps={{ shrink: true }}
                                                    variant="outlined"
                                                    id="data-fim"
                                                    type="date"
                                                    label="Data fim"
                                                    placeholder="Data fim"
                                                    style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                                    onChange={(event) =>
                                                        {this.setState(prevState => ({dataNewTourney: {...prevState.dataNewTourney, finalDate: event.target.value}}))}
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    variant="outlined"
                                                    type="number"
                                                    InputProps={{ inputProps: { min: 4 } }}
                                                    id="max-jogadores"
                                                    label="Número máximo de jogadores"
                                                    placeholder="Número máximo de jogadores"
                                                    style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                                    onChange={(event) =>
                                                        {this.setState(prevState => ({dataNewTourney: {...prevState.dataNewTourney, maxPlayers: event.target.value}}))}
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    variant="outlined"
                                                    id="localizacao"
                                                    label="Localização"
                                                    placeholder="Localização"
                                                    style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                                    onChange={(event) =>
                                                    {this.setState(prevState => ({dataNewTourney: {...prevState.dataNewTourney, local: event.target.value}}))}
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    required
                                                    variant="outlined"
                                                    id="seguro"
                                                    label="Seguro"
                                                    placeholder="Seguro"
                                                    style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                                    onChange={(event) =>
                                                    {this.setState(prevState => ({dataNewTourney: {...prevState.dataNewTourney, insurance: event.target.value}}))}
                                                    }
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                }
                <AlertPopup errorAlert={this.props.errorAlertAuth} handleErrorAlert={this.props.handleErrorAlertCloseAuth} />
                <AlertPopup errorAlert={this.props.errorAlertLogout} handleErrorAlert={this.props.handleErrorAlertCloseLogout} />
            </>
        )
    }
}