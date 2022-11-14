/** @format */

import zIndex from '@mui/material/styles/zIndex';
import { color, sizeHeight } from '@mui/system';
import Button from './components/general/Button';
import Row from './components/general/Row';
import backgroundPic from './img/MainNormal2.jpg';
import userIcon from './img/userIcon.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function App() {

  
  
  return (<>
    <div style={{ position: "absolute", top: 0, left: 0 }}>
      <img src={backgroundPic} alt="background" style={{ width: "100%", position: 'relative', zIndex: -10, objectFit: "cover", top: 0, left: 0 }} />
      <h2 style={{ textAlign: 'center', color: 'white', fontSize: '40px', position: 'absolute', top: "45%", left: "15%" }}>Vem competir</h2>
      <h2 style={{ textAlign: 'center', color: 'white', fontSize: '40px', position: 'absolute', top: "45%", right: "15%" }}>e divertir-te!</h2>
    </div>
    <Row style={{ color: 'white', justifyContent: 'space-between', maxWidth: '400px', margin: 'auto', zIndex: 1 }}>
      <div style={{ fontSize: '28px' }}>Início</div>
      <div style={{ fontSize: '28px' }}>Torneios</div>
      <div style={{ fontSize: '28px' }}>Padel</div>
    </Row>
    <AccountCircleIcon onClick={openLoginForm} fontSize="large" style={{color: 'white', position: 'absolute', top: "1%", right: "10%"  }}/>
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
