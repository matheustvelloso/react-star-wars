/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, useCallback, useEffect, useState } from 'react';

import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ImArrowLeft2 } from 'react-icons/im';
import { Link, useParams } from 'react-router-dom';

import Banner from 'components/Banner';
import Footer from 'components/Footer';
import FormSpaceMotors from 'components/FormSpaceMotors';
import Header from 'components/Header';
import Loader from 'components/Loader';

import useTitle from 'hooks/useTitle';

import StarWarsApi from 'services/StarWarsClient';

import { VehicleType } from 'types/VehicleType';

import { CheckoutSpan } from './style';

const Checkout: React.FC = () => {
  const { t, i18n } = useTranslation();
  const setTitle = useTitle();
  const [vehicle, setVehicle] = useState<VehicleType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  const fetchStarWarsApi = useCallback(async (_id: string) => {
    try {
      setLoading(true);
      const { data } = await StarWarsApi.get(`/vehicles/${_id}`);
      setVehicle(data);
    } catch {
      setError('Vehicle not found');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setTitle(t('Checkout'));
    fetchStarWarsApi(String(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.resolvedLanguage]);

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
      {!loading && !error && (
        <main>
          <Container>
            <FormSpaceMotors id={id} _vehicle={vehicle} />
          </Container>
        </main>
      )}

      <Footer />
    </>
  );
};

export default memo(Checkout);
