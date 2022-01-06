import React from "react";

import {
  UserAddOutlined,
  SendOutlined,
  AudioOutlined,
  MehOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { Button, Avatar, Tooltip, Input, Form } from "antd";
import {
  Header,
  Content,
  Inner,
  Message,
  Container,
  FormStyle,
} from "./Styles/ScreenChatStyle";

import MessageList from "../MessageList/MessageList";
export default function ScreenChat() {
  return (
    <Container>
      <Header>
        <div className="header__info">
          <p className="header__title">Room 1</p>
          <span className="header__description">Day la room 1</span>
        </div>
        <Inner>
          <Button icon={<UserAddOutlined />} type="text">
            Moi
          </Button>
          <Avatar.Group size="small" maxCount={2}>
            <Tooltip title="A">
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title="A">
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title="A">
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title="A">
              <Avatar>A</Avatar>
            </Tooltip>
          </Avatar.Group>
        </Inner>
      </Header>
      <Content>
        <Message>
          <MessageList
            message="text"
            photoURL={null}
            displayName="duong"
            createdAt={121231234}
          />
          <MessageList
            message="text"
            photoURL={null}
            displayName="duong"
            createdAt={121231234}
          />
          <MessageList
            message="text"
            photoURL={null}
            displayName="duong"
            createdAt={121231234}
          />
          <MessageList
            message="text"
            photoURL={null}
            displayName="duong"
            createdAt={121231234}
          />
        </Message>
        <FormStyle>
          <Form.Item>
            <Input bordered={false} autoComplete="off" />
          </Form.Item>
          <Tooltip title="Gửi hình ảnh">
            <Button icon={<FileImageOutlined />} />
          </Tooltip>
          <Tooltip title="Gửi sticker">
            <Button icon={<MehOutlined />} />
          </Tooltip>

          <Button icon={<AudioOutlined />} />
          <Button icon={<SendOutlined />} type="primary">
            Gui
          </Button>
        </FormStyle>
      </Content>
    </Container>
  );
}
