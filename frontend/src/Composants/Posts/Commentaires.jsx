import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

import Profil from '../../Images/profile.png';
import colors from '../../Outils/colors';
import { timestampParser } from '../../Outils/Date';
import Modification from '../../Images/modification.png';
import DeleteComment from './DeleteComment';

const Div = styled.div`
  border-radius: 20px;
  border: 3px solid ${colors.backgroundLight};
  padding: 16px 16px 12px 3px;
`;

const Ul = styled.ul`
  padding: 0;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 12px 10px 0 15px;
  margin-left: 10px;
  border: 3px solid ${colors.primary};
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Img = styled.img`
  height: 52px;
  width: 52px;
  margin-right: 20px;
  border-radius: 20px;
  box-shadow: 1px 1px 3px rgba(51, 51, 51, 0.192);
  object-fit: cover;
`;

const Input = styled.input`
  border-radius: 20px;
  background: ${colors.secondary};
  width: 95%;
  height: 100%;
  padding: 12px 0 12px 15px;
  margin-left: 10px;
  border: 3px solid ${colors.primary};
`;

const Input2 = styled.input`
  border-radius: 20px;
  background: ${colors.backgroundLight};
  color: white;
  font-weight: bold;
`;

const Bouton = styled.button`
  border: none;
  background: none;
`;

const Modif = styled.img`
  height: 26px;
`;

const Div2 = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Textarea = styled.textarea`
  width: 330%;
  font-size: 15px;
  padding: 5px 0 0 15px;
  margin: 7px 0px 5px 0px;
  border-radius: 20px;
  outline: none;
  border: 3px solid ${colors.primary};
`;

function Commentaires({ post }) {
  const [texte, setTexte] = useState('');
  const [modifie, setModifie] = useState(false);

  const telechargementComment = (e) => {
    e.preventDefault();

    if (texte) {
      const formData = new FormData();
      formData.append('userId', post.commentaires.userId);
      //formData.append('userPseudo', post.commentaires.pseudo);
      formData.append('texte', post.commentaires.texte);

      axios({
        method: 'patch',
        url: 'http://localhost:3001/api/post/commentaire-post/' + post._id,
        data: formData,
      })
        .then((res) => {
          console.log(res);
          setTexte('');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Div>
      <Ul>
        {post.commentaires.map((comment) => {
          return (
            <>
              <CommentContainer key={comment._id}>
                <UserContainer>
                  <Img src={Profil} alt="profil" />
                  <span>{timestampParser(comment.timestamp)}</span>
                </UserContainer>
                <Div2>
                  {modifie === false && <p>{comment.texte}</p>}
                  {modifie && <Textarea defaultValue={comment.texte} />}
                  <Bouton onClick={() => setModifie(!modifie)}>
                    <Modif src={Modification} alt="modification" />
                  </Bouton>
                </Div2>
                <DeleteComment comment={comment} post={post} />
              </CommentContainer>
              <br />
            </>
          );
        })}
        <form action="" onSubmit={telechargementComment}>
          <Input
            type="text"
            name="texte"
            onChange={(e) => setTexte(e.target.value)}
            value={texte}
            placeholder="Laisser un commentaire..."
          />
          <br />
          <Input2 type="submit" value="envoyer commentaire" />
        </form>
      </Ul>
    </Div>
  );
}

export default Commentaires;
