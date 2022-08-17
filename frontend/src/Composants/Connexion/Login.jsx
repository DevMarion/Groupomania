import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import colors from '../../Outils/colors';

const Formulaire = styled.div`
  background: ${colors.option};
  border-radius: 50px;
  text-align: center;
  width: 500px;
  margin: auto;
  padding: 0 0 36px 0;
`;

const Title = styled.h1`
  color: ${colors.backgroundLight};
  border: 3px ${colors.primary} solid;
  background-color: white;
  border-radius: 50px;
  width: 250px;
  padding: 2%;
  margin: auto;
  font-size: 25px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  font-size: 20px;
  padding: 0 0 12px 0;
`;

const Input = styled.input`
  border-radius: 50px;
  height: 50px;
  width: 100%;
  text-align: center;
  font-size: 20px;
  ${(props) =>
    props.$dernierInput &&
    `background: ${colors.secondary}; color : ${colors.primary}; font-weight : bold; 
    &:hover {
        cursor: pointer;
        box-shadow: 2px 2px 10px ${colors.backgroundLight};
 `}
`;

const Div = styled.div`
  font-weight: bold;
  color: red;
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const SeConnecter = (e) => {
    e.preventDefault();

    const emailErreur = document.querySelector('.email.erreur');
    const passwordErreur = document.querySelector('.password.erreur');

    axios({
      method: 'post',
      url: 'http://localhost:3001/api/user/login',
      widthCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          emailErreur.innerHTML = '';
          passwordErreur.innerHTML = '';

          localStorage.setItem('tokens', JSON.stringify(res.data.token));
          localStorage.setItem('userId', `${res.data.userId}`);
          navigate('/fil-d-actualite');
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          emailErreur.innerHTML = err.response.data.error;
        }
        if (err.response.status === 401) {
          passwordErreur.innerHTML = err.response.data.error;
        }
      });
  };

  return (
    <Formulaire>
      <Title>Se connecter</Title>
      <br />
      <Form action="" onSubmit={SeConnecter}>
        <Label htmlFor="email">Email</Label>
        <Input
          type="text"
          name="email"
          id="email"
          autoFocus
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Div className="email erreur"></Div>
        <br />
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          type="password"
          name="password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Div className="password erreur"></Div>
        <br />
        <br />
        <Input type="submit" value="Se connecter" $dernierInput />
      </Form>
    </Formulaire>
  );
}

export default Login;
