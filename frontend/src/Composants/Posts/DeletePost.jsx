import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Suppression from '../../Images/delete.png';

const Supp = styled.img`
  height: 26px;
`;

function DeletePost({ post }) {
  const mySwal = withReactContent(Swal);

  const supprimer = () => {
    mySwal
      .fire({
        icon: 'warning',
        iconColor: 'blue',
        title: 'Voulez vous vraiment supprimer ce post ?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Supprimer',
        confirmButtonColor: 'green',
        denyButtonText: `Ne pas supprimer`,
      })
      .then((res) => {
        if (res.isConfirmed) {
          axios({
            method: 'delete',
            url: 'http://localhost:3001/api/post/' + post._id,
          })
            .then((res) => {
              console.log('réponse', res);
              mySwal.fire({
                icon: 'success',
                title: 'Post supprimé',
              });
              window.location.reload();
            })
            .catch((err) => {
              console.log('erreur : ', err);
            });
        } else if (res.isDenied) {
          mySwal.fire({
            icon: 'error',
            title: 'Post non supprimé',
            confirmButtonColor: 'green',
          });
        }
      });
  };

  return (
    <div
      onClick={() => {
        supprimer();
      }}
    >
      <Supp src={Suppression} alt="bouton-supprimer" />
    </div>
  );
}

export default DeletePost;
