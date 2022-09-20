import { memo } from 'react';

import LogoStarWars from 'assets/space-motors-logo.png';

import { FooterContainer, SpanDesignBy, SpanDesigner } from './styles';

const Footer: React.FC = () => {
  return (
    <footer>
      <FooterContainer>
        <img className="img-fluid" src={LogoStarWars} alt="LogoStarWars" />
        <div className="d-flex my-4">
          <SpanDesignBy>site por</SpanDesignBy>
          <SpanDesigner>Matheus Velloso</SpanDesigner>
        </div>
      </FooterContainer>
    </footer>
  );
};

export default memo(Footer);
