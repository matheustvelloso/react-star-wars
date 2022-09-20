import { Form } from 'react-bootstrap';
import styled from 'styled-components';

export const FormGroup = styled(Form)`
  display: flex;
  padding: 0 17px;
  max-width: 1340px;
  height: 114px;
  background: #000000 0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  align-items: center;
  margin-bottom: -70px;

  .form-control {
    background: #ffffff 0% 0% no-repeat padding-box;
    border-radius: 5px;
    opacity: 1;
    margin: 0 10px;
  }

  .btn {
    width: 300px;
    height: 40px;
    background: #f4e426 0% 0% no-repeat padding-box;
    border-radius: 5px;
    border: none;
    opacity: 1;
    text-align: center;
    font: normal normal bold 22px/27px Lato;
    letter-spacing: 0px;
    color: #333333;
    margin: 0 10px;
  }
`;
