import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import colors from '../../Outils/colors';
import Login from './Login';
import Photo from '../../Images/photo.png';
import Profil from '../../Images/profile.png';

const Icone = styled.img`
  position: absolute;
  width: 20px;
  height: 20px;
  padding: 6px;
  border: 3px solid ${colors.backgroundLight};
  border-radius: 100%;
`;

const Paragraphe = styled.p`
  font-weight: bold;
  color: #34a920;
  text-align: center;
  font-size: 20px;
`;

const Formulaire = styled.div`
  background: ${colors.option};
  border-radius: 50px;
  text-align: center;
  width: 500px;
  margin: 0 auto;
  padding: 0 0 13px 0;
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

const Div = styled.div`
  display: flex;
`;

const Label = styled.label`
  font-size: 20px;
  padding: 0px 0 12px 0;
`;

const Input = styled.input`
  opacity: 0;
  width: 25px;
  height: 25px;
  position: absolute;
`;

const Input2 = styled.input`
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

const Message = styled.div`
  color: red;
  font-weight: bold;
`;

const Img = styled.img`
  height: 52px;
  width: 52px;
  margin-right: 100px;
  border-radius: 20px;
  box-shadow: 1px 1px 3px rgba(51, 51, 51, 0.192);
  object-fit: cover;
`;

function Signup() {
  const [formulaireSubmit, setFormulaireSubmit] = useState(false);
  const [profil, setProfil] = useState();
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controlePassword, setControlePassword] = useState('');
  const [file, setFile] = useState();

  const telechargementPhoto = (e) => {
    setProfil(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    console.log('fichier----', e.target.files[0]);
  };

  const Sinscrire = (e) => {
    e.preventDefault();

    const emailErreur = document.querySelector('.email.erreur');
    const passwordErreur = document.querySelector('.password.erreur');
    const confirmePasswordErreur = document.getElementById(
      'password-confirme-erreur'
    );

    if (password !== controlePassword) {
      confirmePasswordErreur.innerHTML =
        'Les mots de passe ne correspondent pas';
    } else {
      axios({
        method: 'post',
        url: 'http://localhost:3001/api/user/signup',
        data: {
          pseudo: pseudo,
          email: email,
          password: password,
          profil: file,
        },
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((res) => {
          if (res.status === 201) {
            console.log('reponse', res);
            console.log('reponse', file);
            setFormulaireSubmit(true);
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            emailErreur.innerHTML = err.response.data.error;
          }
          if (err.response.status === 400) {
            passwordErreur.innerHTML =
              'Le MDP doit faire au moins 10 caractères, avec une Majuscule, une minuscule et au moins 1 chiffre';
          }
        });
    }
  };

  return (
    <>
      {formulaireSubmit ? (
        <>
          <Login />
          <Paragraphe>
            Création de compte réussi, veuillez vous connecter désormais
          </Paragraphe>
        </>
      ) : (
        <Formulaire>
          <Title>Créer un compte</Title>
          <br />
          <Form
            onSubmit={Sinscrire}
            method="POST"
            action="/profils"
            encType="multipart/form-data"
          >
            <Div>
              <Icone src={Photo} alt="poster" />
              <Input
                type="file"
                id="profil"
                name="profil"
                accept="image/png, image/jpeg, image/jpg, image.gif, image.webp"
                onChange={(e) => telechargementPhoto(e)}
              />
            </Div>
            {profil ? (
              <Img src={profil} alt="" />
            ) : (
              <Img src={Profil} alt="profil" />
            )}
            <br />
            <br />
            <br />
            <Label htmlFor="pseudo">Pseudo</Label>
            <Input2
              type="text"
              name="pseudo"
              id="pseudo"
              autoFocus
              required
              onChange={(e) => setPseudo(e.target.value)}
              value={pseudo}
            />
            <br />
            <Label htmlFor="email">Email</Label>
            <Input2
              type="text"
              name="email"
              id="email"
              autoFocus
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Message className="email erreur"></Message>
            <br />
            <Label htmlFor="password">Mot de passe</Label>
            <Input2
              type="password"
              name="password"
              id="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Message className="password erreur"></Message>
            <br />
            <Label htmlFor="password-confirme">
              Confirmez votre mot de passe
            </Label>
            <Input2
              type="password"
              name="password"
              id="password-confirme"
              required
              onChange={(e) => setControlePassword(e.target.value)}
              value={controlePassword}
            />
            <Message id="password-confirme-erreur"></Message>
            <br />
            <br />
            <Input2
              type="submit"
              value="Validation de l'inscription"
              $dernierInput
            />
          </Form>
        </Formulaire>
      )}
    </>
  );
}

export default Signup;
