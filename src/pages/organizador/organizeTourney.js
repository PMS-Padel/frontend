import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, {Component, useState} from 'react';
import styled from "styled-components";
import NavBar from "../../components/general/NavBar";
import Row from "../../components/general/Row";
import App from "../../App";
import backgroundPic from "../../img/JogadorTorneiosInicialBackground.png";
import backgroundPic2 from "../../img/OrganizadorInicialBackground.png";
import AlertPopup from "../../components/general/AlertPopup";
import axiosConfig from "../../axiosConfig";
import {Navigate} from "react-router-dom";
import TourneyRow from "../../components/tourney/TourneyRow";
import NavBarAdmin from "../../components/general/NavBarAdmin";
import LoadingPopup from "../../components/general/Loading";
import {Button} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PosterImageDefault from "../../img/PosterImageDefault.png";

const AccountButton = styled(AccountCircleIcon)`
  color: white;
  position: absolute; 
  top: 0;
  right: 10%
`

export default class OrganizeTourney extends Component {
    state = {
        user: [],
        storedAuth: localStorage.getItem('auth') ?? sessionStorage.getItem('auth'),
        goToAdminMenu: null,
        menuCreateTourney: false,
        file: null
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

    handleFileChange = (e) => {
        console.log(e.target.files)
        this.setState({file: URL.createObjectURL(e.target.files[0])});
    }

    render() {
        return (<>
                {(this.state.user.role === 'player' || localStorage.getItem('loginForm') === 'player') && <Navigate to="/menu-jogador"/>}
                {(this.state.storedAuth === null || this.props.storedAuth === null) && <Navigate to="/" />}
                {this.state.goToAdminMenu && <Navigate to="/menu-jogador" />}
                <LoadingPopup loading={this.props.loading}/>
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
                            left: 0
                        }}/>
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
                            bottom: "85%",
                            left: "43.5vw",
                            textTransform: 'none',
                            zIndex: "1"}}>Criar Torneio</Button>
                        <div style={{
                            width: "94%",
                            height: "75%",
                            borderRadius: "1%",
                            position: 'absolute',
                            zIndex: 0,
                            objectFit: "cover",
                            top: 550,
                            left: 45,
                            backgroundColor: "#FFFFFF"
                        }}>
                            <TourneyRow maxLength={undefined}/>
                        </div>
                    </div>
                    :
                    <div style={{position: "relative", top: 0, left: 0}}>
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
                            top: 220,
                            left: 125,
                            backgroundColor: "#FFFFFF"
                        }}>
                            <div style={{ padding: "20px" }}>
                                <Button style={{textTransform: 'none'}} component="label">
                                    <input hidden accept="image/*" type="file" onChange={this.handleFileChange} />
                                    <img src={this.state.file ?? PosterImageDefault} width={350} height={350} alt={"Imagem acerca de " + ""}/>
                                </Button>
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