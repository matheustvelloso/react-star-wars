import { memo } from 'react';

import { Container } from 'react-bootstrap';

import LogoStarWars from 'assets/space-motors-logo.png';

import { HeaderContainer } from './styles';

const Header: React.FC = () => {
  return (
    <header>
      <HeaderContainer>
        <Container>
          <img className="img-fluid" src={LogoStarWars} alt="LogoStarWars" />
        </Container>
      </HeaderContainer>
    </header>
  );
};

export default memo(Header);
