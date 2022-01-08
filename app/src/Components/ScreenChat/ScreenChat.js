import React, { useContext } from "react";

import {
  UserAddOutlined,
  SendOutlined,
  AudioOutlined,
  MehOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { Button, Avatar, Tooltip, Input, Form, Alert } from "antd";
import {
  Header,
  Content,
  Inner,
  Message,
  Container,
  FormStyle,
} from "./Styles/ScreenChatStyle";

import MessageList from "../MessageList/MessageList";
import { AppProvider } from "../../Context/AppContext";
export default function ScreenChat() {
  const {
    selectedRoom,
    members,
    setIsVisiableModalInviteMember,
    isSelectedRoom,
  } = useContext(AppProvider);

  return (
    <Container>
      {isSelectedRoom ? (
        <>
          <Header>
            <div className="header__info">
              <p className="header__title">{selectedRoom.name}</p>
              <span className="header__description">
                {selectedRoom.description}
              </span>
            </div>
            <Inner>
              <Button
                icon={<UserAddOutlined />}
                type="text"
                onClick={() => setIsVisiableModalInviteMember(true)}
              >
                Moi
              </Button>
              <Avatar.Group size="small" maxCount={2}>
                {members.map((member) => (
                  <Tooltip title={member.displayName} key={member.id}>
                    <Avatar src={member.photoURL}>
                      {member.photoURL
                        ? ""
                        : member.displayName?.charAt(0).loUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
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
        </>
      ) : (
        <Alert
          message="Hãy chọn phòng"
          type="info"
          showIcon
          style={{ margin: 5 }}
          closable
        />
      )}
    </Container>
  );
}
