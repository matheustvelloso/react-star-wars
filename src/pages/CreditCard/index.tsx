/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { memo, useCallback, useEffect, useState } from 'react';

import { Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ImArrowLeft2 } from 'react-icons/im';
import { Link, useParams } from 'react-router-dom';

import Banner from 'components/Banner';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Loader from 'components/Loader';

import useTitle from 'hooks/useTitle';

import StarWarsApi from 'services/StarWarsClient';

import { VehicleType } from 'types/VehicleType';

import {
  CheckoutSpan,
  ContainerCreditCardConfirmation,
  SpanManufacturer,
  SpanPaymentConfirmation,
  SpanSuccessfulPayment,
  SpanVehicleName,
} from './styles';

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
          to={`/vehicles/${id}`}
          style={{ textDecoration: 'none', display: 'inline-block' }}
        >
          <CheckoutSpan>
            <ImArrowLeft2 className="me-4" />
            Confirmação
          </CheckoutSpan>
        </Link>
      </Container>
      {loading && <Loader loading="Carregando Veículo..." />}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && (
        <main>
          <Container className="d-flex justify-content-center">
            <ContainerCreditCardConfirmation>
              <div className="d-flex flex-column">
                <SpanManufacturer>{vehicle?.manufacturer}</SpanManufacturer>
                <SpanVehicleName>{vehicle?.name}</SpanVehicleName>
              </div>
              <div className="d-flex flex-column align-items-center">
                <SpanSuccessfulPayment>
                  Compra realizada com sucesso!
                </SpanSuccessfulPayment>
                <SpanPaymentConfirmation>
                  Confirmamos o seu pedido. Em breve você receberá um
                </SpanPaymentConfirmation>
                <SpanPaymentConfirmation>
                  e-mail com o status do processo de entrega
                </SpanPaymentConfirmation>
              </div>
            </ContainerCreditCardConfirmation>
          </Container>
        </main>
      )}

      <Footer />
    </>
  );
};

export default memo(Checkout);
