import React from 'react';
import backgroundPic from '../../img/MainNormal2.jpg';

export function HeaderLanding() {
  return (<>
    <div style={{ position: "relative", top: 0, left: 0 }}>
      <img src={backgroundPic} alt="background" style={{ width: "100%", position: 'relative', zIndex: -10, objectFit: "cover", top: 0, left: 0 }} />
      <h2 style={{ textAlign: 'center', color: 'white', fontSize: '40px', position: 'absolute', bottom: "40%", left: "15%", zIndex: "-1" }}>Vem competir</h2>
      <h2 style={{ textAlign: 'center', color: 'white', fontSize: '40px', position: 'absolute', bottom: "40%", right: "15%", zIndex: "-1" }}>e divertir-te!</h2>
    </div>
  </>);
}