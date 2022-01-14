import React, { useContext } from "react";
import { Avatar, Typography, Tooltip } from "antd";
import { Container, Options, ButtonCover } from "./Styles/UserInfoStyle";
import { auth } from "../../Firebase/Config";
import { AuthProvider } from "../../Context/AuthContext";
import { TeamOutlined, LogoutOutlined } from "@ant-design/icons";
import { AppProvider } from "../../Context/AppContext";
export default function UserInfo() {
  const {
    user: { displayName, photoURL },
  } = useContext(AuthProvider);

  const { setIsVisiableModalCreateRoom } = useContext(AppProvider);

  const handleAddRoom = () => {
    setIsVisiableModalCreateRoom(true);
  };
  return (
    <Container>
      <div>
        <Avatar src={photoURL}>
          {photoURL ? "" : displayName && displayName.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="username">{displayName}</Typography.Text>
      </div>
      <Options>
        <Tooltip title="Thêm nhóm chat">
          <ButtonCover icon={<TeamOutlined />} onClick={handleAddRoom} />
        </Tooltip>
        <Tooltip title="Đăng xuất">
          <ButtonCover
            icon={<LogoutOutlined />}
            onClick={() => auth.signOut()}
          />
        </Tooltip>
      </Options>
    </Container>
  );
}
