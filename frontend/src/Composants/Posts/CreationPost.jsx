import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Loader } from '../Loader';
import { Vide, timestampParser } from '../../Outils/Date';
import Profil from '../../Images/profile.png';
import colors from '../../Outils/colors';
import Photo from '../../Images/photo.png';
import Supprimer from '../../Images/Supprimer.png';
import Envoyer from '../../Images/envoyer.png';
import Annuler from '../../Images/annuler.png';
import axios from 'axios';
import FormData from 'form-data';

const Container = styled.div`
  margin: 15px 0px 0px 57px;
  padding: 16px 0 16px 0;
  border-radius: 20px;
  background: ${colors.secondary};
  width: 80%;
  display: flex;
  flex-direction: column;
`;

const PostContainer = styled.div`
  border-radius: 20px;
  background: white;
  width: 90%;
  height: 100%;
  font-size: 20px;
  padding: 12px 0 12px 15px;
  margin-left: 10px;
  border: 3px solid ${colors.primary};
`;

const Message = styled.textarea`
  width: 90%;
  font-size: 15px;
  padding: 12px 0 12px 15px;
  margin-left: 10px;
  border-radius: 20px;
  outline: none;
  border: 3px solid ${colors.primary};
  text-overflow: hidden;
`;

const Message2 = styled.p`
  width: 95%;
  height: 20px;
  font-size: 15px;
  padding: 12px 0 12px 15px;
  margin-left: 10px;
  word-wrap: break-word;
  overflow: auto;
`;

const Video = styled.div`
  text-align: center;
`;

const Img2 = styled.img`
  width: 98%;
  height: 300px;
  border-radius: 6px;
  margin-top: 12px;
`;

const HeaderPost = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Instant = styled.span`
  font-size: 15px;
  padding-right: 3%;
`;

const Img = styled.img`
  height: 52px;
  width: 52px;
  margin-right: 20px;
  border-radius: 20px;
  box-shadow: 1px 1px 3px rgba(51, 51, 51, 0.192);
  object-fit: cover;
`;

const Ensemble = styled.div`
  position: relative;
  width: 30px;
  height: 20px;
`;

const Icone = styled.img`
  position: absolute;
  width: 20px;
  height: 20px;
  padding: 6px;
  border: 3px solid ${colors.backgroundLight};
  border-radius: 100%;
`;

const Input = styled.input`
  opacity: 0;
  width: 25px;
  height: 25px;
  position: absolute;
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

function CreationPost() {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState();
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState('');
  const [fichier, setFichier] = useState();

  const navigate = useNavigate();

  const telechargementPhoto = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFichier(e.target.files[0]);
    setVideo('');
  };

  const telechargementPost = (e) => {
    const formData = new FormData();
    formData.append('message', message);
    formData.append('photo', fichier);
    formData.append('video', video);
    formData.append('userId', userId);

    axios({
      method: 'POST',
      url: 'http://localhost:3001/api/post',
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
        console.log('reponse', fichier);
        setMessage('');
        setImage(null);
        setVideo('');
        window.location.reload();
      })
      .catch((error) => {
        console.log('AxiosErreur', error);
      });
  };

  const annulePost = () => {
    setMessage('');
    setImage('');
    setVideo('');
  };

  useEffect(() => {
    setLoading(true);

    const telechargementVideo = () => {
      setLoading(true);
      let findLink = message.split(' ');
      for (let i = 0; i < findLink.length; i++) {
        if (
          findLink[i].includes('https://www.yout') ||
          findLink[i].includes('https://yout')
        ) {
          let embed = findLink[i].replace('watch?v=', 'embed/');
          setVideo(embed.split('&')[0]);
          findLink.splice(i, 1);
          setMessage(findLink.join(' '));
          setImage('');
        }
      }
    };

    telechargementVideo();
    setLoading(false);
  }, [message, image, video]);

  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      navigate('/');
    } else {
      setUserId(localStorage.getItem('userId'));
    }
  }, [navigate]);

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Message
            name="message"
            id="message"
            placeholder="Ecrivez quelque chose..."
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <br />
          {message || image || video.length > 20 ? (
            <PostContainer>
              <HeaderPost>
                <Img src={Profil} alt="profil" />
                <Instant>{timestampParser(Date.now())}</Instant>
              </HeaderPost>
              <div>
                <Message2>{message}</Message2>
                {image ? <Img2 src={image} /> : null}
                {video && (
                  <Video>
                    <iframe
                      src={video}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                      allowFullScreen
                      title={video}
                    ></iframe>
                  </Video>
                )}
              </div>
            </PostContainer>
          ) : null}
          <Ensemble>
            {Vide(video) && (
              <>
                <Icone src={Photo} alt="poster" />
                <Input
                  type="file"
                  id="fichier"
                  name="fichier"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => telechargementPhoto(e)}
                />
              </>
            )}
            {video && (
              <div onClick={() => setVideo('')}>
                <Bouton src={Supprimer} alt="Supprimer la video" />
              </div>
            )}
          </Ensemble>
          <Boutons>
            {message || image || video.length > 20 ? (
              <div onClick={annulePost}>
                <Bouton src={Annuler} alt="bouton annuler post" />
              </div>
            ) : null}
            <div onClick={telechargementPost}>
              <Bouton src={Envoyer} alt="bouton envoyer post" />
            </div>
          </Boutons>
        </>
      )}
    </Container>
  );
}

export default CreationPost;
