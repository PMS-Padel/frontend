import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, {Component, useState} from 'react';
import styled from "styled-components";
import backgroundPic from "../../img/JogadorTorneiosInicialBackground.png";
import backgroundPic2 from "../../img/OrganizadorInicialBackground.png";
import AlertPopup from "../../components/general/AlertPopup";
import axiosConfig from "../../axiosConfig";
import {Navigate} from "react-router-dom";
import TourneyRow from "../../components/tourney/TourneyRow";
import NavBarAdmin from "../../components/general/NavBarAdmin";
import LoadingPopup from "../../components/general/Loading";
import {Button, Dialog, DialogContent, DialogTitle, Grid, InputAdornment} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PosterImageDefault from "../../img/PosterImageDefault.png";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";

export default class OrganizeTourney extends Component {
    state = {
        user: [],
        storedAuth: localStorage.getItem('auth') ?? sessionStorage.getItem('auth'),
        goToAdminMenu: null,
        menuCreateTourney: false,
        errorAlertTourney: {open: false, severity: 'error', errorStatus: '', description: 'Ocorreu um erro na criação do torneio. Verifique e tente novamente.'},
        successAlertTourney: {open: false, severity: 'success', errorStatus: 'SUCESSO', description: 'O torneio foi criada com sucesso!'},
        loadingTourney: false,
        dataNewTourney: {
            title: '',
            description: '',
            category: '',
            initialDate: '',
            finalDate: '',
            maxPlayers: 4,
            file: null,
            price: 0,
            local: '',
            insurance: ''
        },
        openDialog: false,
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
        if(this.state.dataNewTourney.title.trim() !== '' && this.state.dataNewTourney.title !== null &&
            this.state.dataNewTourney.category !== null &&
            this.state.dataNewTourney.initialDate.trim() !== '' && this.state.dataNewTourney.initialDate !== null &&
            this.state.dataNewTourney.finalDate.trim() !== '' && this.state.dataNewTourney.finalDate !== null &&
            this.state.dataNewTourney.maxPlayers !== null &&
            this.state.dataNewTourney.local.trim() !== '' && this.state.dataNewTourney.local !== null &&
            this.state.dataNewTourney.file.trim() !== '' && this.state.dataNewTourney.file !== null)
        {
            this.setState({loadingTourney: true});
            //console.log(this.state.dataNewTourney);
            axiosConfig.post('/createtournament', {
                name: this.state.dataNewTourney.title,
                description: (this.state.dataNewTourney.description !== null && this.state.dataNewTourney.description.trim() !== '') ? this.state.dataNewTourney.description : "--",
                tournamenttype: this.state.dataNewTourney.category,
                initdate: this.state.dataNewTourney.initialDate,
                enddate: this.state.dataNewTourney.finalDate,
                maxplayers: this.state.dataNewTourney.maxPlayers,
                fileurl: this.state.dataNewTourney.file,
                price: this.state.dataNewTourney.price ?? 0,
                location: this.state.dataNewTourney.local,
                userid: this.state.user.id,
                insurance: (this.state.dataNewTourney.insurance !== null && this.state.dataNewTourney.insurance.trim() !== '') ? this.state.dataNewTourney.insurance : "--",
            }, {
                headers: {
                    Authorization: 'Bearer ' + this.state.storedAuth
                }
            })
                .then(response => {
                    this.setState({loadingTourney: false});
                    this.setState(prevState => ({
                        successAlertTourney: {
                            ...prevState.successAlertTourney,
                            open: true
                        }
                    }))
                })
                .catch(error => {
                    this.setState({loadingTourney: false});
                    this.setState(prevState => ({
                        errorAlertTourney: {
                            ...prevState.errorAlertTourney,
                            open: true,
                            errorStatus: error.code
                        }
                    }))
                })
        }
    }

    handleErrorAlertClose = () => {
        this.setState(prevState => ({
            errorAlertTourney: {
                ...prevState.errorAlertTourney,
                open: false
            }
        }))
    }
    handleSuccessAlertClose = () => {
        this.setState(prevState => ({
            successAlertTourney: {
                ...prevState.successAlertTourney,
                open: false
            }
        }))
        window.location.reload();
    }

    render() {
        return (<>
                {(this.state.user.role === 'player' || localStorage.getItem('loginForm') === 'player') && <Navigate to="/menu-jogador"/>}
                {(this.state.storedAuth === null || this.props.storedAuth === null) && <Navigate to="/" />}
                {this.state.goToAdminMenu && <Navigate to="/menu-jogador" />}
                <LoadingPopup loading={this.props.loading}/>
                <LoadingPopup loading={this.state.loadingTourney}/>
                <AlertPopup errorAlert={this.state.errorAlertTourney} handleErrorAlert={this.handleErrorAlertClose} />
                <AlertPopup errorAlert={this.state.successAlertTourney} handleErrorAlert={this.handleSuccessAlertClose} />
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
                            left: 0}}/>
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
                            top: '15rem',
                            left: "43.5vw",
                            textTransform: 'none',
                            zIndex: "1"}}>Criar Torneio</Button>
                        <div style={{
                            width: "94%",
                            height: "90%",
                            borderRadius: "1%",
                            position: 'absolute',
                            zIndex: 0,
                            objectFit: "cover",
                            top: '22rem',
                            left: 45,
                            backgroundColor: "#FFFFFF"
                        }}>
                            <h1 style={{fontSize: "40px", color: "#052F53", paddingLeft: "3%"}}>Os teus torneios criados mais recentes</h1>
                            <TourneyRow maxLength={undefined} adminId={this.state.user.id} userId={undefined}/>
                        </div>
                    </div>
                    :
                    <div style={{position: "relative", top: 0, left: 0}}>
                        <Dialog open={this.state.openDialog} width="25rem">
                            <DialogTitle>
                                <div style={{ fontSize: '1.5em' }}>Inserir URL</div>
                                <Button style={{position:'absolute',top:'1rem', right:'1rem',}} onClick={()=>{this.setState({openDialog: false})}}><CloseIcon/></Button>
                            </DialogTitle>
                            <DialogContent style={{ justifyContent: 'center', textAlign: 'center' }}>
                                <TextField
                                    required
                                    variant="outlined"
                                    id="fileUrl"
                                    label="Imagem (URL)"
                                    placeholder="Imagem (URL)"
                                    style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'20rem', marginTop:'1rem'}}
                                    onChange={(event) => this.setState(prevState => ({dataNewTourney: {...prevState.dataNewTourney, file: event.target.value}}))}
                                />
                            </DialogContent>
                        </Dialog>
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
                                        <Button style={{textTransform: 'none'}} component="label" onClick={()=>{this.setState({openDialog: true})}}>
                                            <img src={this.state.dataNewTourney.file ?? PosterImageDefault} width={350} height={350} alt={"Imagem acerca de " + this.state.dataNewTourney.title}/>
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
                                                    //required
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
                                                    id="categoria_select"
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
                                                    //required
                                                    variant="outlined"
                                                    type="number"
                                                    inputProps={{
                                                        min: 0,
                                                        step: 0.5,
                                                    }}
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">€</InputAdornment>,
                                                    }}
                                                    id="preco"
                                                    label="Preço de entrada"
                                                    placeholder="Preço de entrada"
                                                    defaultValue={0}
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
                                                    inputProps=
                                                        {{ max: this.state.dataNewTourney.finalDate ?
                                                                new Date(this.state.dataNewTourney.finalDate).toISOString().slice(0, 10) : '' }}
                                                    variant="outlined"
                                                    id="data_inicio"
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
                                                    inputProps=
                                                        {{ min: this.state.dataNewTourney.initialDate ?
                                                                new Date(this.state.dataNewTourney.initialDate).toISOString().slice(0, 10) : '' }}
                                                    variant="outlined"
                                                    id="data_fim"
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
                                                    id="max_jogadores"
                                                    label="Número máximo de jogadores"
                                                    placeholder="Número máximo de jogadores"
                                                    style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                                                    onChange={(event) =>
                                                        {this.setState(prevState => ({dataNewTourney: {...prevState.dataNewTourney, maxPlayers: event.target.value}}))}
                                                    }
                                                    defaultValue='4'
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
                                                    //required
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
                                <Button onClick={this.handleMenuCreateTourney}
                                        style={{position:'relative', marginLeft:'60%', marginTop:'3rem',
                                            backgroundColor:'#8E0909', color:'white', width:'15%', borderRadius: '5px',
                                            textTransform: 'none', marginRight:'2rem'}}>Cancelar</Button>
                                <Button onClick={this.submitTourney}
                                        style={{position:'relative', marginTop:'3rem', backgroundColor:'#052F53',
                                            color:'white', width:'15%', borderRadius: '5px', textTransform: 'none'}}>Confirmar</Button>
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