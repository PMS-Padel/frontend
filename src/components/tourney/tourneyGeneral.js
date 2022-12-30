import {Grid, InputAdornment, Button} from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import React, {Component} from "react";
import axiosConfig from "../../axiosConfig";
import LoadingPopup from "../general/Loading";
import AlertPopup from "../general/AlertPopup";


export default class TourneyGeneral extends Component {
    state = {
        changeTourney: [],
        loadingTourney: false,
        errorAlertTourney: {open: false, severity: 'error', errorStatus: '', description: 'Ocorreu um erro na alteração do torneio. Verifique e tente novamente.'},
        successAlertTourney: {open: false, severity: 'success', errorStatus: 'SUCESSO', description: 'O torneio foi atualizada com sucesso!'},
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.changeTourney !== this.props.changeTourney)
        {
            this.setState({changeTourney: this.props.changeTourney});
        }
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
        //console.log(this.state.changeTourney);
        this.setState({loadingTourney: true});
        axiosConfig.post('/updatetournament', {
            id: this.state.changeTourney.id,
            name: this.state.changeTourney.name,
            description: this.state.changeTourney.description,
            tournamenttype: this.state.changeTourney.tournament_type_id,
            init_date: this.state.changeTourney.init_date,
            end_date: this.state.changeTourney.end_date,
            maxplayers: this.state.changeTourney.max_players,
            price: this.state.changeTourney.price,
            location: this.state.changeTourney.location,
        }, {
            headers: {
                Authorization: 'Bearer ' + this.props.storedAuth
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

    render() {
        return (
            <>
                <LoadingPopup loading={this.state.loadingTourney}/>
                <AlertPopup errorAlert={this.state.errorAlertTourney} handleErrorAlert={this.handleErrorAlertClose} />
                <AlertPopup errorAlert={this.state.successAlertTourney} handleErrorAlert={this.handleSuccessAlertClose} />
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
                    <div style={{padding: "20px",}}>
                        <div>
                            <Grid container spacing={2}
                                  justifyContent="center"
                                  alignItems="center"
                                  sx={{
                                      '& .MuiTextField-root': {m: 1, width: '25ch'},
                                  }}>

                                <Grid item xs={4} style={{paddingTop: '25px'}}>
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
                                                style={{backgroundColor: '#FFFFFF', borderRadius: '5px'}}
                                                onChange={(event) => {
                                                    this.setState(prevState => ({
                                                        changeTourney: {
                                                            ...prevState.changeTourney,
                                                            name: event.target.value
                                                        }
                                                    }))
                                                }
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                multiline
                                                rows={4}
                                                variant="outlined"
                                                id="descricao"
                                                label="Descrição"
                                                placeholder="Descrição"
                                                value={this.state.changeTourney.description ?? ''}
                                                style={{backgroundColor: '#FFFFFF', borderRadius: '5px'}}
                                                onChange={(event) => {
                                                    this.setState(prevState => ({
                                                        changeTourney: {
                                                            ...prevState.changeTourney,
                                                            description: event.target.value
                                                        }
                                                    }))
                                                }
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="categoria_select"
                                                select
                                                label="Categoria"
                                                required
                                                value={this.state.changeTourney.tournament_type_id ?? ''}
                                                //defaultValue={2}
                                                onChange={(event) => {
                                                    this.setState(prevState => ({
                                                        changeTourney: {
                                                            ...prevState.changeTourney,
                                                            tournament_type_id: event.target.value
                                                        }
                                                    }))
                                                }
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
                                                style={{backgroundColor: '#FFFFFF', borderRadius: '5px'}}
                                                onChange={(event) => {
                                                    this.setState(prevState => ({
                                                        changeTourney: {
                                                            ...prevState.changeTourney,
                                                            price: event.target.value
                                                        }
                                                    }))
                                                }
                                                }
                                            />
                                        </Grid>

                                    </Grid>
                                </Grid>
                                <Grid item xs={4} style={{paddingTop: '25px'}}>
                                    <Grid container spacing={2}
                                          justifyContent="center"
                                          alignItems="center">
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                InputLabelProps={{shrink: true}}
                                                inputProps=
                                                    {{
                                                        max: this.state.changeTourney.end_date ?
                                                            new Date(this.state.changeTourney.end_date).toISOString().slice(0, 10) : ''
                                                    }}
                                                variant="outlined"
                                                id="data_inicio"
                                                type="date"
                                                label="Data início"
                                                placeholder="Data início"
                                                value={this.state.changeTourney.init_date !== undefined ? this.state.changeTourney.init_date.substring(0, 10) : ''}

                                                style={{backgroundColor: '#FFFFFF', borderRadius: '5px'}}
                                                onChange={(event) => {
                                                    //console.log(this.state.changeTourney.init_date.substring(0, 10))
                                                    this.setState(prevState => ({
                                                        changeTourney: {
                                                            ...prevState.changeTourney,
                                                            init_date: event.target.value
                                                        }
                                                    }))
                                                }
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                InputLabelProps={{shrink: true}}
                                                inputProps=
                                                    {{
                                                        min: this.state.changeTourney.init_date ?
                                                            new Date(this.state.changeTourney.init_date).toISOString().slice(0, 10) : ''
                                                    }}
                                                variant="outlined"
                                                id="data_fim"
                                                type="date"
                                                label="Data fim"
                                                placeholder="Data fim"
                                                value={this.state.changeTourney.end_date !== undefined ? new Date(this.state.changeTourney.end_date).toISOString().slice(0, 10) : ''}
                                                style={{backgroundColor: '#FFFFFF', borderRadius: '5px'}}
                                                onChange={(event) => {
                                                    this.setState(prevState => ({
                                                        changeTourney: {
                                                            ...prevState.changeTourney,
                                                            end_date: event.target.value
                                                        }
                                                    }))
                                                }
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                variant="outlined"
                                                type="number"
                                                InputProps={{inputProps: {min: 4}}}
                                                id="max_jogadores"
                                                label="Número máximo de jogadores"
                                                placeholder="Número máximo de jogadores"
                                                value={this.state.changeTourney.max_players ?? ''}
                                                style={{backgroundColor: '#FFFFFF', borderRadius: '5px'}}
                                                onChange={(event) => {
                                                    this.setState(prevState => ({
                                                        changeTourney: {
                                                            ...prevState.changeTourney,
                                                            max_players: event.target.value
                                                        }
                                                    }))
                                                }
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
                                                value={this.state.changeTourney.location ?? ''}
                                                style={{backgroundColor: '#FFFFFF', borderRadius: '5px'}}
                                                onChange={(event) => {
                                                    this.setState(prevState => ({
                                                        changeTourney: {
                                                            ...prevState.changeTourney,
                                                            location: event.target.value
                                                        }
                                                    }))
                                                }
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField

                                                variant="outlined"
                                                id="seguro"
                                                label="Seguro"
                                                placeholder="Seguro"
                                                style={{backgroundColor: '#FFFFFF', borderRadius: '5px'}}
                                                value={this.state.changeTourney.insurance ?? ''}
                                                onChange={(event) => {
                                                    this.setState(prevState => ({
                                                        changeTourney: {
                                                            ...prevState.changeTourney,
                                                            insurance: event.target.value
                                                        }
                                                    }))
                                                }
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Button onClick={this.submitTourney}
                                        style={{position:'relative', marginTop:'3rem', backgroundColor:'#052F53',
                                            color:'white', width:'15%', borderRadius: '5px', textTransform: 'none', marginLeft:'43%'}}>Update</Button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}