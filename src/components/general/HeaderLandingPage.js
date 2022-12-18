import React from 'react';
import backgroundDefault from '../../img/MainNormal2.jpg';
import backgroundOrganizador from '../../img/MainOrganizador2.jpg';

export function HeaderLanding({firstText, secondText}) {
  let backgroundPic = (firstText === 'Organiza os melhores' ? backgroundOrganizador : backgroundDefault);

  return (<>
    <div style={{ position: "relative", top: 0, left: 0 }}>
      <img src={backgroundPic} alt="background" style={{ width: "100%", position: 'relative', zIndex: -10, objectFit: "cover", top: 0, left: 0 }} />
      <h2 style={{ textAlign: 'center', color: 'white', fontSize: '40px', position: 'absolute', bottom: "40%", left: "15%", zIndex: "-1" }}>{firstText}</h2>
      <h2 style={{ textAlign: 'center', color: 'white', fontSize: '40px', position: 'absolute', bottom: "40%", right: "15%", zIndex: "-1" }}>{secondText}</h2>
    </div>
  </>);
}