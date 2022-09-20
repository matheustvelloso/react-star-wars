import styled from 'styled-components';

import BannerStarWars from 'assets/space-motors-picture.png';

export const BannerBackground = styled.div`
  background: transparent url(${BannerStarWars}) 0% 0% no-repeat padding-box;
  background-size: cover;
  background-position-x: 30%;
  height: 400px;
  opacity: 1;
  display: flex;
  align-items: flex-end;
`;
