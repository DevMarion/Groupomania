import Signup from '../Composants/Connexion/Signup';
import Login from '../Composants/Connexion/Login';

import { useState } from 'react';
import styled from 'styled-components';

import colors from '../Outils/colors';
import connect from '../Images/connexion.png';
import style from '../Outils/style.css';

const Div = styled.div`
  display: flex;
  align-items: center;
`;

const Div2 = styled.div`
  border: 3px ${colors.primary} solid;
  background: ${colors.option};
  border-radius: 50px;
  width: 60%;
  margin: 10px auto;
`;

const Ul = styled.ul`
  list-style-type: none;
`;

const Li = styled.li`
  border: 3px ${colors.primary} solid;
  border-radius: 50px;
  font-size: 20px;
  width: 200px;
  height: 35px;
  padding-top: 10px;
  text-align: center;
  margin-bottom: 10px;
  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 10px ${colors.backgroundLight};
`;

const Img = styled.img`
  margin-right: 66px;
`;

function Connexion() {
  const [signupChoix, setSignupChoix] = useState(false);
  const [loginChoix, setLoginChoix] = useState(true);

  const Choix = (e) => {
    if (e.target.id === 'creation') {
      setLoginChoix(false);
      setSignupChoix(true);
    }
    if (e.target.id === 'connexion') {
      setLoginChoix(true);
      setSignupChoix(false);
    }
  };

  return (
    <Div>
      <Div2>
        <Ul>
          <Li
            onClick={Choix}
            id="creation"
            className={signupChoix ? 'active_bouton' : 'desactive_bouton'}
          >
            Créer un compte
          </Li>
          <Li
            onClick={Choix}
            id="connexion"
            className={loginChoix ? 'active_bouton' : 'desactive_bouton'}
          >
            Se Connecter
          </Li>
        </Ul>
        {signupChoix && <Signup />}
        {loginChoix && <Login />}
      </Div2>
      <div>
        <Img src={connect} alt="img-log" />
      </div>
    </Div>
  );
}

export default Connexion;
