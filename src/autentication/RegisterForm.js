import React, {useState} from 'react'
import styled from 'styled-components'
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import { Button, Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import axiosConfig from '../axiosConfig';


const Container = styled.div`
  margin-left: 10px;
  text-align: center;
`

function RegisterForm({showMenu}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  function submitRegister() {
    axiosConfig.post('/register', {
      name: name,
      email: email,
      password: password,
      password_confirmation: confirm_password,
      role: 'player',
      gender: 'M'
      })
        .then(response => {
          console.log('entrou');
          console.log(response);
        })
        .catch(error => {
          console.log('erro!');
          console.log(error);
        })
  }

  return (
    <>
    <Container>
      <Button onClick={showMenu} style={{position:'absolute',right:'5px',top:'10px'}}><CloseIcon/></Button>
      <h5 style={{fontWeight:'bold',fontSize:'2rem'}}>Registar-se</h5>
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
            variant="outlined"
            id="nome"
            label="Nome"
            placeholder="Nome"
            style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
            onChange={(event) => {setName(event.target.value)}}
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
      />
      </div>
      <div>
        <Button onClick={submitRegister} style={{marginTop:'20px', backgroundColor:'#008A87', color:'white', width:'74%', textTransform: 'none', borderRadius: '5px'}}>Criar conta</Button>
      </div>
      </Box>

    </Container>
    </>

  )
}

export default RegisterForm