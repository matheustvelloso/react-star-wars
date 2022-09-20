import { memo, useCallback } from 'react';

import {
  SpanManufacturer,
  SpanVehicleInfo,
  SpanVehicleName,
  SpanVehiclePrice,
  VehicleCardContainer,
} from './styles';

interface IVehicleContainerProps {
  manufacturer: string;
  name: string;
  length: string;
  maxAtmospheringSpeed: string;
  crew: string;
  passengers: string;
  cargoCapacity: string;
  credits: string;
  URL: string;
}

const VehicleContainer: React.FC<IVehicleContainerProps> = ({
  manufacturer,
  name,
  length,
  maxAtmospheringSpeed,
  crew,
  passengers,
  cargoCapacity,
  credits,
  URL,
}) => {
  const NormalizeNumber = useCallback(
    (num: number): string => new Intl.NumberFormat('pt-BR').format(num),
    [],
  );
  const id = URL.replaceAll(/\D/g, '');

  return (
    <VehicleCardContainer to={`/vehicles/${id}`} disabled={credits}>
      <div className="d-flex flex-column py-4">
        <SpanManufacturer>{manufacturer}</SpanManufacturer>
        <SpanVehicleName>{name}</SpanVehicleName>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <SpanVehicleInfo>Largura</SpanVehicleInfo>
        <SpanVehicleInfo>{length}</SpanVehicleInfo>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <SpanVehicleInfo>Velocidade</SpanVehicleInfo>
        <SpanVehicleInfo>
          {NormalizeNumber(Number(maxAtmospheringSpeed))}
        </SpanVehicleInfo>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <SpanVehicleInfo>Equipe</SpanVehicleInfo>
        <SpanVehicleInfo>{crew}</SpanVehicleInfo>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <SpanVehicleInfo>Passageiros</SpanVehicleInfo>
        <SpanVehicleInfo>{passengers}</SpanVehicleInfo>
      </div>
      <div className="d-flex justify-content-between mb-3">
        <SpanVehicleInfo>Capacidade de carga</SpanVehicleInfo>
        <SpanVehicleInfo>
          {cargoCapacity === 'none'
            ? 'Nenhuma'
            : NormalizeNumber(Number(cargoCapacity))}
        </SpanVehicleInfo>
      </div>
      <div className="d-flex justify-content-between mb-3 pb-3">
        <SpanVehiclePrice>
          {credits === 'unknown'
            ? 'Indisponível'
            : `¢ ${NormalizeNumber(Number(credits))}`}
        </SpanVehiclePrice>
      </div>
    </VehicleCardContainer>
  );
};

export default memo(VehicleContainer);
