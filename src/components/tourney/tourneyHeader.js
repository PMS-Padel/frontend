import styled from "styled-components";
import backgroundPicTourney from "../../img/TourneyPageBackgroundImage.png";
import backgroundPicTourney2 from "../../img/TourneyPageBackgroundImageAdmin.png";
import React, { useState, useEffect } from "react";
import {Button, DialogContent, DialogTitle, Dialog, Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import axiosConfig from "../../axiosConfig";
import CloseIcon from '@mui/icons-material/Close';
import LoadingPopup from "../general/Loading";
import AlertPopup from "../general/AlertPopup";
import MenuItem from "@mui/material/MenuItem";
import {helperTextName} from "../../autentication/dataConditions";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  padding: 10px 0;
  background-color: ${() => localStorage.getItem('loginForm') === 'admin' ? "#530508" : "#052F53"};
  //border-bottom:1px solid #FFF;
  position: absolute;
  top: 580px;

  & nav {
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    max-width: 900px;
    margin: auto;
    z-index: 1;
    flex-grow: 1;
    align-items: center;
    gap: 30px;
  }
`

const HRefA = styled.a`
  color: white;
  cursor: pointer;

  &:hover,
  &.active {
    font-weight: bold;
  }
  text-decoration: ${(props) =>
          props.id.toString() === props.menuTourney.toString() ? "underline" : "none"};
  font-weight: ${(props) =>
          props.id.toString() === props.menuTourney.toString() ? "bold" : "normal"};
`

const DivChangeTextColor = styled.div`
  color: ${() => localStorage.getItem('loginForm') === 'admin' ? "#530508" : "#052F53"};
`

export default function TourneyHeader({tourney, user, MenuTourney, handleMenuTourneyChange, storedAuth}) {
    const [openDialog, setOpenDialog] = useState(false);
    const [nameTeam, setNameTeam] = useState(null);
    const [colegaDeEquipa, setColegaDeEquipa] = useState(null);
    const [openDialogRemove, setOpenDialogRemove] = useState(false);
    const [openDialogRemoveName, setOpenDialogRemoveName] = useState('');
    const [chosenTeam, setChosenTeam] = useState({
        id: '',
        name: '',
    });

    const [loading, setLoading] = React.useState(false);
    const [errorAlert, setErrorAlert] = useState({open: false, severity: 'error', errorStatus: '', description: 'Ocorreu um erro ao inscrever a equipa. Verifique e tente novamente.'});
    const handleErrorAlertClose = () => {
        setErrorAlert({...errorAlert, open: false});
    };
    const [successAlert, setSuccessAlert] = React.useState({open: false, severity: 'success', errorStatus: 'SUCCESSO', description: 'A equipa foi inscrita com sucesso!'});
    const handleSuccessAlertClose = () => {
        setSuccessAlert({...successAlert, open: false});
        window.location.reload();
    };
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [update, setUpdate] = useState(false);
    const [dataParceiro, setDataParceiro] = useState({});
    const [subbedTeamId, setSubbedTeamId] = useState(false);
    const [dataTeams, setDataTeams] = useState({});
    useEffect(() => {
        if (user !== undefined && tourney !== undefined)
        {
            if(user.id !== tourney.user_id) {
                axiosConfig.post('/isteammate', {
                    playerid: user.id,
                    tournamentid: tourney.id
                }, {
                    headers: {
                        Authorization: 'Bearer ' + storedAuth
                    }
                })
                    .then(res => {
                        //console.log('entrou')
                        setIsSignedUp(true);
                        const {data} = res;
                        //add team to default value
                        setNameTeam(data.name);
                        setSubbedTeamId(data.id);
                    })
                    .catch(err => {
                        setIsSignedUp(false);
                    })
            }
        }
        if(tourney !== undefined)
        {
            axiosConfig.get(`getteams/${tourney.id}`, {
                headers: {
                    Authorization: 'Bearer ' + storedAuth
                }
            })
                .then((res) => {
                    let {data} = res;
                    setDataTeams(data);
                })
                .catch((error) => false);
        }
        if (update && colegaDeEquipa !== '' && colegaDeEquipa !== undefined){
            //console.log(colegaDeEquipa)
            axiosConfig.get('/getByCode/' + colegaDeEquipa, {
                headers: {
                    Authorization: 'Bearer ' + storedAuth
                }
            })
                .then(res =>{
                    let {data} = res;
                    setDataParceiro(data);
                })
                .catch(err =>{
                    setDataParceiro({});
                })
            setUpdate(false);
        }

    }, [update, colegaDeEquipa, user, tourney]);


    function inscreverEquipa() {
        if(dataParceiro !== {} && nameTeam !== null && nameTeam !== '')
        {
            if(dataParceiro.id === tourney.user_id)
            {
                //alerta de erro de ser igual a admin
                setErrorAlert({...errorAlert, description: 'Não pode inscrever o próprio organizador deste torneio como parceiro! Verifique e tente novamente.', open: true, errorStatus: 'ERR_DENIED_PARTNER'});
            }
            else if(dataParceiro.id === user.id)
            {
                setErrorAlert({...errorAlert, description: 'Não se pode inscrever-se a si mesmo como parceiro. Verifique novamente.', open: true, errorStatus: 'ERR_SAME_PARTNER'});
            }
            else if(dataTeams.length*2 >= tourney.max_players)
            {
                setErrorAlert({...errorAlert, description: 'A inscrição está lotada para este torneio. Verifique novamente.', open: true, errorStatus: 'ERR_TEAMS_MAX'});
            }
            else if(
                (dataParceiro.gender === 'M' && user.gender === 'M' && tourney.tournament_type_id === 2) ||
                (dataParceiro.gender === 'F' && user.gender === 'F' && tourney.tournament_type_id === 1) ||
                (dataParceiro.gender === 'M' && user.gender === 'F' && tourney.tournament_type_id === 3) ||
                (dataParceiro.gender === 'F' && user.gender === 'M' && tourney.tournament_type_id === 3) )
            {
                setLoading(true);
                if(isSignedUp)
                {
                    axiosConfig.post('/updateteam', {
                        id: subbedTeamId,
                        name: nameTeam,
                        subscriptiondate: new Date().toISOString(),
                        player1_id: user.id,
                        player2Code: colegaDeEquipa,
                        tournamentid: tourney.id,
                    }, {
                        headers: {
                            Authorization: 'Bearer ' + storedAuth
                        }
                    })
                        .then(res =>{
                            setOpenDialog(false);
                            setLoading(false);
                            setSuccessAlert({...successAlert, description: 'A equipa foi alterada com sucesso!', open: true});
                        })
                        .catch(err =>{
                            setLoading(false);
                            setErrorAlert({...errorAlert, description: 'Ocorreu um erro ao alterar a equipa. Verifique e tente novamente.', open: true, errorStatus: err.code});
                        })
                }
                else
                {
                    axiosConfig.post('/createteamByCode', {
                        name: nameTeam,
                        subscriptiondate: new Date().toISOString(),
                        player1Code: user.user_code,
                        player2Code: colegaDeEquipa,
                        tournamentid: tourney.id,
                        payed: (tourney.price === 0),
                    }, {
                        headers: {
                            Authorization: 'Bearer ' + storedAuth
                        }
                    })
                        .then(res =>{
                            setOpenDialog(false);
                            setLoading(false);
                            setSuccessAlert({...successAlert, description: 'A equipa foi inscrita com sucesso!', open: true});
                        })
                        .catch(err =>{
                            setLoading(false);
                            setErrorAlert({...errorAlert, description: 'Ocorreu um erro ao inscrever a equipa. Verifique e tente novamente.', open: true, errorStatus: err.code});
                        })
                }
            }
            else
            {
                //erro de alerta de gender
                setErrorAlert({...errorAlert, description: 'O género de um ou mais jogadores não corresponde ao tipo de torneio. Verifique e tente novamente.', open: true, errorStatus: 'ERR_TOURNEY_TYPE'});
            }
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
    function handleRemoveTeam(team) {
        setOpenDialogRemove(true);
        setChosenTeam(team);
    }
    function handleCloseRemoveTeam() {
        setOpenDialogRemove(false);
    }

    function diasFalta() {
        let initDate = new Date(tourney.init_date);
        //let endDate = new Date(tourney.end_date);
        let now = new Date();
        if (now.getTime() < initDate.getTime()) {
            now.setHours(0, 0, 0, 0);
            let diff = initDate.getTime() - now.getTime();
            let diffInDays = diff / (1000 * 3600 * 24);

            return (
                <>
                    <h1 style={{fontSize: '1rem', marginTop: '1.5rem'}}>Inscrições fecham em {diffInDays} dias</h1>
                    {localStorage.getItem('loginForm') === 'player' && user.id !== tourney.user_id && dataTeams.length*2 < tourney.max_players &&
                        <Button variant="contained" style={{textTransform: 'none', backgroundColor: "#052F53"}}
                                onClick={()=>{setOpenDialog(true)}}>{isSignedUp ? 'Mudar equipa' : 'Inscreve-te!'}</Button>
                    }
                    {localStorage.getItem('loginForm') === 'player' && user.id !== tourney.user_id && dataTeams.length*2 >= tourney.max_players && !isSignedUp &&
                        <Button variant="contained" style={{textTransform: 'none', backgroundColor: "#530508", color:"white"}} disabled
                                onClick={()=>{setOpenDialog(true)}}>Inscrição lotada!</Button>
                    }
                    {localStorage.getItem('loginForm') === 'player' && user.id !== tourney.user_id && dataTeams.length*2 >= tourney.max_players && isSignedUp &&
                        <Button variant="contained" style={{textTransform: 'none', backgroundColor: "#052F53"}}
                                onClick={()=>{setOpenDialog(true)}}>{isSignedUp ? 'Mudar equipa' : 'Inscreve-te!'}</Button>
                    }
                </>
            )
        } else {
            return (
                <h1 style={{fontSize: '1rem', marginTop: '1.5rem'}}>Inscrições fechadas!</h1>
            )
        }
    }

    function tipoDeTorneio(tipo) {
        switch (tipo) {
            case 1:
                return(<p>Tipo de torneio: Feminino</p>);
            case 2:
                return(<p>Tipo de torneio: Masculino</p>);
            case 3:
                return(<p>Tipo de torneio: Misto</p>);
            default:
                return(<h1>Tipo de torneio: --</h1>);
        }
    }

    function getGender() {
        return [
            {
                value: 'M',
                label: 'Masculino',
            },
            {
                value: 'F',
                label: 'Feminino',
            },
            {
                value: 'O',
                label: 'Outro/a',
            }
        ];
    }

    return (
        <>
            <LoadingPopup loading={loading} />
            <AlertPopup errorAlert={errorAlert} handleErrorAlert={handleErrorAlertClose} />
            <AlertPopup errorAlert={successAlert} handleErrorAlert={handleSuccessAlertClose} />
            <img src={localStorage.getItem('loginForm') === 'admin' ? backgroundPicTourney2 : backgroundPicTourney} alt="background" style={{
                width: "100%",
                height: "26rem",
                position: 'relative',
                opacity: 1,
                zIndex: -10,
                objectFit: "cover",
                top: 65,
                left: 0
            }}/>
            <div style={{backgroundColor:'white', position:'absolute', width:'20rem', height:'20rem', top:'100px', left:'150px', borderRadius: '5px'}}>
                <img style={{width:'20rem', height:'20rem', borderRadius: '1%'}} src={tourney.file_url} alt={'Imagem acerca de ' + tourney.name}/>
            </div>
            <DivChangeTextColor style={{backgroundColor:'white', position:'absolute', minWidth:'20rem', height:'20rem', top:'100px', right:'150px', textAlign:'center', borderRadius: '5px', objectFit: "cover"}}>
                <h1 style={{fontSize:'2rem', marginTop:'1.4rem'}}>{tourney.name}</h1>
                <h1 style={{fontSize:'1.25rem', marginTop:'1.25rem'}}>
                    {new Date(tourney.init_date).getDate() + '-' + (new Date(tourney.init_date).getMonth() + 1) + '-' + new Date(tourney.init_date).getFullYear() + ' '}
                    até
                    {' ' + new Date(tourney.end_date).getDate() + '-' + (new Date(tourney.end_date).getMonth() + 1) + '-' + new Date(tourney.end_date).getFullYear()}
                </h1>
                <h1 style={{fontSize:'2.5rem', marginTop:'2rem'}}>{dataTeams !== {} ? dataTeams.length*2 : ''}/{tourney.max_players} inscritos</h1>
                {diasFalta()}
            </DivChangeTextColor>
            <Dialog open={openDialog} width="25rem">
                <DialogTitle>
                    <div style={{ fontSize: '1.5em' }}>Inscrição</div>
                    <Button style={{position:'absolute',top:'1rem', right:'1rem',}} onClick={()=>{setOpenDialog(false)}}><CloseIcon/></Button>
                </DialogTitle>
                <DialogContent style={{ justifyContent: 'center', textAlign: 'center' }}>
                    {tipoDeTorneio(tourney.tournament_type_id)}
                    <p>Preço: {tourney.price}€</p>
                    <Grid container rowSpacing={1} columnSpacing={0}
                          justifyContent="space-evenly"
                          alignItems="center">
                        <Grid item xs={12}>
                            <TextField
                                required
                                variant="outlined"
                                id="nameTeam"
                                label="Nome da equipa"
                                placeholder="Nome da equipa"
                                style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'20rem', marginTop:'1rem'}}
                                value={nameTeam ?? ''}
                                onChange={(event) => {
                                    setNameTeam(event.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                disabled
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                                id="user_code account"
                                label="O teu código"
                                placeholder="O teu código"
                                style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'10rem', marginTop:'1rem'}}
                                value={user.user_code ?? ''}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                variant="outlined"
                                id="colegaDeEquipa"
                                label="Código do/a parceiro/a"
                                placeholder="Código do/a parceiro/a"
                                style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'10rem', marginTop:'1rem'}}
                                onBlur={(event) => {
                                    setColegaDeEquipa(event.target.value);
                                    setUpdate(true);
                                }}

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                                id="nome"
                                label="Nome"
                                placeholder="Nome"
                                value={user.name ?? ''}
                                style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'10rem', marginTop:'1rem'}}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                disabled
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="outlined"
                                id="nome"
                                label="Nome"
                                placeholder="Nome"
                                value={dataParceiro.name ?? ''}
                                style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'10rem', marginTop:'1rem'}}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="gender-select-user1"
                                select
                                label="Género"
                                disabled
                                InputProps={{
                                    readOnly: true,
                                }}
                                defaultValue={user.gender ?? ''}
                                style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'10rem', marginTop:'1rem'}}
                            >
                                {(getGender()).map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="gender-select-partner"
                                select
                                label="Género"
                                disabled
                                InputProps={{
                                    readOnly: true,
                                }}
                                value={dataParceiro.gender ?? ''}
                                style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'10rem', marginTop:'1rem'}}
                            >
                                {(getGender()).map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={inscreverEquipa}
                                style={{position:'relative', marginTop:'2rem', backgroundColor:'#052F53',
                                color:'white', borderRadius: '5px', textTransform: 'none'}}>{isSignedUp ? 'Mudar parceiro/a' : 'Inscrever equipa'}</Button>
                            {isSignedUp &&
                                <Button onClick={() => handleRemoveTeam({id: subbedTeamId, name: nameTeam})}
                                        style={{
                                            position: 'relative', marginTop: '2rem', marginLeft: '1rem', backgroundColor: '#530505',
                                            color: 'white', borderRadius: '5px', textTransform: 'none'
                                        }}>Cancelar inscrição</Button>
                            }
                        </Grid>
                    </Grid>
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
            <Container>
                <nav>
                    <HRefA onClick={()=>handleMenuTourneyChange(0)} id="0" menuTourney={MenuTourney} style={{fontSize: '28px'}}>Geral</HRefA>
                    <HRefA onClick={()=>handleMenuTourneyChange(1)} id="1" menuTourney={MenuTourney} style={{fontSize: '28px'}}>Inscritos</HRefA>
                    <HRefA onClick={()=>handleMenuTourneyChange(2)} id="2" menuTourney={MenuTourney} style={{fontSize: '28px'}}>Mapa de jogos</HRefA>
                    <HRefA onClick={()=>handleMenuTourneyChange(3)} id="3" menuTourney={MenuTourney} style={{fontSize: '28px'}}>Calendário</HRefA>
                    <HRefA onClick={()=>handleMenuTourneyChange(4)} id="4" menuTourney={MenuTourney} style={{fontSize: '28px'}}>Resultados</HRefA>
                </nav>
            </Container>
        </>
    );
}