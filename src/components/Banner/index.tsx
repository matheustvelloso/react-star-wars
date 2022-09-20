import { memo } from 'react';

import { BannerBackground } from './styles';

interface IBannerProps {
  children?: React.ReactNode;
}

const Banner: React.FC<IBannerProps> = ({ children }) => {
  return <BannerBackground>{children}</BannerBackground>;
};

export default memo(Banner);
