import React, { useContext, useState, useMemo } from "react";

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
import { AuthProvider } from "../../Context/AuthContext";
import { createNewMessage } from "../../Firebase/Service";
import useFirebase from "../../Hooks/useFirebase";
export default function ScreenChat() {
  const {
    selectedRoom,
    members,
    setIsVisiableModalInviteMember,
    isSelectedRoom,
  } = useContext(AppProvider);
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthProvider);

  const [form] = Form.useForm();

  const [message, setMessage] = useState("");
  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };
  const handleSendMessage = () => {
    createNewMessage("message", {
      text: message,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });
    form.resetFields(["message"]);
  };

  const conditionMessage = useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id],
  );
  const listMessage = useFirebase("message", conditionMessage);

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
              {listMessage.map((message) => (
                <MessageList
                  key={message.id}
                  message={message.text}
                  photoURL={message.photoURL}
                  displayName={message.displayName}
                  createdAt={message.createdAt}
                />
              ))}
            </Message>
            <FormStyle form={form}>
              <Form.Item name="message">
                <Input
                  bordered={false}
                  autoComplete="off"
                  placeholder="Nhập tin nhắn"
                  onChange={handleChangeMessage}
                  onPressEnter={handleSendMessage}
                />
              </Form.Item>
              <Tooltip title="Gửi hình ảnh">
                <Button icon={<FileImageOutlined />} />
              </Tooltip>
              <Tooltip title="Gửi sticker">
                <Button icon={<MehOutlined />} />
              </Tooltip>

              <Button icon={<AudioOutlined />} />
              <Button
                icon={<SendOutlined />}
                type="primary"
                onClick={handleSendMessage}
              >
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
