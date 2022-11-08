/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, useEffect } from 'react';

import { Container } from 'react-bootstrap';
import { ImArrowLeft2 } from 'react-icons/im';
import { Link, useParams } from 'react-router-dom';

import Banner from 'components/Banner';
import Footer from 'components/Footer';
import FormSpaceMotors from 'components/FormSpaceMotors';
import Header from 'components/Header';
import Loader from 'components/Loader';

import useTitle from 'hooks/useTitle';
import useVehicles from 'hooks/useVehicles';

import { CheckoutSpan } from './style';

const Checkout: React.FC = () => {
  const setTitle = useTitle();
  const { fetchVehicle, vehicle, loading, error } = useVehicles();

  const { id } = useParams();

  useEffect(() => {
    setTitle('Checkout');
    fetchVehicle(String(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Banner />
      <Container>
        <Link
          to="/"
          style={{ textDecoration: 'none', display: 'inline-block' }}
        >
          <CheckoutSpan>
            <ImArrowLeft2 className="me-4" />
            Checkout
          </CheckoutSpan>
        </Link>
      </Container>
      {loading && <Loader loading="Carregando Veículo..." />}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && vehicle && (
        <main>
          <Container>
            <FormSpaceMotors id={id} vehicle={vehicle} />
          </Container>
        </main>
      )}

      <Footer />
    </>
  );
};

export default memo(Checkout);
