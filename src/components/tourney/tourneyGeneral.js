import {Grid, InputAdornment, Button, DialogTitle, DialogContent, Dialog} from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import React, {Component, useState} from "react";
import axiosConfig from "../../axiosConfig";
import LoadingPopup from "../general/Loading";
import AlertPopup from "../general/AlertPopup";
import CloseIcon from "@mui/icons-material/Close";


export default class TourneyGeneral extends Component {
    state = {
        changeTourney: this.props.changeTourney,
        loadingTourney: false,
        errorAlertTourney: {open: false, severity: 'error', errorStatus: '', description: 'Ocorreu um erro na alteração do torneio. Verifique e tente novamente.'},
        successAlertTourney: {open: false, severity: 'success', errorStatus: 'SUCESSO', description: 'O torneio foi atualizada com sucesso!'},
        openDialogRemove: false,
        openDialogRemoveName: '',
        chosenTeam: {id: '', name: ''},
        loading: false,
        errorAlert: {open: false, severity: 'error', errorStatus: '', description: 'Ocorreu um erro na eliminação do torneio. Verifique e tente novamente.'},
        successAlert: {open: false, severity: 'success', errorStatus: 'SUCESSO', description: 'O torneio foi eliminado com sucesso!'},
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
            insurance: this.state.changeTourney.seguro,
            file_url: this.state.changeTourney.file_url,
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

    removeTourney = () => {
        if(this.state.openDialogRemoveName !== undefined && this.state.openDialogRemoveName.trim() !== '')
        {
            this.setState({loading: true});
            axiosConfig.post('/deleteTourney', {
                id: this.state.chosenTeam.id,
            }, {
                headers: {
                    Authorization: 'Bearer ' + this.props.storedAuth
                }
            })
                .then(res => {
                    this.setState({openDialogRemove: false});
                    this.setState({loading: false});
                    this.setState(prevState => ({
                        successAlertTourney: {
                            ...prevState.successAlertTourney,
                            open: true
                        }
                    }))
                })
                .catch(err => {
                    this.setState({loading: false});
                    this.setState(prevState => ({
                        errorAlertTourney: {
                            ...prevState.errorAlertTourney,
                            open: true
                        }
                    }))
                })
        }
    }
    handleRemoveTeam = (team) => {
        this.setState({openDialogRemove: true});
        this.setState({chosenTeam: team});
    }
    handleCloseRemoveTeam = () => {
        this.setState({openDialogRemove: false});
    }

    render() {
        return (
            <>
                <LoadingPopup loading={this.state.loadingTourney}/>
                <LoadingPopup loading={this.state.loading}/>
                <AlertPopup errorAlert={this.state.errorAlertTourney} handleErrorAlert={this.handleErrorAlertClose} />
                <AlertPopup errorAlert={this.state.successAlertTourney} handleErrorAlert={this.handleSuccessAlertClose} />
                <Dialog open={this.state.openDialogRemove} width="25rem">
                    <DialogTitle>
                        <div style={{ fontSize: '1.5em' }}>Remover torneio</div>
                        <Button style={{position:'absolute',top:'1rem', right:'1rem',}} onClick={()=>{this.handleCloseRemoveTeam()}}><CloseIcon/></Button>
                    </DialogTitle>
                    <DialogContent style={{ justifyContent: 'center', textAlign: 'center' }}>
                        <p>Insere o nome do torneio - {this.state.chosenTeam.name} - para confirmar a remoção.</p>
                        <TextField
                            required
                            variant="outlined"
                            id="confirmRemoveNameTourney"
                            label="Nome do torneio"
                            placeholder="Nome do torneio"
                            style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'20rem', marginTop:'1rem'}}
                            onChange={(event) => this.setState({openDialogRemoveName: event.target.value})}
                            error={this.state.openDialogRemoveName !== this.state.chosenTeam.name}
                            helperText={this.state.openDialogRemoveName !== this.state.chosenTeam.name ? 'Inválido' : ''}
                        />
                        <Button onClick={this.handleCloseRemoveTeam}
                                style={{position:'relative', marginLeft:'60%', marginTop:'3rem',
                                    backgroundColor:'#8E0909', color:'white', width:'15%', borderRadius: '5px',
                                    textTransform: 'none', marginRight:'2rem'}}>Cancelar</Button>
                        <Button onClick={this.removeTourney} disabled={this.state.openDialogRemoveName !== this.state.chosenTeam.name}
                                style={{position:'relative', marginTop:'3rem', backgroundColor:'#052F53',
                                    color:'white', width:'15%', borderRadius: '5px', textTransform: 'none'}}>Confirmar</Button>
                    </DialogContent>
                </Dialog>
                <div style={{
                    width: "80%",
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
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                variant="outlined"
                                                id="fileurl"
                                                label="URL da Imagem"
                                                placeholder="URL da Imagem"
                                                style={{backgroundColor: '#FFFFFF', borderRadius: '5px'}}
                                                value={this.state.changeTourney.file_url ?? ''}
                                                onChange={(event) => {
                                                    this.setState(prevState => ({
                                                        changeTourney: {
                                                            ...prevState.changeTourney,
                                                            file_url: event.target.value
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
                                                value={this.state.changeTourney.seguro ?? ''}
                                                onChange={(event) => {
                                                    this.setState(prevState => ({
                                                        changeTourney: {
                                                            ...prevState.changeTourney,
                                                            seguro: event.target.value
                                                        }
                                                    }))
                                                }
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={2} style={{paddingTop: '25px'}}
                                      justifyContent="space-evenly"
                                      alignItems="center">
                                    <Button onClick={this.submitTourney} variant="contained"
                                            style={{position:'relative', marginTop:'3rem', backgroundColor:'#052F53',
                                                color:'white', borderRadius: '5px', textTransform: 'none'}}>Atualizar torneio</Button>
                                    <Button onClick={() => this.setState({changeTourney: this.props.changeTourney})} variant="contained"
                                            style={{position:'relative', marginTop:'2rem', backgroundColor:'#052F53',
                                                color:'white', borderRadius: '5px', textTransform: 'none', width: '90%'}}>Repor dados do torneio</Button>
                                    <Button onClick={() => this.handleRemoveTeam(this.state.changeTourney)} variant="contained"
                                            style={{position:'relative', marginTop:'2rem', backgroundColor:'#530505',
                                                color:'white', borderRadius: '5px', textTransform: 'none'}}>Eliminar torneio</Button>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}