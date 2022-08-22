import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import Valider from '../../Images/valider.png';

const Bouton = styled.button`
  border: none;
  background: none;
`;

const Modifs = styled.img`
  height: 26px;
`;

const Img = styled.img`
  height: 20px;
  padding: 6px;
  border-radius: 100%;
`;

function ModifyPost({ post }) {
  const [message, setMessage] = useState('');

  const postModifie = (e) => {
    console.log('post----------', post);
    console.log('e----------', e);

    e.preventDefault();
    console.log('message');
    // if (message) {
    const formData = new FormData();
    formData.append('message', 'modif ok  ');
    console.log('form', post.message);

    axios({
      method: 'put',
      url: 'http://localhost:3001/api/post/' + post._id,
      data: formData,
      widthCredentials: true,
    })
      .then((res) => {
        console.log('modifier', res);
        // window.location.reload();
      })
      .catch((err) => {
        console.log('erreur : ', err);
      });
    // } //else {
    //   alert('Veuillez entrer un message');
    // }
  };

  return (
    <>
      <div onClick={postModifie}>
        <Img src={Valider} alt="bouton envoyer post" />
      </div>
    </>
  );
}

export default ModifyPost;
