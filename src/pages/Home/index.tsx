import React, { memo } from 'react';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import Banner from 'components/Banner';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Loader from 'components/Loader';
import Paginate from 'components/Paginate';
import VehicleCard from 'components/VehicleCard';

import useVehicles from 'hooks/useVehicles';

import { FormGroup } from './styles';

const Home: React.FC = () => {
  const {
    vehicles,
    loading,
    error,
    totalPages,
    currentPage,
    fetchStarWarsApi,
    setValue,
    value,
    handleSubmit,
  } = useVehicles();

  return (
    <>
      <Header />
      <Banner>
        {!loading && (
          <Container>
            <FormGroup onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                placeholder="Digite o nome ou o modelo do veículo"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button variant="primary" disabled={!value?.length} type="submit">
                Buscar
              </Button>
            </FormGroup>
          </Container>
        )}
      </Banner>
      {loading && <Loader loading="Carregando Veículos..." />}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && (
        <main>
          <Container>
            <Row className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-center mt-5 pt-5">
              {Array.isArray(vehicles) &&
                vehicles.map((vehicle) => (
                  <Col className="d-flex" key={vehicle.name}>
                    <VehicleCard _vehicle={vehicle} />
                  </Col>
                ))}
            </Row>
          </Container>
          <Paginate
            onPageChange={({ selected }) => {
              fetchStarWarsApi({ page: selected + 1 });
            }}
            pageCount={totalPages}
            forcePage={currentPage - 1}
          />
        </main>
      )}

      <Footer />
    </>
  );
};

export default memo(Home);
