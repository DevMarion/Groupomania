import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import { UidContext } from './Composants/Context/UidContext';

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
  const [uid, setUid] = useState(null);

  const UidLocalStorage = () => {
    const uid = localStorage.getItem('userId');
    console.log(uid);
    if (!uid) {
      return {};
    } else {
      return JSON.parse(uid);
    }
  };

  return (
    <UidContext.Provider value={{ uid, setUid }}>
      <Router>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route exact path="/" element={<Connexion />}></Route>
          <Route path="/fil-d-actualite" element={<Posts />}></Route>
          <Route element={<Error />}></Route>
        </Routes>
      </Router>
      <Footer />
    </UidContext.Provider>
  );
}

export default App;
