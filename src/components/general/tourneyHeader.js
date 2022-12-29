import styled from "styled-components";
import backgroundPicTourney from "../../img/TourneyPageBackgroundImage.png";
import React from "react";
import {Button} from "@mui/material";

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
    props.href === window.location.pathname ? "underline" : "none"};
  font-weight: ${(props) =>
    props.href === window.location.pathname ? "bold" : "normal"};
`

const DivChangeTextColor = styled.div`
  color: ${() => localStorage.getItem('loginForm') === 'admin' ? "#530508" : "#052F53"};
`

export default function TourneyHeader({tourney, user}) {
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
                        <Button variant="contained" style={{textTransform: 'none'}} onClick={undefined}>Entrar</Button>}
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
            <img src={backgroundPicTourney} alt="background" style={{
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
                <img style={{width:'20rem', height:'20rem'}} src={tourney.file_url} alt={'Image acerca de ' + tourney.name}/>
            </div>
            <DivChangeTextColor style={{backgroundColor:'white', position:'absolute', width:'20rem', height:'20rem', top:'100px', right:'150px', textAlign:'center', borderRadius: '5px'}}>
                <h1 style={{fontSize:'2rem', marginTop:'1.4rem'}}>{tourney.name}</h1>
                <h1 style={{fontSize:'1.25rem', marginTop:'1.25rem'}}>{tourney.init_date} até {tourney.end_date}</h1>
                <h1 style={{fontSize:'2.5rem', marginTop:'2rem'}}>??/{tourney.max_players} inscritos</h1>
                {diasFalta()}
            </DivChangeTextColor>
            <Container>
                <nav>
                    <HRefA href={'/torneio/' + tourney.id} style={{fontSize: '28px'}}>Geral</HRefA>
                    <HRefA href='/' style={{fontSize: '28px'}}>Inscritos</HRefA>
                    <HRefA href='/' style={{fontSize: '28px'}}>Mapa de jogos</HRefA>
                    <HRefA href='/' style={{fontSize: '28px'}}>Calendário</HRefA>
                    <HRefA href='/' style={{fontSize: '28px'}}>Resultados</HRefA>
                </nav>
            </Container>
        </>
    );
}