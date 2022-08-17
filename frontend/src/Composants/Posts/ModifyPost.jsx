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

function ModifyPost(post) {
  const formData = new FormData();
  formData.append('message', post.message);

  axios({
    method: 'put',
    url: 'http://localhost:3001/api/post/' + post._id,
    data: formData,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <Bouton onClick={ModifyPost}>
      <Modifs src={Valider} alt="valider les modifications" />
    </Bouton>
  );
}

export default ModifyPost;
