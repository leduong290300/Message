import styled from "styled-components/macro";
import { Collapse, Typography } from "antd";
const { Panel } = Collapse;
export const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: #fff;
    }
    .ant-collapse-content-box {
      padding: 0 40px;
    }
    .add {
      color: #fff;
      padding: 0;
    }
  }
`;
export const Link = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;
export const Container = styled.div``;
export const ContainerList = styled.ul`
  list-style: none;
  display: block;
  margin-bottom: 0;
  height: 50px;
  width: 100%;
  padding-left: 0;
  color: #333;
  &:hover {
    cursor: pointer;
    background: #e5efff;
  }
`;
export const ContainerItem = styled.li`
  width: 100%;
  font-size: 16px;
  display: block;
  height: 100%;
  line-height: 50px;
  padding-left: 20px;
`;
export const ContainerName = styled.span``;
