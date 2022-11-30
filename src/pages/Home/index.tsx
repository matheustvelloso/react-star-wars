import React, { memo, useCallback, useEffect, useState } from 'react';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';
import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im';

import Banner from 'components/Banner';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Loader from 'components/Loader';
import VehicleCard from 'components/VehicleCard';

import useTitle from 'hooks/useTitle';
import useVehicles from 'hooks/useVehicles';

import { FormGroup, Pagination, ReloadButton } from './styles';

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [abled, setAbled] = useState(true);
  const setTitle = useTitle();

  const { vehicles, loading, error, totalPages, currentPage, fetchVehicles } =
    useVehicles();

  const handleSearch = useCallback(() => {
    fetchVehicles(1, searchText);
    setAbled(false);
  }, [fetchVehicles, searchText]);

  const handleClearSearch = useCallback(() => {
    fetchVehicles();
    setSearchText('');
  }, [fetchVehicles]);

  useEffect(() => {
    setTitle('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Banner>
        {!loading && (
          <Container>
            <FormGroup className="d-flex justify-content-between  py-2">
              <Form.Control
                style={{ minWidth: '100px' }}
                type="text my-3"
                placeholder="Digite o nome ou o modelo do veículo"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <div className="d-flex justify-content-center align-items-center text-center">
                <Button
                  style={{ maxWidth: '40px' }}
                  className="my-3"
                  variant="primary"
                  disabled={!searchText.length}
                  type="button"
                  onClick={handleSearch}
                >
                  <div className="d-flex align-items-center justify-content-center">
                    <span>
                      <AiOutlineSearch />
                    </span>
                  </div>
                </Button>
                {searchText?.length > 0 && (
                  <Button
                    style={{ maxWidth: '40px' }}
                    className="my-3"
                    disabled={abled}
                    variant="primary"
                    onClick={handleClearSearch}
                    type="submit"
                  >
                    <div className="d-flex align-items-center justify-content-center">
                      <span>
                        <AiOutlineClose />
                      </span>
                    </div>
                  </Button>
                )}
              </div>
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
              {vehicles?.length === 0 && (
                <div className="text-white d-flex flex-column align-items-center my-5 py-5">
                  <h2>Vehicle Not Found</h2>
                  <ReloadButton type="button" onClick={handleClearSearch}>
                    <div className="d-flex align-items-center">
                      <BsArrowLeft />
                      <span className="ms-1">Go Back</span>
                    </div>
                  </ReloadButton>
                </div>
              )}
              {Array.isArray(vehicles) &&
                vehicles.map((vehicle) => (
                  <Col className="d-flex" key={vehicle.name}>
                    <VehicleCard _vehicle={vehicle} />
                  </Col>
                ))}
            </Row>
          </Container>
          {totalPages > 1 && (
            <Pagination
              onPageChange={({ selected }) => {
                fetchVehicles(selected + 1);
              }}
              pageCount={totalPages}
              forcePage={currentPage - 1}
              nextLabel={<ImArrowRight2 />}
              previousLabel={<ImArrowLeft2 />}
            />
          )}
        </main>
      )}

      <Footer />
    </>
  );
};

export default memo(Home);
