import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { HeaderLanding } from '../components/general/HeaderLandingPage';
import React, { useState } from 'react';
import styled from "styled-components";
import NavBar from "../components/general/NavBar";
import Row from "../components/general/Row";
import App from "../App";
import backgroundPic from "../img/JogadorTorneiosInicialBackground.png";
import rectangleImg from "../img/InfoPadelRoundedWhiteRectangle.png";
import imagePexels_1 from "../img/PexelsPaddleImage1.png";
import imagePexels_2 from "../img/PexelsPaddleImage2.png";

const AccountButton = styled(AccountCircleIcon)`
  color: white;
  position: absolute; 
  top: 0%;
  right: 10%
`

export function InfoPadel(){
    return(<>
        <NavBar />
        <div style={{ position: "relative", top: 0, left: 0 }}>
            <img src={backgroundPic} alt="background" style={{ width: "100%", position: 'relative', zIndex: -10, objectFit: "cover", top: 0, left: 0 }} />
            <h1 style={{ textAlign: 'center', fontSize: "40px", color: "white", position: 'absolute', bottom: "90%", left: "5%", zIndex: "-1"}}>Descobre mais sobre o teu desporto!</h1>
            <img src={rectangleImg} alt="rectangleInfo" style={{ width: "94%", height: "75%", borderRadius: "1%", position: 'absolute', zIndex: -10, objectFit: "cover", top: 400, left: 45 }} />
            <h2 style={{ textAlign: 'left', fontSize: "30px", color: "#15608A", position: 'absolute', bottom: "75%", left: "5%", zIndex: "-1"}}>Padel é um desporto de raquete praticado em pares.
                <br/>O mesmo tem um sistema de jogo  semelhante ao ténis, onde os jogadores<br/>têm de
                passar a bola por  cima da rede tendo obrigatoriamente de acertar<br/>no campo adversário.
                Ao contrário do que a normalmente pensamos,<br/>a bola de padel é diferente da bola de ténis,
                apesar da mesma aparência,<br/> as bolas de padel têm menor pressão o que resulta num ressalto
                diferente.</h2>
            <img src={imagePexels_1} alt="imageOne" style={{ width: "35%", position: 'absolute', zIndex: -10, top: 401, left: 1167 }} />
            <img src={imagePexels_2} alt="imageTwo" style={{ width: "35%", position: 'absolute', zIndex: -10, top: 1501, left: 46 }} />
            <h2 style={{ textAlign: 'center', fontSize: "30px", color: "#15608A", position: 'absolute', bottom: "50%", left: "45%", zIndex: "-1"}}>Descobre mais sobre o teu desporto!</h2>
        </div>
    </>
    );
}

export default InfoPadel;