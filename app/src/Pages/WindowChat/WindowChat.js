import React from "react";
import { Row, Col } from "antd";
import SideBar from "../../Components/SideBar/SideBar";
import ScreenChat from "../../Components/ScreenChat/ScreenChat";
import "./WindowChat.css";
export default function WindowChat() {
  return (
    <>
      <Row>
        <Col span={6}>
          <SideBar />
        </Col>
        <Col span={18}>
          <ScreenChat />
        </Col>
      </Row>
    </>
  );
}
