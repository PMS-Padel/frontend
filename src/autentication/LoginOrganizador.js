import React from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import { Button, Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const Container = styled.div`
  margin-left: 10px;
  text-align: center;
`


function LoginOrganizador({showMenu, setMode}) {
    return (
        <>
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
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            id="password"
                            label="Password"
                            type="Password"
                            style={{backgroundColor:'#FFFFFF', borderRadius: '5px'}}
                        />
                    </div>
                    <div>
                        <FormGroup style={{marginLeft:'55px'}}>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Lembrar-se de mim" />
                        </FormGroup>
                    </div>
                    <div>
                        <Button style={{marginTop:'20px', backgroundColor:'#052F53', color:'white', width:'74%', borderRadius: '5px', textTransform: 'none'}}>Entrar</Button>
                        <Button style={{color:'black',fontSize:'.7rem',paddingTop:'15px',textTransform:'none',width:'74%'}}>Esqueceu-se da password?</Button>
                    </div>
                </Box>
            </Container>
        </>
    )
}

export default LoginOrganizador