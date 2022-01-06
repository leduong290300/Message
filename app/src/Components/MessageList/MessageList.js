import React from "react";
import { Avatar, Typography } from "antd";
import { Container } from "./Styles/MessageListStyle";
export default function MessageList({
  message,
  displayName,
  createdAt,
  photoURL,
}) {
  return (
    <Container>
      <div>
        <Avatar size="small" src={photoURL}>
          A
        </Avatar>
        <Typography.Text className="author">{displayName}</Typography.Text>
        <Typography.Text className="time">{createdAt}</Typography.Text>
      </div>
      <div>
        <Typography.Text className="content">{message}</Typography.Text>
      </div>
    </Container>
  );
}
