import React from "react";
import { Row, Col } from "antd";
import Rooms from "../Rooms/Rooms";
import UserInfo from "../UserInfo/UserInfo";
import styled from "styled-components/macro";
const Container = styled.div`
  border-right: 1px solid #e1e4ea;
  color: #fff;
  height: 100vh;
`;
export default function SideBar() {
  return (
    <Container>
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <Rooms />
        </Col>
      </Row>
    </Container>
  );
}
