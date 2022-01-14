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
  padding: 10px 0 10px 20px;
  &:hover {
    cursor: pointer;
  }
`;
export const ContainerItem = styled.li`
  width: 100%;
  font-size: 16px;
`;
export const ContainerName = styled.span``;
