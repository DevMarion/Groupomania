import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import axios from 'axios';

const Bouton = styled.button`
  background: none;
  border: none;
  &:hover {
    transform: scale(1.5);
    color: green;
  }
`;

const Bouton2 = styled.button`
  background: none;
  border: none;
  &:hover {
    transform: scale(1.5);
    color: red;
  }
`;

const Div = styled.div`
  display: flex;
`;

function LikesDislikes({ post }) {
  const Like = (e) => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/api/post/like/' + post._id,
      data: {
        userId: localStorage.getItem('userId'),
        like: 1,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Dislike = (e) => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/api/post/like/' + post._id,
      data: {
        userId: localStorage.getItem('userId'),
        dislike: -1,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Div>
      <Bouton onClick={(e) => Like(e)}>
        <FontAwesomeIcon icon={faThumbsUp} />
        <span>{post.likes}</span>
      </Bouton>
      <Bouton2 onClick={(e) => Dislike(e)}>
        <FontAwesomeIcon icon={faThumbsDown} />
        <span>{post.dislikes}</span>
      </Bouton2>
    </Div>
  );
}

export default LikesDislikes;
