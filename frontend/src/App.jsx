import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { UidProvider } from './Composants/Context/UidContext';
import { TokenProvider } from './Composants/Context/TokenContext';

import colors from './Outils/colors';
import Connexion from './Pages/Connexion';
import Posts from './Pages/Posts';
import Error from './Composants/Error';
import Header from './Composants/Header';
import Footer from './Composants/Footer';

const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Lato';

        &::selection {
          background : ${colors.secondary};
        }
    }
`;

function App() {
  const [uid, setUid] = useState('');
  const [token, setToken] = useState('');

  return (
    <UidProvider value={{ uid, setUid }}>
      <TokenProvider value={{ token, setToken }}>
        <Router>
          <GlobalStyle />
          <Header />
          <Routes>
            <Route exact path="/" element={<Connexion />}></Route>
            <Route path="/fil-d-actualite" element={<Posts />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
        </Router>
        <Footer />
      </TokenProvider>
    </UidProvider>
  );
}

export default App;
