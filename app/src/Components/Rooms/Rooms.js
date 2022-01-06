import React from "react";
import { Collapse, Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { PanelStyled, Link } from "./Styles/RoomStyle";
export default function Rooms() {
  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyled header="Rooms List" key="1">
        <Link>A</Link>
        <Link>A</Link>
        <Link>A</Link>
        <Button className="add" type="text" icon={<PlusSquareOutlined />}>
          Thêm phòng{" "}
        </Button>
      </PanelStyled>
    </Collapse>
  );
}
