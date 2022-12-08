import React, {useState} from 'react'
import styled from 'styled-components'
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import {Alert, AlertTitle, Button, Checkbox, Dialog} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import axiosConfig from '../axiosConfig';
import {helperTextEmailLogin, helperTextPasswordLogin} from './dataConditions';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {Navigate} from "react-router-dom";

const Container = styled.div`
  margin-left: 10px;
  text-align: center;
`

function LoginForm({showMenu, setMode}) {
  const [loading, setLoading] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState({open: false, errorStatus: ''});
  const [user, setUser] = React.useState(null);
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
            setLoading(false);
            localStorage.setItem('auth', response.data.access_token);
            setUser(response.data.access_token);
          })
          .catch(error => {
            setLoading(false);
            setErrorAlert({...errorAlert, open: true, errorStatus: error.code});
          })
    }
  }

  return (
    <>
      {user && <Navigate to="/MenuJogador" />}
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
    <Container>
      <Button onClick={showMenu} style={{position:'absolute',right:'5px',top:'10px'}}><CloseIcon/></Button>
      <h5 style={{fontWeight:'bold',fontSize:'2rem'}}>Entrar</h5>
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
            //error={typeof helperTextEmailLogin(email) === 'string'}
            //helperText={helperTextEmailLogin(email)}
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
            //error={typeof helperTextPasswordLogin(password) === 'string'}
            //helperText={helperTextPasswordLogin(password)}
          />
      </div>
      <div>
      <FormGroup style={{marginLeft:'55px'}}>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Lembrar-se de mim" />
      </FormGroup>
      </div>
      <div>
        <Button onClick={submitLogin} style={{marginTop:'20px', backgroundColor:'#052F53', color:'white', width:'74%', borderRadius: '5px', textTransform: 'none'}}>Entrar</Button>
        <Button style={{color:'black',fontSize:'.7rem',paddingTop:'15px',textTransform:'none',width:'74%'}}>Esqueceu-se da password?</Button>
        <Button onClick={setMode} style={{textTransform:'none',width:'74%', color:'#007370'}}>Sou organizador!</Button>
      </div>
        <Dialog
            open={errorAlert.open}
            onClose={handleErrorAlertClose}>
          <Alert severity="error">
            <AlertTitle>{errorAlert.errorStatus}</AlertTitle>
            Ocorreu um erro. Verifique e tente novamente.
          </Alert>
        </Dialog>
      </Box>
      </Container>
      </>
  )
}

export default LoginForm