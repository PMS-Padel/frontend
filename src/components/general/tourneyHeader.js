import styled from "styled-components";
import backgroundPicTourney from "../../img/TourneyPageBackgroundImage.png";
import backgroundPicTourney2 from "../../img/TourneyPageBackgroundImageAdmin.png";
import React, { useState, useEffect } from "react";
import {Button, DialogContent, DialogTitle, Dialog} from "@mui/material";
import TextField from "@mui/material/TextField";
import axiosConfig from "../../axiosConfig";
import CloseIcon from '@mui/icons-material/Close';

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
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        console.log(update);
        if (update !== false){
        console.log(typeof nameTeam);
        console.log(typeof date);
        console.log(typeof user.user_code);
        console.log(typeof colegaDeEquipa);
        console.log(typeof tourney.id);
        console.log( nameTeam);
        console.log( date);
        console.log( user.user_code.toString());
        console.log( colegaDeEquipa);
        console.log( tourney.id.toString());
        console.log( storedAuth);
            
        
        axiosConfig.post('/createteamByCode', {
            name:nameTeam,
            subscription_date: date,
            player1Code:user.user_code.toString(),
            player2Code:colegaDeEquipa,
            tournament_id:tourney.id.toString()
        }, {
            headers: {
                Authorization: 'Bearer ' + storedAuth
            }
        })
            .then(res =>{
                
                console.log(res)
            })
            .catch(err =>{
 
                console.log(err)
            })
            setOpenDialog(!openDialog);
            setUpdate(!update);
        }

      }, [update]);



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
                    {localStorage.getItem('loginForm') === 'player' && user.id !== tourney.user_id &&
                        <Button variant="contained" style={{textTransform: 'none', backgroundColor: "#052F53"}} onClick={()=>{setOpenDialog(!openDialog)}}>Inscreve-te!</Button>
                    }
                </>
            )
        } else {
            return (
                <h1 style={{fontSize: '1rem', marginTop: '1.5rem'}}>Inscrições fechadas!</h1>
            )
        }
    }


    return (
        <>
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
                <img style={{width:'20rem', height:'20rem'}} src={tourney.file_url} alt={'Imagem acerca de ' + tourney.name}/>
            </div>
            <DivChangeTextColor style={{backgroundColor:'white', position:'absolute', width:'20rem', height:'20rem', top:'100px', right:'150px', textAlign:'center', borderRadius: '5px'}}>
                <h1 style={{fontSize:'2rem', marginTop:'1.4rem'}}>{tourney.name}</h1>
                <h1 style={{fontSize:'1.25rem', marginTop:'1.25rem'}}>
                    {new Date(tourney.init_date).getDate() + '-' + (new Date(tourney.init_date).getMonth() + 1) + '-' + new Date(tourney.init_date).getFullYear() + ' '}
                    até
                    {' ' + new Date(tourney.end_date).getDate() + '-' + (new Date(tourney.end_date).getMonth() + 1) + '-' + new Date(tourney.end_date).getFullYear()}
                </h1>
                <h1 style={{fontSize:'2.5rem', marginTop:'2rem'}}>??/{tourney.max_players} inscritos</h1>
                {diasFalta()}
            </DivChangeTextColor>
            <Dialog open= {openDialog} width="25rem">
                <DialogTitle>
                    <div style={{ fontSize: '1.5em' }}>Inscrição</div>
                    <Button  style={{position:'absolute',top:'1rem', right:'1rem',}} onClick={()=>{setOpenDialog(!openDialog)}}><CloseIcon/></Button>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        variant="outlined"
                        id="nameTeam"
                        label="Nome da equipa"
                        placeholder="Nome da equipa"
                        style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'20rem', marginTop:'1rem',marginLeft:'3.7rem'}}
                        onChange={(event) => {
                            setNameTeam(event.target.value)
                        }}
                    />
                    <TextField
                        required
                        variant="outlined"
                        id="colegaDeEquipa"
                        label="Colega de equipa"
                        placeholder="Colega de equipa"
                        style={{backgroundColor: '#FFFFFF', borderRadius: '5px', width:'20rem', marginTop:'1rem',marginLeft:'3.7rem'}}
                        onChange={(event) => {
                            setColegaDeEquipa(event.target.value)
                        }}  
                    />
                    <Button onClick={()=> setUpdate(!update)}
                        style={{position:'relative', marginTop:'2rem', backgroundColor:'#052F53',
                        color:'white', borderRadius: '5px', textTransform: 'none', marginLeft:'37%'}}>Atualizar torneio</Button>
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