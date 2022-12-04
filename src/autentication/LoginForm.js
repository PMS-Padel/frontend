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


function LoginForm() {
  return (
    <>
    <Container>
      <Button style={{position:'absolute',right:'5px',top:'10px'}}><CloseIcon/></Button>
      <h5 style={{fontWeight:'bold',fontSize:'2rem'}}>Entrar</h5>
      <Box
      marginTop={"50px"}

      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div> 
      <TextField 
            required
            id="email"
            defaultValue="Email"
          />
      </div>
      <div> 
      <TextField 
            required
            id="password"
            defaultValue="Password"
          />
      </div>
      <div>
      <FormGroup style={{marginLeft:'55px'}}>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Lembrar-se de mim" />
      </FormGroup>
      </div>
      <div>
        <Button style={{marginTop:'20px', backgroundColor:'blue', color:'white', width:'74%'}}>Entrar</Button>
        <Button style={{color:'black',fontSize:'.7rem',paddingTop:'15px'}}>Esqueceu-se da password?</Button>
        <Button >Sou organizador!</Button>
      </div>
      </Box>
      </Container>
      </>
  )
}

export default LoginForm