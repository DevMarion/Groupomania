import axios from 'axios';
import React from 'react';
import styled from 'styled-components';

import Suppression from '../../Images/delete.png';

const Supp = styled.img`
  height: 26px;
`;

function DeletePost(post) {
  const supprimer = () => {
    axios({
      method: 'delete',
      url: 'http://localhost:3001/api/post/' + post._id,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div
      onClick={() => {
        if (window.confirm('Voulez vous vraiment supprimer le post ?')) {
          supprimer();
        }
      }}
    >
      <Supp src={Suppression} alt="bouton-supprimer" />
    </div>
  );
}

export default DeletePost;
