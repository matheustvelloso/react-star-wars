import InputMask from 'react-input-mask';
import styled from 'styled-components';

interface IButtonCreditCard {
  active: string;
}
interface IButtonTicket {
  active: string;
}

export const InputsContainer = styled.div`
  color: #fff;
  background: #000000 0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  padding: 15px;
  height: 100%;
  margin: 10px 0;
`;
export const SpanFormTitle = styled.span`
  text-align: left;
  font: normal normal sans-serif Lato;
  font-weight: 500;
  font-size: 22px;
  letter-spacing: 0px;
  color: #f4e426;
  opacity: 1;
`;

export const LabelForm = styled.label`
  text-align: left;
  font: normal normal 16px/19px sans-serif Lato;
  font-weight: 500;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  padding: 8px 0;
`;

export const FormInputs = styled.input`
  width: 100%;
  height: 40px;
  background: #333333 0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  border: none;
  color: #fff;
  margin-top: 8px;
  margin-bottom: 8px;

  &:focus {
    box-shadow: 0 4px 16px #f4e426;
    outline: none;
  }
`;
export const FormInputsMask = styled(InputMask)`
  width: 100%;
  height: 40px;
  background: #333333 0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  border: none;
  color: #fff;
  margin-top: 8px;
  margin-bottom: 8px;

  &:focus {
    box-shadow: 0 4px 16px #f4e426;
    outline: none;
  }
`;
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
  margin-bottom: 20px;
  margin-top: 10px;
`;
export const SpanVehiclePrice = styled.span`
  text-align: left;
  font: normal normal bold 22px/27px sans-serif;
  letter-spacing: 0px;
  color: #f4e426;
  opacity: 1;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const ButtonCreditCard = styled.button<IButtonCreditCard>`
  white-space: nowrap;
  width: 100%;
  height: 40px;
  background: ${({ active }) =>
      active === 'creditCard' ? '#F4E426' : '#cccccc'}
    0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  border: none;
  color: #000;
  margin-right: 7px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14.5px;
  font-weight: 500;
`;

export const ButtonTicket = styled.button<IButtonTicket>`
  white-space: nowrap;
  width: 100%;
  height: 40px;
  background: ${({ active }) => (active === 'ticket' ? '#F4E426' : '#cccccc')}
    0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  border: none;
  color: #000;
  margin-left: 7px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14.5px;
  font-weight: 500;
`;

export const ButtonPaymentConfirmation = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  background: #f4e426 0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  color: #000;
  border: none;
`;

export const SpanTicketGeneration = styled.span`
  text-align: left;
  font: normal normal bold 22px/27px sans-serif;
  color: #f4e426;
  opacity: 1;
  margin-bottom: 20px;
  margin-top: 10px;
`;

export const SpanError = styled.div`
  color: #f00;
`;
