/** @format */

import zIndex from '@mui/material/styles/zIndex';
import { color, sizeHeight } from '@mui/system';
import Button from './components/general/Button';
import Row from './components/general/Row';
import backgroundPic from './img/MainNormal.jpg';

function App() {
  return (<>
    <div style={{ position: "absolute", top: 0, left: 0 }}>
      <img src={backgroundPic} alt="background" style={{ width: "100%", position: 'relative', zIndex: -10, objectFit: "cover", top: 0, left: 0 }} />
      <h2 style={{ textAlign: 'center', color: 'white', fontSize: '40px', position: 'absolute', top: "38%", left: "10%" }}>Vem competir</h2>
      <h2 style={{ textAlign: 'center', color: 'white', fontSize: '40px', position: 'absolute', top: "38%", right: "10%" }}>e divertir-te!</h2>
    </div>
    <Row style={{ color: 'white', justifyContent: 'space-between', maxWidth: '400px', margin: 'auto', zIndex: 1 }}>
      <div style={{ fontSize: '28px' }}>Início</div>
      <div style={{ fontSize: '28px' }}>Torneios</div>
      <div style={{ fontSize: '28px' }}>Padel</div>
    </Row>
    <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
      Learn React
    </a></>
  );
}

export default App;
