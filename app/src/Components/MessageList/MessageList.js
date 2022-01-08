import React from "react";
import { Avatar, Typography } from "antd";
import { Container } from "./Styles/MessageListStyle";
import { formatRelative } from "date-fns/esm";
function formatDate(seconds) {
  let format = "";
  if (seconds) {
    format = formatRelative(new Date(seconds * 1000), new Date());
    format = format.charAt(0).toUpperCase() + format.slice(1);
  }
  return format;
}
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
          {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="author">{displayName}</Typography.Text>
        <Typography.Text className="time">
          {formatDate(createdAt?.seconds)}
        </Typography.Text>
      </div>
      <div>
        <Typography.Text className="content">{message}</Typography.Text>
      </div>
    </Container>
  );
}
