import React, {useState, useEffect, useRef,} from "react";
import {Button, Dialog, DialogContent, DialogTitle} from "@mui/material";
import ScheduleTable from "../ScheduleTable";
import axiosConfig from "../../axiosConfig";
import moment from "moment/moment";
import {DownloadTableExcel} from "react-export-table-to-excel";
import LoadingPopup from "../general/Loading";
import AlertPopup from "../general/AlertPopup";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function TourneyResultados({tourney, storedAuth}) {

    const [dataTeams, setDataTeams] = useState([]);
    const [update, setUpdate] = useState(false);
    const [games, setGames] = useState([]);
    const tableRef = useRef(null);

    const [openDialog, setOpenDialog] = useState(false);
    const [chosenTeam, setChosenTeam] = useState({
        id: '',
        team1: {
            id: '',
            name: ''
        },
        team2: {
            id: '',
            name: ''
        },
        team1_points: '',
        team2_points: '',
        winner_id: '',
        campo: {
            name: '',
        }
    });
    const [loading, setLoading] = React.useState(false);
    const [errorAlert, setErrorAlert] = useState({open: false, severity: 'error', errorStatus: '', description: 'Ocorreu um erro ao atualizar os resultados do jogo. Verifique e tente novamente.'});
    const handleErrorAlertClose = () => {
        setErrorAlert({...errorAlert, open: false});
    };
    const [successAlert, setSuccessAlert] = React.useState({open: false, severity: 'success', errorStatus: 'SUCCESSO', description: 'O jogo foi atualizado com sucesso!'});
    const handleSuccessAlertClose = () => {
        setSuccessAlert({...successAlert, open: false});
        window.location.reload();
    };

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
        if(chosenTeam.team1_points !== null || chosenTeam.team2_points !== null || chosenTeam.winner_id !== null) {
            //console.log(chosenTeam.player1_id.level);
            //console.log(typeof chosenTeam.player1_id.level);
            setLoading(true);
            axiosConfig.post('/updategame', {
                id: chosenTeam.id,
                team1_points: chosenTeam.team1_points,
                team2_points: chosenTeam.team2_points,
                winner_id: chosenTeam.winner_id,
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
                    setErrorAlert({...errorAlert, description: 'Ocorreu um erro ao atualizar os resultados do jogo. Verifique e tente novamente.', open: true, errorStatus: err.code});
                })
        }
    }

    function handleEditTeam(team) {
        setOpenDialog(true);
        setChosenTeam(team);
    }
    function handleCloseEditTeam() {
        setOpenDialog(false);
    }

    if(update) {
        return(
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
                        filename={"ListaJogosResultadosTorneios_" + tourney.name}
                        sheet="ListaResultadosJogos"
                        currentTableRef={tableRef.current}
                    >
                        <Button variant="contained" style={{textTransform: 'none',
                            backgroundColor: localStorage.getItem('loginForm') === 'admin' ? "#530508" : "#052F53",
                            marginTop: "2rem"}}>
                            Exportar para Excel
                        </Button>
                    </DownloadTableExcel>
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
                            <th>Resultados</th>
                            <th>Equipa Vencedora</th>
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
                                <td style={{padding: "0 15px"}}>{res.team1_points ?? ''} /-/ {res.team2_points ?? ''}</td>
                                {res.winner_id === res.team1.id &&
                                    <td style={{padding: "0 15px"}}>{res.team1.name}</td>}
                                {res.winner_id === res.team2.id &&
                                    <td style={{padding: "0 15px"}}>{res.team2.name}</td>}
                                {res.winner_id !== res.team1.id && res.winner_id !== res.team2.id &&
                                    <td style={{padding: "0 15px"}}>Não definido</td>}
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
                            <th>Resultados</th>
                            <th>Equipa Vencedora</th>
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
                                <td style={{padding: "0 15px"}}>{res.team1_points ?? ''} /-/ {res.team2_points ?? ''}</td>
                                {res.winner_id === res.team1.id &&
                                    <td style={{padding: "0 15px"}}>{res.team1.name}</td>}
                                {res.winner_id === res.team2.id &&
                                    <td style={{padding: "0 15px"}}>{res.team2.name}</td>}
                                {res.winner_id !== res.team1.id && res.winner_id !== res.team2.id &&
                                    <td style={{padding: "0 15px"}}>Não definido</td>}

                                {!((new Date()).getTime() < (new Date(tourney.init_date)).getTime()) && localStorage.getItem('loginForm') === 'admin' &&
                                    <td style={{ padding: "0 15px" }}>
                                        <Button variant="contained"
                                                onClick={() => handleEditTeam(res)}
                                                style={{textTransform: 'none', margin: "0px 1rem",
                                                    backgroundColor: localStorage.getItem('loginForm') === 'admin' ? "#530508" : "#052F53"}}>
                                            Editar
                                        </Button>
                                    </td>}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
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
                            type="number"
                            variant="outlined"
                            id="team1points"
                            label="Pontuação Equipa 1"
                            placeholder="Não definido"
                            style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'20rem', marginTop:'1rem'}}
                            value={chosenTeam.team1_points ?? ''}
                            onChange={(event) => setChosenTeam({...chosenTeam, team1_points: event.target.value})}
                        />
                        <TextField
                            required
                            type="number"
                            variant="outlined"
                            id="team2points"
                            label="Pontuação da Equipa 2"
                            placeholder="Não definido"
                            style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'20rem', marginTop:'1rem'}}
                            value={chosenTeam.team2_points ?? ''}
                            onChange={(event) => setChosenTeam({...chosenTeam, team2_points: event.target.value})}
                        />
                        <TextField
                            id="equipa-vencedora"
                            select
                            label="Equipa Vencedora"
                            required
                            value={chosenTeam.winner_id ?? ''}
                            style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'20rem', marginTop:'1rem'}}
                            onChange={(event) =>
                                setChosenTeam({...chosenTeam, winner_id: event.target.value})
                            }
                        >
                            <MenuItem key={chosenTeam.team1.id} value={chosenTeam.team1.id}>
                                {chosenTeam.team1.name}
                            </MenuItem>
                            <MenuItem key={chosenTeam.team2.id} value={chosenTeam.team2.id}>
                                {chosenTeam.team2.name}
                            </MenuItem>
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
                    <h1>Carregando resultados...</h1>
                </div>
            </>
        )
    }
}