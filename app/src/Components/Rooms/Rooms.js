import React, { useContext } from "react";
import { Collapse, Button } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { PanelStyled, Link } from "./Styles/RoomStyle";
import { AppProvider } from "../../Context/AppContext";

export default function Rooms() {
  const { rooms, setIsVisiableModalCreateRoom } = useContext(AppProvider);
  const handleAddRoom = () => {
    setIsVisiableModalCreateRoom(true);
  };
  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyled header="Rooms List" key="1">
        {rooms.map((room) => (
          <Link key={room.id}>{room.name}</Link>
        ))}

        <Button
          className="add"
          type="text"
          icon={<PlusSquareOutlined />}
          onClick={handleAddRoom}
        >
          Thêm phòng{" "}
        </Button>
      </PanelStyled>
    </Collapse>
  );
}
