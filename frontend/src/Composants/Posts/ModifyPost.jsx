import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import colors from '../../Outils/colors';
import Envoyer from '../../Images/envoyer.png';
import Annuler from '../../Images/annuler.png';
import axios from 'axios';
import FormData from 'form-data';

const Message = styled.textarea`
  width: 78%;
  font-size: 15px;
  padding: 12px 0 12px 15px;
  margin-left: 10px;
  border-radius: 20px;
  outline: none;
  border: 3px solid ${colors.primary};
  text-overflow: hidden;
`;

const Boutons = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
`;

const Bouton = styled.img`
  height: 20px;
  padding: 6px;
  border: 3px solid ${colors.backgroundLight};
  border-radius: 100%;
`;

function ModifyPost({ post }) {
  console.log('post----- updated 1', post);
  const postToEdit = {
    message: post.message,
    userId: post.userId,
  };

  const [userId, setUserId] = useState(postToEdit.message);
  const [message, setMessage] = useState(postToEdit.message);

  const navigate = useNavigate();

  const telechargementPost = (e) => {
    console.log('post----- updated', post);
    const formData = new FormData();
    formData.append('message', message);
    formData.append('userId', userId);

    axios({
      method: 'PUT',
      url: 'http://localhost:3001/api/post/' + post._id,
      data: formData,
      widthCredentials: true,
      headers: {
        Accept: 'multipart/form-data',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        console.log(JSON.stringify(res.data));
        console.log('reponse', res);
        setMessage('');
        window.location.reload();
      })
      .catch((error) => {
        console.log('AxiosErreur', error);
      });
  };

  const annulePost = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      navigate('/');
    } else {
      setUserId(localStorage.getItem('userId'));
    }
  }, [navigate]);

  return (
    <div>
      <Message
        name="message"
        id="message"
        placeholder="Ecrivez quelque chose..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <br />
      <Boutons>
        {message ? (
          <div onClick={annulePost}>
            <div>
              <Bouton src={Annuler} alt="bouton annuler post" />
            </div>
          </div>
        ) : null}
        {message ? (
          <div onClick={telechargementPost}>
            <Bouton src={Envoyer} alt="bouton envoyer post" />
          </div>
        ) : null}
      </Boutons>
    </div>
  );
}

export default ModifyPost;
