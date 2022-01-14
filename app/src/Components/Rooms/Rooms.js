import React, { useContext } from "react";
import { Collapse, List } from "antd";

import {
  PanelStyled,
  Link,
  Meta,
  Container,
  ContainerList,
  ContainerItem,
  ContainerName,
} from "./Styles/RoomStyle";
import { AppProvider } from "../../Context/AppContext";

export default function Rooms() {
  const { rooms, setIsSelectedRoom } = useContext(AppProvider);

  return (
    // <Collapse ghost defaultActiveKey={["1"]}>
    //   <PanelStyled header="Rooms List" key="1">
    //     {rooms.map((room) => (
    //       <Link key={room.id} onClick={() => setIsSelectedRoom(room.id)}>
    //         {room.name}
    //       </Link>
    //     ))}
    //   </PanelStyled>
    // </Collapse>
    <Container>
      <ContainerList>
        {rooms.map((room) => (
          <ContainerItem key={room.id}>
            <ContainerName>{room.name}</ContainerName>
          </ContainerItem>
        ))}
      </ContainerList>
    </Container>
  );
}
