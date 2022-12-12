import React, {useState} from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import { Button, Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {helperTextEmailLogin, helperTextPasswordLogin} from "./dataConditions";
import axiosConfig from "../axiosConfig";
import AlertPopup from "../components/general/AlertPopup";
import {Navigate} from "react-router-dom";
import LoadingPopup from "../components/general/Loading";



const Container = styled.div`
  margin-left: 10px;
  text-align: center;
`


function LoginOrganizador({showMenu, setMode}) {
    const [loading, setLoading] = React.useState(false);
    const [errorAlert, setErrorAlert] = React.useState({open: false, severity: 'error', errorStatus: '', description: 'Ocorreu um erro ao fazer login da conta. Verifique e tente novamente.'});
    const [user, setUser] = React.useState(null);
    const [checked, setChecked] = React.useState(true);
    const handleErrorAlertClose = () => {
        setErrorAlert({...errorAlert, open: false});
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function submitLogin() {
        if(!(typeof helperTextEmailLogin(email) === 'string' ||
            typeof helperTextPasswordLogin(password) === 'string')) {
            setLoading(!loading);
            axiosConfig.post('/login', {
                email: email,
                password: password
            })
                .then(response => {
                    if(response.data.role === 'player')
                    {
                      setLoading(false);
                      setErrorAlert({...errorAlert, open: true, errorStatus: 'ERR_WRONG_FORM'});
                    }
                    else
                    {
                      setLoading(false);
                        if(checked)
                        {
                            localStorage.setItem('auth', response.data.access_token);
                        }
                        else {
                            sessionStorage.setItem('auth', response.data.access_token);
                        }
                      localStorage.setItem('loginForm', 'admin');
                      setUser(response.data.access_token);
                    }
                })
                .catch(error => {
                    setLoading(false);
                    setErrorAlert({...errorAlert, open: true, errorStatus: error.code});
                })
        }
    }

    return (
        <>
            {user && <Navigate to="/menu-organizador" />}
            <LoadingPopup loading={loading} borderRadius={'30px'}/>
            <Container>
                <Button onClick={setMode} style={{position:'absolute',left:'5px',top:'10px'}}><ArrowBackIcon/></Button>
                <Button onClick={showMenu} style={{position:'absolute',right:'5px',top:'10px'}}><CloseIcon/></Button>
                <h5 style={{fontWeight:'bold',fontSize:'2rem',margin:"40px 20px 10px"}}>Entrar</h5>
                <p style={{color:'#00302A',fontSize:'1rem',textTransform:'none'}}>Bem vindo, Organizador!</p>
                <Box
                    marginTop={"50px"}

                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '74%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            required
                            id="email"
                            label="Email"
                            placeholder="Email"
                            style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                            onChange={(event) => {setEmail(event.target.value)}}
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            id="password"
                            label="Password"
                            type="Password"
                            style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                            onChange={(event) => {setPassword(event.target.value)}}
                        />
                    </div>
                    <div>
                        <FormGroup style={{marginLeft:'55px'}}>
                            <FormControlLabel control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} />} label="Lembrar-se de mim" />
                        </FormGroup>
                    </div>
                    <div>
                        <Button onClick={submitLogin} style={{marginTop:'20px', backgroundColor:'#052F53', color:'white', width:'74%', borderRadius: '5px', textTransform: 'none'}}>Entrar</Button>
                        <Button style={{color:'black',fontSize:'.7rem',paddingTop:'15px',textTransform:'none',width:'74%'}}>Esqueceu-se da password?</Button>
                    </div>
                    <AlertPopup errorAlert={errorAlert} handleErrorAlert={handleErrorAlertClose} />
                </Box>
            </Container>
        </>
    )
}

export default LoginOrganizador