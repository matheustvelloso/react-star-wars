import { memo } from 'react';

import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import LogoStarWars from 'assets/space-motors-logo.png';

import { HeaderContainer } from './styles';

const Header: React.FC = () => {
  return (
    <header>
      <HeaderContainer>
        <Container>
          <Link to="/">
            <img className="img-fluid" src={LogoStarWars} alt="LogoStarWars" />
          </Link>
        </Container>
      </HeaderContainer>
    </header>
  );
};

export default memo(Header);
