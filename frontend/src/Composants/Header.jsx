import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Logo from '../Images/icon-left-font.png';
import LogoOut from '../Images/logout.svg';
import colors from '../Outils/colors';

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid ${colors.backgroundLight};
`;

const Image = styled.img`
  height: 50px;
`;

const Image2 = styled.img`
  height: 30px;
`;

function Header() {
  return (
    <Div>
      <Image src={Logo} alt="logo Groupomania rouge" />
      <Link to="/">
        <Image2 src={LogoOut} alt="icone Logout" />
      </Link>
    </Div>
  );
}

export default Header;
