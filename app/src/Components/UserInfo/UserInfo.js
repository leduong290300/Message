import React, { useContext } from "react";
import { Avatar, Button, Typography } from "antd";
import { Container } from "./Styles/UserInfoStyle";
import { auth } from "../../Firebase/Config";
import { AuthProvider } from "../../Context/AuthContext";
export default function UserInfo() {
  const {
    user: { displayName, photoURL },
  } = useContext(AuthProvider);

  return (
    <Container>
      <div>
        <Avatar src={photoURL}>
          {photoURL ? "" : displayName && displayName.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="username">{displayName}</Typography.Text>
      </div>
      <Button ghost onClick={() => auth.signOut()}>
        Log out
      </Button>
    </Container>
  );
}
