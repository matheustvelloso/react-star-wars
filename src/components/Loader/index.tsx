import { memo } from 'react';

import { Container } from 'react-bootstrap';

import Loading from 'assets/r2d2-loading.gif';

import { LoaderContainer, LoadingSpan } from './styles';

interface ILoaderProps {
  loading: string;
}

const Loader: React.FC<ILoaderProps> = ({ loading }) => {
  return (
    <Container>
      <LoaderContainer>
        <img src={Loading} alt="Loading" />
        <LoadingSpan>{loading}</LoadingSpan>
      </LoaderContainer>
    </Container>
  );
};

export default memo(Loader);
