import React, {Component} from 'react';
import styled from 'styled-components';
import backgroundPic from '../../img/MainNormal2.jpg';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Row from './Row';




export function HeaderLanding(){
    return (<>
        <div style={{ position: "absolute", top: 0, left: 0 }}>
            <img src={backgroundPic} alt="background" style={{ width: "100%", position: 'relative', zIndex: -10, objectFit: "cover", top: 0, left: 0 }} />
            <h2 style={{ textAlign: 'center', color: 'white', fontSize: '40px', position: 'absolute', top: "45%", left: "15%", zIndex:"-1" }}>Vem competir</h2>
            <h2 style={{ textAlign: 'center', color: 'white', fontSize: '40px', position: 'absolute', top: "45%", right: "15%", zIndex:"-1"}}>e divertir-te!</h2>
        </div>
        <Row style={{ color: 'white', justifyContent: 'space-between', maxWidth: '400px', margin: 'auto', zIndex: 1 }}>
        <div style={{ fontSize: '28px' }}>Início</div>
        <div style={{ fontSize: '28px' }}>Torneios</div>
         <div style={{ fontSize: '28px' }}>Padel</div>
        </Row>
        <AccountCircleIcon  fontSize="large" style={{color: 'white', position: 'absolute', top: "0%", right: "10%"  }}/>
      </>);
    }