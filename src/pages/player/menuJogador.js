/** @format */

import zIndex from '@mui/material/styles/zIndex';
import { color, sizeHeight } from '@mui/system';
import Button from '../../components/general/Button';
import Row from '../../components/general/Row';
import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { HeaderLanding } from '../../components/general/HeaderLandingPage';
import React, {Component} from 'react';
import NavBar from '../../components/general/NavBar';
import axiosConfig from "../../axiosConfig";
import {Navigate} from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {Alert, AlertTitle, Dialog} from "@mui/material";

const AccountButton = styled(AccountCircleIcon)`
  color: white;
  position: absolute; 
  top: 0;
  right: 10%
`

export default class MenuJogador extends Component {
    state = {
        user: [],
        loading: false,
        errorAlert: {open: false, errorStatus: ''},
        errorAlertLogout: {open: false, errorStatus: ''},
        storedAuth: localStorage.getItem('auth')
    };
    componentDidMount() {
        this.getUser();
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
        else
        {
            this.setState({ errorAlert: {...(this.errorAlert), open: true} });
        }
    };

    handleErrorAlertClose = () => {
        this.setState({ errorAlert: {...(this.errorAlert), open: false} });
        localStorage.removeItem('auth');
        this.setState({storedAuth: null});
    };

    handleErrorAlertCloseLogout = () => {
        this.setState({ errorAlertLogout: {...(this.errorAlertLogout), open: false} });
    };

    logoutAccount = () => {
        this.setState({ loading: !(this.loading) }); //true
        axiosConfig.post('/logout', {}, {
            headers: {
                Authorization: 'Bearer ' + this.state.storedAuth
            }
        })
            .then(response => {
                this.setState({ loading: !(this.loading) }); //false
                localStorage.removeItem('auth');
                this.setState({storedAuth: null});
            })
            .catch(error => {
                this.setState({ loading: !(this.loading) }); //false
                this.setState({ errorAlertLogout: {...(this.errorAlertLogout), open: true, errorStatus: error.code} });
            })
    }

    render()
    {
        return (
            <>
                {this.state.storedAuth === null && <Navigate to="/" />}
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={this.state.loading}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
                <NavBar/>
                <HeaderLanding firstText={'Bem-vindo'} secondText={(this.state.user.name ?? '') + '!'}/>
                <Button onClick={this.logoutAccount} style={{
                    marginTop: '20px',
                    backgroundColor: '#052F53',
                    color: 'white',
                    width: '74%',
                    borderRadius: '5px',
                    textTransform: 'none'
                }}>Logout</Button>
                <Dialog
                    open={this.state.errorAlert.open}
                    onClose={this.handleErrorAlertClose}>
                    <Alert severity="error">
                        <AlertTitle>{this.state.errorAlert.errorStatus}</AlertTitle>
                        Ocorreu um erro. Verifique e tente novamente.
                    </Alert>
                </Dialog>
                <Dialog
                    open={this.state.errorAlertLogout.open}
                    onClose={this.handleErrorAlertCloseLogout}>
                    <Alert severity="error">
                        <AlertTitle>{this.state.errorAlertLogout.errorStatus}</AlertTitle>
                        Ocorreu um erro. Verifique e tente novamente.
                    </Alert>
                </Dialog>
            </>
        );
    }
}
