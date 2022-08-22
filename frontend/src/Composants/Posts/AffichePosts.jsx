import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import { Vide, dateParser } from '../../Outils/Date';
import colors from '../../Outils/colors';
import Profil from '../../Images/profile.png';
import commentaires from '../../Images/commentaires.png';
import Modification from '../../Images/modification.png';
import DeletePost from './DeletePost';
import ModifyPost from './ModifyPost';
import Commentaires from './Commentaires';
import LikesDislikes from './Likes_Dislikes';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 5px solid ${colors.secondary};
  border-radius: 20px;
  margin: 10px;
  padding: 16px;
  width: 80%;
`;

const Header = styled.div`
  display: flex;
`;

const Img = styled.img`
  height: 52px;
  width: 52px;
  margin-right: 20px;
  border-radius: 20px;
  box-shadow: 1px 1px 3px rgba(51, 51, 51, 0.192);
  object-fit: cover;
`;

const Photo = styled.img`
  width: 80%;
  height: 400px;
  border-radius: 30px;
  margin: auto;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Modif = styled.img`
  height: 26px;
`;

const Message = styled.textarea`
  width: 330%;
  font-size: 15px;
  padding: 5px 0 12px 15px;
  margin-left: 10px;
  border-radius: 20px;
  outline: none;
  border: 3px solid ${colors.primary};
`;

const Bouton2 = styled.button`
  border: none;
  background: none;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
`;

function PostsListe() {
  const [posts, setPosts] = useState([]);
  const [modifie, setModifie] = useState(false);
  const [texteModifie, setTexteModifie] = useState(null);
  const [comments, setComments] = useState(false);

  const getAllPosts = () => {
    axios({
      method: 'get',
      url: 'http://localhost:3001/api/post',
    })
      .then((response) => {
        const allPosts = response.data.posts;
        console.log('photo', response.data.posts[0].photo);
        console.log('allPosts', allPosts);
        setPosts(allPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => getAllPosts(), []);

  return (
    <ul>
      {!Vide(posts[0]) &&
        posts.map((post) => {
          return (
            <Container key={post._id}>
              <Header>
                <Img src={Profil} alt="profil" />
                <span> {dateParser(post.createdAt)}</span>
              </Header>
              <Div>
                {modifie === false && <p>{post.message}</p>}
                {modifie && (
                  <div>
                    <Message
                      defaultValue={post.message}
                      onChange={(e) => setTexteModifie(e.target.value)}
                    />
                  </div>
                )}
                <div>
                  <Bouton2 onClick={() => setModifie(!modifie)}>
                    <Modif src={Modification} alt="modification" />
                  </Bouton2>
                  {modifie && <ModifyPost post={post} />}
                  <DeletePost post={post} />
                </div>
              </Div>
              {post.photo && <Photo src={post.photo} alt="card" />}
              {post.video && (
                <iframe
                  width="500"
                  height="200"
                  src={post.video}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={post._id}
                ></iframe>
              )}
              <br />
              <Footer>
                <Modif
                  onClick={() => setComments(!comments)}
                  src={commentaires}
                  alt="icone commentaire"
                />
                <span>{post.commentaires.lenght}</span>
                <LikesDislikes post={post} />
              </Footer>
              <br />
              {comments && <Commentaires post={post} />}
            </Container>
          );
        })}
    </ul>
  );
}

export default PostsListe;
