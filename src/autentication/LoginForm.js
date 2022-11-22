import React from 'react'
import styled from 'styled-components'
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';



const Container = styled.div`
  display:'flex';
  
`


function LoginForm() {
  return (
    <Box
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
          id="username"
          label="Required"
          defaultValue="Username"
        />
    </div>
    </Box>
  )
}

export default LoginForm