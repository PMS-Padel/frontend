import React from 'react'
import styled from 'styled-components'
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import { Button, Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const Container = styled.div`
  margin-left: 10px;
  text-align: center;
`

function RegisterForm() {
  return (
    <>
    <Container>
      <Button style={{position:'absolute',right:'5px',top:'10px'}}><CloseIcon/></Button>
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
      />
      </div>
      <div> 
      <TextField 
            required
            variant="filled"
            id="password"
            label="Password"
            type="Password"
            style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
            InputProps={{
              disableUnderline: true
            }}
      />
      </div>
      <div>
        <Button style={{marginTop:'20px', backgroundColor:'#008A87', color:'white', width:'74%', textTransform: 'none', borderRadius: '5px'}}>Criar conta</Button>
      </div>
      </Box>

    </Container>
    </>

  )
}

export default RegisterForm