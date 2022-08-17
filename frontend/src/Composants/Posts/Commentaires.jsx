import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

import Profil from '../../Images/profile.png';
import { timestampParser } from '../../Outils/Date';

const Img = styled.img`
  height: 52px;
  width: 52px;
  margin-right: 20px;
  border-radius: 20px;
  box-shadow: 1px 1px 3px rgba(51, 51, 51, 0.192);
  object-fit: cover;
`;

function Commentaires(post) {
  const [texte, setTexte] = useState('');

  const telechargementComment = (e) => {
    e.preventDefault();

    if (texte) {
      const formData = new FormData();
      formData.append('commentaire', post.comment);

      axios({
        method: 'patch',
        url: 'http://localhost:3001/api/post/commentaire-post/' + post._id,
        data: formData,
      })
        .then(function (response) {
          console.log(response);
          setTexte('');
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <ul>
      {post.commentaires.map((comment) => {
        return (
          <>
            <div key={comment._id}>
              <Img src={Profil} alt="profil" />
            </div>
            <span>{timestampParser(comment.timestamp)}</span>
            <p>{comment.texte}</p>
          </>
        );
      })}
      ,
      <form action="" onSubmit={telechargementComment}>
        <input
          type="text"
          name="texte"
          onChange={(e) => setTexte(e.target.value)}
          value={texte}
          placeholder="Laisser un commentaire..."
        />
        <br />
        <input type="submit" value="envoyer commentaire" />
      </form>
    </ul>
  );
}

export default Commentaires;
