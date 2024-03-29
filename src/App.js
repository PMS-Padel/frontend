/** @format */

import {BrowserRouter, Route, Routes, useParams} from "react-router-dom"

import MenuInicial from './pages/menuInicial'
import InfoPadel from './pages/infoPadel'
import MenuJogador from './pages/player/menuJogador'
import {useState} from "react";
import axiosConfig from "./axiosConfig";
import MenuOrganizador from "./pages/organizador/menuOrganizador";
import NotFound from "./pages/error404";
import TourneyList from "./pages/listTourney";
import OrganizeTourney from "./pages/organizador/organizeTourney";
import SettingsAccount from "./pages/settingsAccount";
import TourneyPage from "./pages/pageTourney";

import { DndProvider } from "react-dnd";

function App() {
    const [loading, setLoading] = useState(false);
    const [storedAuth, setStoredAuth] = useState(localStorage.getItem('auth') ?? sessionStorage.getItem('auth'));
    const [errorAlertAuth, setErrorAlertAuth] = useState({open: false, severity: 'error', errorStatus: '', description: 'Ocorreu um erro de autenticação de conta. Verifique e tente novamente.'});
    const [errorAlertLogout, setErrorAlertLogout] = useState({open: false, severity: 'error', errorStatus: '', description: 'Ocorreu um erro de logout. Verifique e tente novamente.'});

    function handleErrorAlertCloseAuth() {
        setErrorAlertAuth({...(errorAlertAuth), open: false});
        localStorage.removeItem('auth');
        sessionStorage.removeItem('auth');
        setStoredAuth(null);
    }
    function handleErrorAlertOpenAuth() {
        setErrorAlertAuth({...(errorAlertAuth), open: true});
    }

    function handleErrorAlertCloseLogout() {
        setErrorAlertLogout({...(errorAlertLogout), open: false});
    }

    function logoutAccount(){
        setLoading(true);
        axiosConfig.post('/logout', {}, {
            headers: {
                Authorization: 'Bearer ' + storedAuth
            }
        })
            .then(response => {
                setLoading(false);
                localStorage.removeItem('auth');
                sessionStorage.removeItem('auth');
                localStorage.removeItem('loginForm');
                setStoredAuth(null);
                window.location.reload();
            })
            .catch(error => {
                setLoading(false);
                setErrorAlertLogout({...(errorAlertLogout), open: true, errorStatus: error.code});
            })
    }

  return (

      <BrowserRouter>
        <Routes>
          <Route path = "/" element =
              {<MenuInicial setStoredAuth={setStoredAuth} storedAuth={storedAuth} />} />
          <Route path = "/info" element =
              {<InfoPadel setStoredAuth={setStoredAuth} storedAuth={storedAuth}
                          errorAlertAuth={errorAlertAuth} handleErrorAlertOpenAuth={handleErrorAlertOpenAuth} handleErrorAlertCloseAuth={handleErrorAlertCloseAuth}
                          loading={loading}
                          logoutAccount={logoutAccount} errorAlertLogout={errorAlertLogout} handleErrorAlertCloseLogout={handleErrorAlertCloseLogout}/>} />
          <Route path = "/menu-jogador" element =
              {<MenuJogador setStoredAuth={setStoredAuth} storedAuth={storedAuth}
                            errorAlertAuth={errorAlertAuth} handleErrorAlertOpenAuth={handleErrorAlertOpenAuth} handleErrorAlertCloseAuth={handleErrorAlertCloseAuth}
                            loading={loading}
                            logoutAccount={logoutAccount} errorAlertLogout={errorAlertLogout} handleErrorAlertCloseLogout={handleErrorAlertCloseLogout}/>}
          />
          <Route path = "/menu-organizador" element =
              {<MenuOrganizador setStoredAuth={setStoredAuth} storedAuth={storedAuth}
                            errorAlertAuth={errorAlertAuth} handleErrorAlertOpenAuth={handleErrorAlertOpenAuth} handleErrorAlertCloseAuth={handleErrorAlertCloseAuth}
                            loading={loading}
                            logoutAccount={logoutAccount} errorAlertLogout={errorAlertLogout} handleErrorAlertCloseLogout={handleErrorAlertCloseLogout}/>}
          />
            <Route path = "/torneios" element =
                {<TourneyList setStoredAuth={setStoredAuth} storedAuth={storedAuth}
                                  errorAlertAuth={errorAlertAuth} handleErrorAlertOpenAuth={handleErrorAlertOpenAuth} handleErrorAlertCloseAuth={handleErrorAlertCloseAuth}
                                  logoutAccount={logoutAccount} errorAlertLogout={errorAlertLogout} handleErrorAlertCloseLogout={handleErrorAlertCloseLogout}/>}
            />
            <Route path = "/torneio/:id" element =
                {<TourneyPage setStoredAuth={setStoredAuth} storedAuth={storedAuth}
                              errorAlertAuth={errorAlertAuth} handleErrorAlertOpenAuth={handleErrorAlertOpenAuth} handleErrorAlertCloseAuth={handleErrorAlertCloseAuth}
                              loading={loading}
                              logoutAccount={logoutAccount} errorAlertLogout={errorAlertLogout} handleErrorAlertCloseLogout={handleErrorAlertCloseLogout}/>}
            />
            <Route path = "/organizar" element =
                {<OrganizeTourney setStoredAuth={setStoredAuth} storedAuth={storedAuth}
                              errorAlertAuth={errorAlertAuth} handleErrorAlertOpenAuth={handleErrorAlertOpenAuth} handleErrorAlertCloseAuth={handleErrorAlertCloseAuth}
                              loading={loading}
                              logoutAccount={logoutAccount} errorAlertLogout={errorAlertLogout} handleErrorAlertCloseLogout={handleErrorAlertCloseLogout}/>}
            />
            <Route path = "/settings" element =
                {<SettingsAccount setStoredAuth={setStoredAuth} storedAuth={storedAuth}
                                  errorAlertAuth={errorAlertAuth} handleErrorAlertOpenAuth={handleErrorAlertOpenAuth} handleErrorAlertCloseAuth={handleErrorAlertCloseAuth}
                                  loading={loading}
                                  logoutAccount={logoutAccount} errorAlertLogout={errorAlertLogout} handleErrorAlertCloseLogout={handleErrorAlertCloseLogout}/>}
            />
          <Route path='*' element={<NotFound setStoredAuth={setStoredAuth} storedAuth={storedAuth}
                                     errorAlertAuth={errorAlertAuth} handleErrorAlertOpenAuth={handleErrorAlertOpenAuth} handleErrorAlertCloseAuth={handleErrorAlertCloseAuth}
                                     loading={loading}
                                     logoutAccount={logoutAccount} errorAlertLogout={errorAlertLogout} handleErrorAlertCloseLogout={handleErrorAlertCloseLogout}/>}/>
        </Routes>
      </BrowserRouter>

  );
}

export default App;
