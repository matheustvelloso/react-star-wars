import { memo } from 'react';

import { VehicleType } from 'types/VehicleType';

import VehicleContainer from './VehicleContainer';

interface IVehicleCardProps {
  _vehicle: VehicleType;
}

const VehicleCard: React.FC<IVehicleCardProps> = ({ _vehicle }) => {
  return (
    <VehicleContainer
      manufacturer={_vehicle.manufacturer}
      name={_vehicle.name}
      length={_vehicle.length}
      maxAtmospheringSpeed={_vehicle.max_atmosphering_speed}
      crew={_vehicle.crew}
      passengers={_vehicle.passengers}
      cargoCapacity={_vehicle.cargo_capacity}
      credits={_vehicle.cost_in_credits}
      URL={_vehicle.url}
    />
  );
};

export default memo(VehicleCard);
