import React, {Component} from 'react';
import styled from "styled-components";
import NavBar from "../components/general/NavBar";
import backgroundPic from "../img/JogadorTorneiosInicialBackground.png";
import backgroundPic2 from "../img/OrganizadorInicialBackground.png";
import backgroundPicTourney from "../img/TourneyPageBackgroundImage.png";
import AlertPopup from "../components/general/AlertPopup";
import axiosConfig from "../axiosConfig";
import {Navigate, useParams} from "react-router-dom";
import NavBarAdmin from "../components/general/NavBarAdmin";
import LoadingPopup from "../components/general/Loading";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  padding: 10px 0;
  background-color: #052F53;
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
    
    & a {
      color: white;

      &:hover,
      &.active {
        font-weight: bold;
      }
      text-decoration: ${(props) =>
              props.href === window.location.pathname ? "underline" : "none"};
      font-weight: ${(props) =>
              props.href === window.location.pathname ? "bold" : "normal"};
    }
  }
`

export default class TourneyPage extends Component {
    state = {
        user: [],
        tourney: [],
        storedAuth: localStorage.getItem('auth') ?? sessionStorage.getItem('auth'),
        goToAdminMenu: null,
        errorAlertSpecificTourney: {open: false, severity: 'error', errorStatus: '', description: 'Ocorreu um erro na busca do torneio. Verifique e tente novamente.'},
        tourneyNotFound: false,
        date: new Date()
    };
    componentDidMount() {
        if(this.state.storedAuth !== null) {
            this.getUser();
            this.props.setStoredAuth(this.state.storedAuth);
            console.log(this.state.date.getDay());
            
        }
        this.getTourney();
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
    getTourney = async () => {
        const res = await axiosConfig.get(`/gettournament/${window.location.pathname.substring(9)}`)
            .then((res) => res)
            .catch((error) => false);

        if(res !== false) {
            let {data} = res;
            console.log(res);
            this.setState({tourney: data});
        }
        else
        {
            this.setState(prevState => ({
                errorAlertSpecificTourney: {
                    ...prevState.errorAlertSpecificTourney,
                    open: true
                }
            }))
        }
    };
    handleErrorAlertCloseSpecificTourney = () => {
        this.setState(prevState => ({
            errorAlertSpecificTourney: {
                ...prevState.errorAlertSpecificTourney,
                open: false
            }
        }))
        this.setState({tourneyNotFound: true})
    }

    setTrueGoToAdminMenu = () => {
        this.setState({goToAdminMenu: true});
    }
    diasFalta =() =>{

        let endDate = new Date(this.state.tourney.end_date);
        let now = new Date();
        now.setHours(0,0,0,0);
        let diff = endDate.getTime() - now.getTime();
        let diffInDays = diff / (1000 * 3600 * 24);

        return(
            <h1 style={{fontSize:'1rem', marginTop:'2rem'}}>Inscrições fecham em {diffInDays} dias</h1>
        )


    }

    render(){
        return(
            <>
                {this.state.tourneyNotFound && <Navigate to="/torneios" />}
              {this.state.goToAdminMenu && localStorage.getItem('loginForm') === 'admin' && <Navigate to="/menu-organizador" />}
                {this.state.goToAdminMenu && localStorage.getItem('loginForm') === 'player' && <Navigate to="/menu-jogador" />}
                {localStorage.getItem('loginForm') === 'admin' ?
                    <NavBarAdmin logoutAccount={this.props.logoutAccount} goToAdminMenu={this.setTrueGoToAdminMenu}/> :
                    <NavBar storedAuth={this.props.storedAuth} logoutAccount={this.props.logoutAccount} isAdmin={(this.state.user.role === 'admin')} goToAdminMenu={this.setTrueGoToAdminMenu}/>
                }
                <LoadingPopup loading={this.props.loading}/>
                <AlertPopup errorAlert={this.props.errorAlertLogout} handleErrorAlert={this.props.handleErrorAlertCloseLogout} />
                <AlertPopup errorAlert={this.state.errorAlertSpecificTourney} handleErrorAlert={this.handleErrorAlertCloseSpecificTourney} />

                <img src={localStorage.getItem('loginForm') === 'admin' ? backgroundPic2 : backgroundPic} alt="background" style={{
                    width: "100%",
                    position: 'absolute',
                    zIndex: -10,
                    objectFit: "cover",
                    top: 0,
                    left: 0}}/>
                    <img src={backgroundPicTourney} alt="background" style={{
                        width: "100%",
                        height: "26rem",
                        position: 'relative',
                        opacity: 0.8,
                        zIndex: -10,
                        objectFit: "cover",
                        top: 65,
                        left: 0
                    }}/>
                    <div style={{backgroundColor:'white', position:'absolute', width:'20rem', height:'20rem', top:'13%', left:'10%'}}>
                    <img src={this.state.tourney.file_url}/>
                    </div>
                    <div style={{backgroundColor:'white', position:'absolute', width:'20rem', height:'20rem', top:'13%', right:'10%', textAlign:'center'}}>
                        <h1 style={{fontSize:'1.5rem', marginTop:'1.4rem'}}>Visão geral</h1>
                        <h1 style={{fontSize:'1rem', marginTop:'3rem'}}>Incrições:</h1>
                        <h1 style={{fontSize:'2rem', marginTop:'3rem'}}>??/{this.state.tourney.max_players}</h1>
                        {this.diasFalta()}
                    </div>
                    <Container>
                        <nav>
                            <a href='/' style={{fontSize: '28px'}}>Inscritos</a>
                            <a href='/' style={{fontSize: '28px'}}>Mapa de jogos</a>
                            <a href='/' style={{fontSize: '28px'}}>Calendário</a>
                            <a href='/' style={{fontSize: '28px'}}>Resultados</a>
                        </nav>
                    </Container>
            </>
        )
    }
}