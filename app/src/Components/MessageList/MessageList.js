import React from "react";
import { Avatar, Typography, Space, Image } from "antd";
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
  displayName,
  createdAt,
  photoURL,
  messageText,
  messageImage,
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
        <Typography.Text className="content">{messageText}</Typography.Text>
        <Space size={12}>
          <Image
            width={200}
            src={messageImage}
            placeholder={
              <Image preview={false} src={messageImage} width={200} />
            }
          />
        </Space>
      </div>
    </Container>
  );
}
