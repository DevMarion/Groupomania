import styled from 'styled-components';

import imageError from '../Images/404.svg';
import colors from '../Outils/colors';

const ErrorTitle = styled.h1`
  color: ${colors.primary};
  font-weight: 300;
  text-align: center;
`;
const Illustration = styled.img`
  max-width: 880px;
  margin-left: 300px;
`;

function Error() {
  return (
    <div>
      <ErrorTitle>Oups... Cette page n'existe pas</ErrorTitle>
      <Illustration src={imageError} />
    </div>
  );
}

export default Error;
