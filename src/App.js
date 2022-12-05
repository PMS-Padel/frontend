/** @format */

import {Routes, Route, BrowserRouter} from "react-router-dom"

import MenuInicial from './pages/menuInicial'
import InfoPadel from './pages/infoPadel'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<MenuInicial />} />
          <Route path = "/InfoPadel" element = {<InfoPadel />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
