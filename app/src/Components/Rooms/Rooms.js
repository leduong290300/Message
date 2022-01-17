import React, { useContext } from "react";

import {
  Container,
  ContainerList,
  ContainerItem,
  ContainerName,
} from "./Styles/RoomStyle";
import { AppProvider } from "../../Context/AppContext";

export default function Rooms() {
  const { rooms, setIsSelectedRoom, isSelectedRoom } = useContext(AppProvider);

  return (
    <Container>
      <ContainerList>
        {rooms.map((room) => (
          <ContainerItem
            key={room.id}
            onClick={() => setIsSelectedRoom(room.id)}
            style={{
              fontWeight: room.id === isSelectedRoom ? "bold" : "normal",
            }}
          >
            <ContainerName>{room.name}</ContainerName>
          </ContainerItem>
        ))}
      </ContainerList>
    </Container>
  );
}
