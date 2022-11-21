/** @format */

import zIndex from '@mui/material/styles/zIndex';
import { color, sizeHeight } from '@mui/system';
import Button from './components/general/Button';
import Row from './components/general/Row';
import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { HeaderLanding } from './components/general/HeaderLandingPage';
import {useState} from 'react';

const AccountButton = styled(AccountCircleIcon)`
  color: white;
  position: absolute; 
  top: 0%;
  right: 10%
`

function App() {
  const [showMenu, setShowMenu]= useState(false)


  return (<>
    
    <HeaderLanding/>
    <div>
      <AccountButton fontSize='large' onClick={()=>{
        setShowMenu(!showMenu)
      }}/>
      {showMenu && 
        <div style={{position:"absolute" ,width:"515px", height:"617px", borderRadius:"10px", top:"20%", left:"23%", backgroundColor:"#E5E5E5"}}>
        <h1 style={{position:"relative", left:"42%", top:"5%", fontWeight:"bold", fontSize:"5",}}>Entrar</h1>
          <div style={{position:"relative", left:"-14%", width: "1092px", height:"512px", borderRadius:'10px', backgroundColor:'#007370', zIndex:"-1"}}>
          </div>
        </div>
    }
    </div>
    <div style={{position:"absolute", top:"100%", left:"10%" }}>
    <h1 style={{fontSize: "40px", color: "#052F53"}}>Torneios</h1>
    </div>
    <Row style={{color:'white', justifyContent:"center", maxWidth:'1000px', position:"absolute", top:"115%", left:"29%"}}>
      <div style={{width:"230px", height:"250px", backgroundColor:"#6F9BC3", borderRadius:"5%"}}></div>
      <div style={{width:"20px"}}/>
      <div style={{width:"230px", height:"250px", backgroundColor:"#6F9BC3", borderRadius:"5%"}}></div>
      <div style={{width:"20px"}}/>
      <div style={{width:"230px", height:"250px", backgroundColor:"#6F9BC3", borderRadius:"5%"}}></div>
    </Row>
    <div style={{position:"absolute", top:"130%"}}>
      
    </div>
    </>
  );
}

export default App;
