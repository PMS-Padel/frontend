import axiosConfig from "../../axiosConfig";
import React, {useState, useEffect, useRef,} from "react";
import LoadingPopup from "../general/Loading";
import AlertPopup from "../general/AlertPopup";
import {Typography, Box, Button, DialogTitle, DialogContent, Dialog} from "@mui/material";
import {DownloadTableExcel} from "react-export-table-to-excel";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {helperTextName} from "../../autentication/dataConditions";


export default function TourneyInscritos({tourney, user, storedAuth}) {
    const [dataTeams, setDataTeams] = useState({});
    const [update, setUpdate] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogRemove, setOpenDialogRemove] = useState(false);
    const [openDialogRemoveName, setOpenDialogRemoveName] = useState('');
    const [chosenTeam, setChosenTeam] = useState({
        id: '',
        name: '',
        player1_id: {
            id: '',
            level: ''
        },
        player2_id: {
            id: '',
            level: ''
        },
        payed: ''
    });
    const tableRef = useRef(null);

    const [loading, setLoading] = React.useState(false);
    const [errorAlert, setErrorAlert] = useState({open: false, severity: 'error', errorStatus: '', description: 'Ocorreu um erro ao atualizar a equipa. Verifique e tente novamente.'});
    const handleErrorAlertClose = () => {
        setErrorAlert({...errorAlert, open: false});
    };
    const [successAlert, setSuccessAlert] = React.useState({open: false, severity: 'success', errorStatus: 'SUCCESSO', description: 'A equipa foi atualizada com sucesso!'});
    const handleSuccessAlertClose = () => {
        setSuccessAlert({...successAlert, open: false});
        window.location.reload();
    };

    useEffect(() => {
        axiosConfig.get(`getteams/${tourney.id}`,{
            headers: {
                Authorization: 'Bearer ' + storedAuth
            }
        })
            .then((res) => {
                let {data} = res;
                setDataTeams(data)
                setUpdate(true)
            })
            .catch((error) => false);
        },[tourney])

    function updateTeam() {
        if(chosenTeam.player1_id.level !== null || chosenTeam.player2_id.level !== null) {
            //console.log(chosenTeam.player1_id.level);
            //console.log(typeof chosenTeam.player1_id.level);
            setLoading(true);
            axiosConfig.post('/updateteam', {
                id: chosenTeam.id,
                payed: chosenTeam.payed,
            }, {
                headers: {
                    Authorization: 'Bearer ' + storedAuth
                }
            })
                .then(res => {
                    axiosConfig.post('/update', {
                        id: chosenTeam.player1_id.id,
                        level: chosenTeam.player1_id.level,
                    }, {
                        headers: {
                            Authorization: 'Bearer ' + storedAuth
                        }
                    })
                        .then(res => {
                            axiosConfig.post('/update', {
                                id: chosenTeam.player2_id.id,
                                level: chosenTeam.player2_id.level,
                            }, {
                                headers: {
                                    Authorization: 'Bearer ' + storedAuth
                                }
                            })
                                .then(res => {
                                    setOpenDialog(false);
                                    setLoading(false);
                                    setSuccessAlert({...successAlert, description: 'A equipa foi atualizada com sucesso!', open: true});
                                })
                                .catch(err => {
                                    setLoading(false);
                                    setErrorAlert({...errorAlert, description: 'Ocorreu um erro ao atualizar a equipa. Verifique e tente novamente.', open: true, errorStatus: err.code});
                                })
                        })
                        .catch(err => {
                            setLoading(false);
                            setErrorAlert({...errorAlert, description: 'Ocorreu um erro ao atualizar a equipa. Verifique e tente novamente.', open: true, errorStatus: err.code});
                        })
                })
                .catch(err => {
                    setLoading(false);
                    setErrorAlert({...errorAlert, description: 'Ocorreu um erro ao atualizar a equipa. Verifique e tente novamente.', open: true, errorStatus: err.code});
                })
        }
    }

    function removeTeam() {
        if(openDialogRemoveName !== undefined && openDialogRemoveName.trim() !== '')
        {
            setLoading(true);
            console.log(chosenTeam.id);
            axiosConfig.post('/deleteTeam', {
                id: chosenTeam.id,
            }, {
                headers: {
                    Authorization: 'Bearer ' + storedAuth
                }
            })
                .then(res => {
                    setOpenDialogRemove(false);
                    setLoading(false);
                    setSuccessAlert({...successAlert, description: 'A equipa foi removida com sucesso!', open: true});
                })
                .catch(err => {
                    setLoading(false);
                    setErrorAlert({...errorAlert, description: 'Ocorreu um erro ao remover a equipa. Verifique e tente novamente.', open: true, errorStatus: err.code});
                })
        }
    }

    function handleEditTeam(team) {
        setOpenDialog(true);
        setChosenTeam(team);
    }

    function handleRemoveTeam(team) {
        setOpenDialogRemove(true);
        setChosenTeam(team);
    }

    function handleCloseEditTeam() {
        setOpenDialog(false);
    }
    function handleCloseRemoveTeam() {
        setOpenDialogRemove(false);
    }

    function mostraTabela(dataTeams){
        if (update){
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
                        color: "#052F53",
                        justifyContent: "center",
                        textAlign: "center",
                    }}>
                        <DownloadTableExcel
                            filename={"ListaEquipasTorneio_" + tourney.name}
                            sheet="ListaEquipas"
                            currentTableRef={tableRef.current}
                        >
                            <Button variant="contained" style={{textTransform: 'none',
                                backgroundColor: localStorage.getItem('loginForm') === 'admin' ? "#530508" : "#052F53",
                                marginTop: "2rem"}}>
                                Exportar para Excel
                            </Button>
                        </DownloadTableExcel>
                        <table ref={tableRef} style={{margin:'2rem', justifyContent:'center', textAlign: 'center',
                        color: localStorage.getItem('loginForm') === 'admin' ? "#530508" : "#052F53"}} hidden>
                            <thead>
                                <tr>
                                    <th>Nome da equipa</th>
                                    <th>Jogadores</th>
                                    <th>Níveis</th>
                                    <th>Data de inscrição</th>
                                    <th>Pronto / Pago</th>
                                </tr>
                            </thead>
                            <tbody>
                            {dataTeams.map((res)=>(
                                <tr key={res.id}>
                                    <td style={{ padding: "0 15px" }}>{res.name}</td>
                                    <td style={{ padding: "0 15px" }}>{res.player1_id.name} | {res.player2_id.name} </td>
                                    <td style={{ padding: "0 15px" }}>{res.player1_id.level} | {res.player2_id.level} </td>
                                    <td style={{ padding: "0 15px" }}>{res.subscription_date}</td>
                                    <td style={{ padding: "0 15px" }}>{res.payed ? 'Sim' : 'Não'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <table style={{margin:'2rem', justifyContent:'center', textAlign: 'center',
                            color: localStorage.getItem('loginForm') === 'admin' ? "#530508" : "#052F53"}} >
                            <thead>
                                <tr>
                                    <th>Nome da equipa</th>
                                    <th>Jogadores</th>
                                    <th>Níveis</th>
                                    <th>Data de inscrição</th>
                                    <th>Pronto / Pago</th>
                                    {!((new Date()).getTime() < (new Date(tourney.init_date)).getTime()) && localStorage.getItem('loginForm') === 'admin' &&
                                    <th>Edição</th>}
                                </tr>
                            </thead>
                            <tbody>
                            {dataTeams.map((res)=>(
                                <tr key={res.id}>
                                    <td style={{ padding: "0 15px" }}>{res.name}</td>
                                    <td style={{ padding: "0 15px" }}>{res.player1_id.name} | {res.player2_id.name} </td>
                                    <td style={{ padding: "0 15px" }}>{res.player1_id.level} | {res.player2_id.level} </td>
                                    <td style={{ padding: "0 15px" }}>{res.subscription_date}</td>
                                    <td style={{ padding: "0 15px" }}>{res.payed ? 'Sim' : 'Não'}</td>
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
                    <Dialog open={openDialog} width="25rem">
                        <DialogTitle>
                            <div style={{ fontSize: '1.5em' }}>Editar equipa</div>
                            <Button style={{position:'absolute',top:'1rem', right:'1rem',}} onClick={()=>{handleCloseEditTeam()}}><CloseIcon/></Button>
                        </DialogTitle>
                        <DialogContent style={{ justifyContent: 'center', textAlign: 'center' }}>
                            <p>Nome: {chosenTeam.name}</p>
                            <TextField
                                required
                                type="number"
                                variant="outlined"
                                id="levelUser1"
                                label={"Nível do " + (chosenTeam.player1_id.name)}
                                placeholder="Não definido"
                                style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'20rem', marginTop:'1rem'}}
                                value={chosenTeam.player1_id.level ?? ''}
                                onChange={(event) => setChosenTeam({...chosenTeam, player1_id: {...chosenTeam.player1_id, level: event.target.value}})}
                            />
                            <TextField
                                required
                                type="number"
                                variant="outlined"
                                id="levelUser2"
                                label={"Nível do " + (chosenTeam.player2_id.name)}
                                placeholder="Não definido"
                                style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'20rem', marginTop:'1rem'}}
                                value={chosenTeam.player2_id.level ?? ''}
                                onChange={(event) => setChosenTeam({...chosenTeam, player2_id: {...chosenTeam.player2_id, level: event.target.value}})}
                            />
                            <TextField
                                id="payedTeam"
                                select
                                label="Pronto / Pago"
                                required
                                value={chosenTeam.payed}
                                style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'20rem', marginTop:'1rem'}}
                                onChange={(event) =>
                                    setChosenTeam({...chosenTeam, payed: event.target.value})
                                }
                            >
                                <MenuItem key={'true'} value={'true'}>
                                    Sim
                                </MenuItem>
                                <MenuItem key={'false'} value={'false'}>
                                    Não
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
                    <Dialog open={openDialogRemove} width="25rem">
                        <DialogTitle>
                            <div style={{ fontSize: '1.5em' }}>Remover equipa</div>
                            <Button style={{position:'absolute',top:'1rem', right:'1rem',}} onClick={()=>{handleCloseRemoveTeam()}}><CloseIcon/></Button>
                        </DialogTitle>
                        <DialogContent style={{ justifyContent: 'center', textAlign: 'center' }}>
                            <p>Insere o nome da equipa - {chosenTeam.name} - para confirmar a remoção.</p>
                            <TextField
                                required
                                variant="outlined"
                                id="confirmRemoveNameTeam"
                                label="Nome da equipa"
                                placeholder="Nome da equipa"
                                style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'20rem', marginTop:'1rem'}}
                                onChange={(event) => setOpenDialogRemoveName(event.target.value)}
                                error={openDialogRemoveName !== chosenTeam.name}
                                helperText={openDialogRemoveName !== chosenTeam.name ? 'Inválido' : ''}
                            />
                            <Button onClick={handleCloseRemoveTeam}
                                    style={{position:'relative', marginLeft:'60%', marginTop:'3rem',
                                        backgroundColor:'#8E0909', color:'white', width:'15%', borderRadius: '5px',
                                        textTransform: 'none', marginRight:'2rem'}}>Cancelar</Button>
                            <Button onClick={removeTeam} disabled={openDialogRemoveName !== chosenTeam.name}
                                    style={{position:'relative', marginTop:'3rem', backgroundColor:'#052F53',
                                        color:'white', width:'15%', borderRadius: '5px', textTransform: 'none'}}>Confirmar</Button>
                        </DialogContent>
                    </Dialog>
                </>
            )
        }
        else {
            return (
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
                    <h1>Carregando tabela...</h1>
                </div>
            )
        }
    }


    return(
        <>
            {mostraTabela(dataTeams)}
        </>
    )
}