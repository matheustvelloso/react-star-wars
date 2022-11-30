import styled from 'styled-components';

export const FooterContainer = styled.div`
  background: #000000 0% 0% no-repeat padding-box;
  opacity: 1;
  height: 152px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 30px;
  padding: 0 30px;
`;

export const SpanDesignBy = styled.span`
  text-align: center;
  font: normal normal bold 14px/17px Lato;
  letter-spacing: 0px;
  color: #666666;
  margin-right: 5px;
`;

export const LinkDesigner = styled.a`
  text-align: center;
  font: normal normal bold 14px/17px Lato;
  letter-spacing: 0px;
  color: #ffffff;
  margin-left: 5px;
  text-decoration: none;

  &:hover {
    color: #f4e426;
  }
`;
