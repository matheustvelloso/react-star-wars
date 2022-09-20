import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IVehicleCardContainer {
  disabled: string;
}

export const SpanManufacturer = styled.span`
  text-align: left;
  font: normal normal normal 14px/16px sans-serif;
  letter-spacing: 0px;
  color: #707070;
  opacity: 1;
`;

export const SpanVehicleName = styled.span`
  text-align: left;
  font: normal normal bold 22px/27px sans-serif;
  letter-spacing: 0px;
  color: #f4e426;
  opacity: 1;
`;

export const SpanVehicleInfo = styled.span`
  text-align: left;
  font: normal normal normal 14px/16px sans-serif Lato;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
`;

export const VehicleCardContainer = styled(Link)<IVehicleCardContainer>`
  color: #fff;
  padding: 0 1.5rem;
  background: #000000 0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  margin: 36px 0;
  width: 100%;
  text-decoration: none;
  pointer-events: ${({ disabled }) => disabled === 'unknown' && 'none'};
`;

export const SpanVehiclePrice = styled.span`
  text-align: left;
  font: normal normal bold 22px/27px sans-serif;
  letter-spacing: 0px;
  color: #f4e426;
  opacity: 1;
`;
