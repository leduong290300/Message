import styled from "styled-components/macro";
import { Button } from "antd";
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e1e4ea;

  .username {
    color: white;
    margin-left: 5px;
  }
`;
export const Options = styled.div``;
export const ButtonCover = styled(Button)`
  background: transparent;
  outline: none;
  border: none;
  color: #fff;
  margin: 0 5px;
  &:hover,
  &:focus,
  &:active {
    background: transparent;
  }
  ,
  &:hover {
    color: #fff;
  }
`;
