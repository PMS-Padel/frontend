/** @format */

import {BrowserRouter, Route, Routes} from "react-router-dom"

import MenuInicial from './pages/menuInicial'
import InfoPadel from './pages/infoPadel'
import MenuJogador from './pages/player/menuJogador'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<MenuInicial />} />
          <Route path = "/InfoPadel" element = {<InfoPadel />} />
          <Route path = "/MenuJogador" element = {<MenuJogador />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
