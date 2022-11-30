import { memo } from 'react';

import LogoStarWars from 'assets/space-motors-logo.png';

import { FooterContainer, LinkDesigner, SpanDesignBy } from './styles';

const Footer: React.FC = () => {
  return (
    <footer>
      <FooterContainer>
        <img className="img-fluid" src={LogoStarWars} alt="LogoStarWars" />
        <div className="d-flex my-4">
          <SpanDesignBy>site por</SpanDesignBy>
          <LinkDesigner
            href="https://github.com/matheustvelloso"
            target="_blank"
            rel="noreferrer"
          >
            Matheus Velloso
          </LinkDesigner>
        </div>
      </FooterContainer>
    </footer>
  );
};

export default memo(Footer);
