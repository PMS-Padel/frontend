/** @format */

import {BrowserRouter, Route, Routes, useParams} from "react-router-dom"

import MenuInicial from './pages/menuInicial'
import InfoPadel from './pages/infoPadel'
import MenuJogador from './pages/player/menuJogador'
import {useState} from "react";
import axiosConfig from "./axiosConfig";

function App() {
    const [loading, setLoading] = useState(false);
    const [storedAuth, setStoredAuth] = useState(localStorage.getItem('auth'));
    const [errorAlertAuth, setErrorAlertAuth] = useState({open: false, severity: 'error', errorStatus: '', description: 'Ocorreu um erro de autenticação de conta. Verifique e tente novamente.'});
    const [errorAlertLogout, setErrorAlertLogout] = useState({open: false, severity: 'error', errorStatus: '', description: 'Ocorreu um erro de logout. Verifique e tente novamente.'});

    function handleErrorAlertCloseAuth() {
        setErrorAlertAuth({...(errorAlertAuth), open: false});
        localStorage.removeItem('auth');
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
                setStoredAuth(null);
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
              {<MenuInicial storedAuth={storedAuth} />} />
          <Route path = "/info" element =
              {<InfoPadel storedAuth={storedAuth}
                          loading={loading}
                          logoutAccount={logoutAccount} errorAlertLogout={errorAlertLogout} handleErrorAlertCloseLogout={handleErrorAlertCloseLogout}/>} />
          <Route path = "/menu" element =
              {<MenuJogador setStoredAuth={setStoredAuth} storedAuth={storedAuth}
                            errorAlertAuth={errorAlertAuth} handleErrorAlertOpenAuth={handleErrorAlertOpenAuth} handleErrorAlertCloseAuth={handleErrorAlertCloseAuth}
                            logoutAccount={logoutAccount}
                  loading={loading} errorAlertLogout={errorAlertLogout} handleErrorAlertCloseLogout={handleErrorAlertCloseLogout}/>}
          />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
