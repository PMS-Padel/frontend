import React, {useState} from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {Alert, AlertTitle, Button, Dialog} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import axiosConfig from '../axiosConfig';
import {helperTextName, helperTextEmail, helperTextPassword, helperTextConfirmPassword} from './dataConditions';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Container = styled.div`
  margin-left: 10px;
  text-align: center;
`

function RegisterForm({showMenu, setMode}) {
  const [loading, setLoading] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState({open: false, errorStatus: ''});
  const handleErrorAlertClose = () => {
    setErrorAlert({...errorAlert, open: false});
  };
  const [successAlert, setSuccessAlert] = React.useState(false);
  const handleSuccessAlertClose = () => {
    setSuccessAlert(false);
    setMode();
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  function submitRegister() {
    if(!(typeof helperTextName(name) === 'string' || typeof helperTextEmail(email) === 'string' ||
        typeof helperTextPassword(password) === 'string' || typeof helperTextConfirmPassword(confirm_password, password) === 'string')) {
      setLoading(!loading);
      axiosConfig.post('/register', {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirm_password,
        role: 'player',
        gender: 'M'
      })
          .then(response => {
            setLoading(false);
            setSuccessAlert(true);
          })
          .catch(error => {
            setLoading(false);
            setErrorAlert({...errorAlert, open: true, errorStatus: error.code});
          })
    }
  }

  return (
    <>
    <Backdrop
        sx={{ borderRadius: '30px', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
    <Container>
      <Button onClick={showMenu} style={{position:'absolute',right:'5px',top:'10px'}}><CloseIcon/></Button>
      <h5 style={{fontWeight:'bold',fontSize:'2rem',margin:"20px 20px 10px"}}>Registar-se</h5>
      <Box
      marginTop={"10px"}

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
            variant="outlined"
            id="nome"
            label="Nome"
            placeholder="Nome"
            style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
            onChange={(event) => {setName(event.target.value)}}
            error={typeof helperTextName(name) === 'string'}
            helperText={helperTextName(name)}
      />
      </div>
      <div> 
      <TextField 
            required
            variant="outlined"
            id="email"
            label="Email"
            placeholder="Email"
            style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
            onChange={(event) => {setEmail(event.target.value)}}
            error={typeof helperTextEmail(email) === 'string'}
            helperText={helperTextEmail(email)}
      />
      </div>
      <div> 
      <TextField 
            required
            variant="outlined"
            id="password"
            label="Password"
            type="Password"
            style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
            onChange={(event) => {setPassword(event.target.value)}}
            error={typeof helperTextPassword(password) === 'string'}
            helperText={helperTextPassword(password)}
            //helperText="A password deve estar entre 8 a 30 caracteres e tem de ter pelo menos 1 letra maiúscula, 1 letra minúscula, 1 dígito e 1 caracter especial: @$!%*?&"
      />
      </div>
      <div>
      <TextField
          required
          variant="outlined"
          id="confirm_password"
          label="Confirmar Password"
          type="Password"
          style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
          onChange={(event) => {setConfirmPassword(event.target.value)}}
          error={typeof helperTextConfirmPassword(confirm_password, password) === 'string'}
          helperText={helperTextConfirmPassword(confirm_password, password)}
      />
      </div>
      <div>
        <Button onClick={submitRegister} style={{marginTop:'20px', backgroundColor:'#008A87', color:'white', width:'74%', textTransform: 'none', borderRadius: '5px'}}>Criar conta</Button>
      </div>
         <Dialog
            open={errorAlert.open}
            onClose={handleErrorAlertClose}>
           <Alert severity="error">
             <AlertTitle>{errorAlert.errorStatus}</AlertTitle>
             Ocorreu um erro. Verifique e tente novamente.
           </Alert>
         </Dialog>
          <Dialog
              open={successAlert}
              onClose={handleSuccessAlertClose}>
            <Alert severity="success">
              <AlertTitle>SUCCESS</AlertTitle>
              A conta foi registada com sucesso!
            </Alert>
          </Dialog>
      </Box>

    </Container>
    </>

  )
}

export default RegisterForm