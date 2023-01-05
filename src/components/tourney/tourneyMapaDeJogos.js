import React, { useState, useEffect, useRef, } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
import {Button, Dialog, DialogContent, DialogTitle} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axiosConfig from "../../axiosConfig";
import moment from "moment/moment";
import LoadingPopup from "../general/Loading";
import AlertPopup from "../general/AlertPopup";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

export default function TourneyMapaDeJogos({ tourney, storedAuth }) {
    const [dataTeams, setDataTeams] = useState([]);
    const [update, setUpdate] = useState(false);
    const [games, setGames] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogAdd, setOpenDialogAdd] = useState(false);
    const [openDialogRemove, setOpenDialogRemove] = useState(false);
    const [openDialogRemoveName, setOpenDialogRemoveName] = useState('');
    const [chosenTeam, setChosenTeam] = useState({
        id: '',
        campo_id: '',
        start_at: '',
        team_id1: '',
        team_id2: '',
        team1: {
            id: '',
            name: ''
        },
        team2: {
            id: '',
            name: ''
        },
        campo: {
            id: '',
            name: '',
        }
    });
    const tableRef = useRef(null);

    const [loading, setLoading] = React.useState(false);
    const [errorAlert, setErrorAlert] = useState({open: false, severity: 'error', errorStatus: '', description: 'Ocorreu um erro ao atualizar o jogo. Verifique e tente novamente.'});
    const handleErrorAlertClose = () => {
        setErrorAlert({...errorAlert, open: false});
    };
    const [successAlert, setSuccessAlert] = React.useState({open: false, severity: 'success', errorStatus: 'SUCCESSO', description: 'O jogo foi atualizado com sucesso!'});
    const handleSuccessAlertClose = () => {
        setSuccessAlert({...successAlert, open: false});
        window.location.reload();
    };
    const [campos, setCampos] = useState([
        {
            value: 1,
            label: 'Grupo São Roque',
        },
        {
            value: 2,
            label: 'Alberto Oculista',
        },
    ]);

    useEffect(() => {
        //console.log(tourney)
        axiosConfig.get(`getteams/${tourney.id}`)
            .then((res) => {
                let { data } = res;
                setDataTeams(data)
                //console.log(data)
            })
            .catch((error) => false);
        axiosConfig.get(`get-tournament-games/${tourney.id}`)
            .then((res) => {
                let { data } = res;
                setGames(data)
                setUpdate(true)
            })
            .catch((error) => false);
    }, [tourney])

    useEffect(() => {
        games.sort((a, b) => {
            if (moment(a.start_at).isBefore(moment(b.start_at))) {
                return -1
            }
            return 1
        })
    }, [games])

    function updateTeam() {
        if(chosenTeam.campo_id !== null || chosenTeam.start_at !== null || chosenTeam.team_id1 !== null || chosenTeam.team_id2 !== null) {
            //console.log(chosenTeam.player1_id.level);
            //console.log(typeof chosenTeam.player1_id.level);
            setLoading(true);
            axiosConfig.post('/updategame', {
                id: chosenTeam.id,
                campo_id: chosenTeam.campo_id,
                start_at: chosenTeam.start_at,
                team_id1: chosenTeam.team_id1,
                team_id2: chosenTeam.team_id2,
            }, {
                headers: {
                    Authorization: 'Bearer ' + storedAuth
                }
            })
                .then(res => {
                    setOpenDialog(false);
                    setLoading(false);
                    setSuccessAlert({...successAlert, description: 'O jogo foi atualizado com sucesso!', open: true});
                })
                .catch(err => {
                    setLoading(false);
                    setErrorAlert({...errorAlert, description: 'Ocorreu um erro ao atualizar o jogo. Verifique e tente novamente.', open: true, errorStatus: err.code});
                })
        }
    }

    function removeTeam() {
        if(openDialogRemoveName !== undefined && openDialogRemoveName.trim() !== '')
        {
            setLoading(true);
            //console.log(chosenTeam.id);
            axiosConfig.post('/deletegame', {
                id: chosenTeam.id,
            }, {
                headers: {
                    Authorization: 'Bearer ' + storedAuth
                }
            })
                .then(res => {
                    setOpenDialogRemove(false);
                    setLoading(false);
                    setSuccessAlert({...successAlert, description: 'O jogo foi removido com sucesso!', open: true});
                })
                .catch(err => {
                    setLoading(false);
                    setErrorAlert({...errorAlert, description: 'Ocorreu um erro ao remover o jogo. Verifique e tente novamente.', open: true, errorStatus: err.code});
                })
        }
    }

    function addTeam() {
        if(chosenTeam.campo_id !== null && chosenTeam.start_at !== null && chosenTeam.team_id1 !== null && chosenTeam.team_id2 !== null)
        {
            setLoading(true);
            //console.log(chosenTeam.id);
            axiosConfig.post('/creategame', {
                tourney_id: tourney.id,
                campo_id: chosenTeam.campo_id,
                start_at: chosenTeam.start_at,
                team_id1: chosenTeam.team_id1,
                team_id2: chosenTeam.team_id2,
            }, {
                headers: {
                    Authorization: 'Bearer ' + storedAuth
                }
            })
                .then(res => {
                    setOpenDialogAdd(false);
                    setLoading(false);
                    setSuccessAlert({...successAlert, description: 'O jogo foi adicionado com sucesso!', open: true});
                })
                .catch(err => {
                    setLoading(false);
                    setErrorAlert({...errorAlert, description: 'Ocorreu um erro ao adicionar o jogo. Verifique e tente novamente.', open: true, errorStatus: err.code});
                })
        }
    }

    function handleAddTeam() {
        setOpenDialogAdd(true);
        //setChosenTeam({team});
    }

    function handleEditTeam(team) {
        setOpenDialog(true);
        setChosenTeam(team);
    }

    function handleRemoveTeam(team) {
        setOpenDialogRemove(true);
        setChosenTeam(team);
    }

    function handleCloseAddTeam() {
        setOpenDialog(false);
    }
    function handleCloseEditTeam() {
        setOpenDialog(false);
    }
    function handleCloseRemoveTeam() {
        setOpenDialogRemove(false);
    }

    if (update) {
        return (
            <>
                <LoadingPopup loading={loading}/>
                <AlertPopup errorAlert={errorAlert} handleErrorAlert={handleErrorAlertClose} />
                <AlertPopup errorAlert={successAlert} handleErrorAlert={handleSuccessAlertClose} />
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
                    color: localStorage.getItem('loginForm') === 'admin' ? "#530508" : "#052F53"
                }}>
                    <DownloadTableExcel
                        filename={"ListaJogosTorneio_" + tourney.name}
                        sheet="ListaJogos"
                        currentTableRef={tableRef.current}
                    >
                        <Button variant="contained" style={{textTransform: 'none',
                            backgroundColor: localStorage.getItem('loginForm') === 'admin' ? "#530508" : "#052F53",
                            marginTop: "2rem"}}>
                            Exportar para Excel
                        </Button>
                    </DownloadTableExcel>
                    {!((new Date()).getTime() < (new Date(tourney.init_date)).getTime()) && localStorage.getItem('loginForm') === 'admin' &&
                        <Button variant="contained"
                                onClick={() => handleAddTeam()}
                                style={{
                                    textTransform: 'none',
                                    margin: "0px 1rem",
                                    backgroundColor: localStorage.getItem('loginForm') === 'admin' ? "#530508" : "#052F53",
                                    marginTop: "2rem"
                                }}>
                            Adicionar jogo
                        </Button>
                    }
                    <table ref={tableRef} style={{margin:'2rem', justifyContent:'center', textAlign: 'center',
                        color: localStorage.getItem('loginForm') === 'admin' ? "#530508" : "#052F53",}} hidden>
                        <thead>
                        <tr>
                            <th>Dia e Hora</th>
                            <th>Campo</th>
                            <th>Nome da Equipa 1</th>
                            <th>Jogadores da Equipa 1</th>
                            <th>Nome da Equipa 2</th>
                            <th>Jogadores da Equipa 2</th>
                        </tr>
                        </thead>
                        <tbody>
                        {games?.map((res)=>(
                            <tr key={res.id}>
                                <td style={{ padding: "0 15px" }}>{res.start_at}</td>
                                <td style={{ padding: "0 15px" }}>{res.campo.name}</td>
                                <td style={{ padding: "0 15px" }}>{res.team1.name}</td>
                                <td style={{ padding: "0 15px" }}>{res.team1.player1.name} | {res.team1.player2.name} </td>
                                <td style={{ padding: "0 15px" }}>{res.team2.name}</td>
                                <td style={{ padding: "0 15px" }}>{res.team2.player1.name} | {res.team2.player2.name} </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <table style={{margin:'2rem', justifyContent:'center', textAlign: 'center',
                        color: localStorage.getItem('loginForm') === 'admin' ? "#530508" : "#052F53",}}>
                        <thead>
                        <tr>
                            <th>Dia e Hora</th>
                            <th>Campo</th>
                            <th>Nome da Equipa 1</th>
                            <th>Jogadores da Equipa 1</th>
                            <th>Nome da Equipa 2</th>
                            <th>Jogadores da Equipa 2</th>
                            {!((new Date()).getTime() < (new Date(tourney.init_date)).getTime()) && localStorage.getItem('loginForm') === 'admin' &&
                                <th>Edição</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {games?.map((res)=>(
                            <tr key={res.id}>
                                <td style={{ padding: "0 15px" }}>{res.start_at}</td>
                                <td style={{ padding: "0 15px" }}>{res.campo.name}</td>
                                <td style={{ padding: "0 15px" }}>{res.team1.name}</td>
                                <td style={{ padding: "0 15px" }}>{res.team1.player1.name} | {res.team1.player2.name} </td>
                                <td style={{ padding: "0 15px" }}>{res.team2.name}</td>
                                <td style={{ padding: "0 15px" }}>{res.team2.player1.name} | {res.team2.player2.name} </td>
                                {!((new Date()).getTime() < (new Date(tourney.init_date)).getTime()) && localStorage.getItem('loginForm') === 'admin' &&
                                    <td style={{ padding: "0 15px" }}>
                                        <Button variant="contained"
                                                onClick={() => handleEditTeam(res)}
                                                style={{textTransform: 'none', margin: "0px 1rem",
                                                    backgroundColor: localStorage.getItem('loginForm') === 'admin' ? "#530508" : "#052F53"}}>
                                            Editar
                                        </Button>
                                        <Button variant="contained"
                                                onClick={() => handleRemoveTeam(res)}
                                                style={{textTransform: 'none', margin: "0px 1rem",
                                                    backgroundColor: localStorage.getItem('loginForm') === 'admin' ? "#530508" : "#052F53"}}>
                                            Remover
                                        </Button>
                                    </td>}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <Dialog open={openDialogAdd} width="25rem">
                    <DialogTitle>
                        <div style={{ fontSize: '1.5em' }}>Adicionar jogo</div>
                        <Button style={{position:'absolute',top:'1rem', right:'1rem',}} onClick={()=>{handleCloseAddTeam()}}><CloseIcon/></Button>
                    </DialogTitle>
                    <DialogContent style={{ justifyContent: 'center', textAlign: 'center' }}>
                        <TextField
                            required
                            select
                            variant="outlined"
                            id="campoEditId"
                            label="Campo"
                            placeholder="Não definido"
                            style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'20rem', marginTop:'1rem'}}
                            //value={chosenTeam.campo.id ?? ''}
                            onChange={(event) => setChosenTeam({...chosenTeam, campo_id: event.target.value})}
                        >
                            {campos?.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            required
                            variant="outlined"
                            id="datetimeJogo"
                            label="Data e tempo do jogo"
                            placeholder="Não definido"
                            style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'20rem', marginTop:'1rem'}}
                            //value={chosenTeam.start_at ?? ''}
                            onChange={(event) => setChosenTeam({...chosenTeam, start_at: event.target.value})}
                        />
                        <TextField
                            required
                            select
                            variant="outlined"
                            id="idteam1"
                            label="Equipa 1"
                            placeholder="Não definido"
                            style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'20rem', marginTop:'1rem'}}
                            //value={chosenTeam.team_id1 ?? ''}
                            onChange={(event) => setChosenTeam({...chosenTeam, team_id1: event.target.value})}
                        >
                            {dataTeams?.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            required
                            select
                            variant="outlined"
                            id="idteam2"
                            label="Equipa 2"
                            placeholder="Não definido"
                            style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'20rem', marginTop:'1rem'}}
                            //value={chosenTeam.team_id2 ?? ''}
                            onChange={(event) => setChosenTeam({...chosenTeam, team_id2: event.target.value})}
                        >
                            {dataTeams?.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button onClick={handleCloseAddTeam}
                                style={{position:'relative', marginLeft:'60%', marginTop:'3rem',
                                    backgroundColor:'#8E0909', color:'white', width:'15%', borderRadius: '5px',
                                    textTransform: 'none', marginRight:'2rem'}}>Cancelar</Button>
                        <Button onClick={addTeam}
                                style={{position:'relative', marginTop:'3rem', backgroundColor:'#052F53',
                                    color:'white', width:'15%', borderRadius: '5px', textTransform: 'none'}}>Adicionar</Button>
                    </DialogContent>
                </Dialog>
                <Dialog open={openDialog} width="25rem">
                    <DialogTitle>
                        <div style={{ fontSize: '1.5em' }}>Editar jogo</div>
                        <Button style={{position:'absolute',top:'1rem', right:'1rem',}} onClick={()=>{handleCloseEditTeam()}}><CloseIcon/></Button>
                    </DialogTitle>
                    <DialogContent style={{ justifyContent: 'center', textAlign: 'center' }}>
                        <p>Jogo: {chosenTeam.team1.name + ' vs ' + chosenTeam.team2.name}</p>
                        <p>Campo: {chosenTeam.campo.name}</p>
                        <p>Data: {chosenTeam.start_at}</p>
                        <TextField
                            required
                            select
                            variant="outlined"
                            id="campoEditId"
                            label="Campo"
                            placeholder="Não definido"
                            style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'20rem', marginTop:'1rem'}}
                            value={chosenTeam.campo.id ?? ''}
                            onChange={(event) => setChosenTeam({...chosenTeam, campo_id: event.target.value})}
                        >
                            {campos?.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            required
                            variant="outlined"
                            id="datetimeJogo"
                            label="Data e tempo do jogo"
                            placeholder="Não definido"
                            style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'20rem', marginTop:'1rem'}}
                            value={chosenTeam.start_at ?? ''}
                            onChange={(event) => setChosenTeam({...chosenTeam, start_at: event.target.value})}
                        />
                        <TextField
                            required
                            select
                            variant="outlined"
                            id="idteam1"
                            label="Equipa 1"
                            placeholder="Não definido"
                            style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'20rem', marginTop:'1rem'}}
                            value={chosenTeam.team_id1 ?? ''}
                            onChange={(event) => setChosenTeam({...chosenTeam, team_id1: event.target.value})}
                        >
                            {dataTeams?.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            required
                            select
                            variant="outlined"
                            id="idteam2"
                            label="Equipa 2"
                            placeholder="Não definido"
                            style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'20rem', marginTop:'1rem'}}
                            value={chosenTeam.team_id2 ?? ''}
                            onChange={(event) => setChosenTeam({...chosenTeam, team_id2: event.target.value})}
                        >
                            {dataTeams?.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Button onClick={handleCloseEditTeam}
                                style={{position:'relative', marginLeft:'60%', marginTop:'3rem',
                                    backgroundColor:'#8E0909', color:'white', width:'15%', borderRadius: '5px',
                                    textTransform: 'none', marginRight:'2rem'}}>Cancelar</Button>
                        <Button onClick={updateTeam}
                                style={{position:'relative', marginTop:'3rem', backgroundColor:'#052F53',
                                    color:'white', width:'15%', borderRadius: '5px', textTransform: 'none'}}>Confirmar</Button>
                    </DialogContent>
                </Dialog>
                <Dialog open={openDialogRemove} width="25rem">
                    <DialogTitle>
                        <div style={{ fontSize: '1.5em' }}>Remover jogo</div>
                        <Button style={{position:'absolute',top:'1rem', right:'1rem',}} onClick={()=>{handleCloseRemoveTeam()}}><CloseIcon/></Button>
                    </DialogTitle>
                    <DialogContent style={{ justifyContent: 'center', textAlign: 'center' }}>
                        <p>Insere o nome da primeira equipa do jogo - {chosenTeam.team1.name} - para confirmar a remoção.</p>
                        <TextField
                            required
                            variant="outlined"
                            id="confirmRemoveNameTeam"
                            label="Nome da equipa 1"
                            placeholder="Nome da equipa 1"
                            style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'20rem', marginTop:'1rem'}}
                            onChange={(event) => setOpenDialogRemoveName(event.target.value)}
                            error={openDialogRemoveName !== chosenTeam.team1.name}
                            helperText={openDialogRemoveName !== chosenTeam.team1.name ? 'Inválido' : ''}
                        />
                        <Button onClick={handleCloseRemoveTeam}
                                style={{position:'relative', marginLeft:'60%', marginTop:'3rem',
                                    backgroundColor:'#8E0909', color:'white', width:'15%', borderRadius: '5px',
                                    textTransform: 'none', marginRight:'2rem'}}>Cancelar</Button>
                        <Button onClick={removeTeam} disabled={openDialogRemoveName !== chosenTeam.team1.name}
                                style={{position:'relative', marginTop:'3rem', backgroundColor:'#052F53',
                                    color:'white', width:'15%', borderRadius: '5px', textTransform: 'none'}}>Confirmar</Button>
                    </DialogContent>
                </Dialog>
            </>
        )
    }
    else
    {
        return(
            <>
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
                    color: localStorage.getItem('loginForm') === 'admin' ? "#530508" : "#052F53"
                }}>
                    <h1>Carregando mapa de jogos...</h1>
                </div>
            </>
        )
    }
}