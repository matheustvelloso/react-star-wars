import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

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
`;
