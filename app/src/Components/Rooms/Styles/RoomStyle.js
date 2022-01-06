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
