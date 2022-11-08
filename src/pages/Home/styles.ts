import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

export const FormGroup = styled.div`
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
export const ReloadButton = styled.button`
  transition: 400ms;
  display: flex;
  border: none;
  background-color: transparent;
  font-size: 50px;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #f4e426;
  }
`;

export const Pagination = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  padding: 30px 0;

  li {
    list-style: none;
    font: normal normal bold 22px/27px Lato;
    letter-spacing: 0px;
    color: #000000;
    margin: 0 5px;
    background: #f4e426 0% 0% no-repeat padding-box;
    border-radius: 5px;
    opacity: 1;
    width: 40px;
    height: 40px;
  }
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    text-decoration: none;
    color: #000;
  }

  .selected {
    background-color: #fff;
  }
  .disabled {
    display: none;
  }
`;
