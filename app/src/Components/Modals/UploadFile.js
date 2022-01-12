import React, { useContext, useState } from "react";
import { Modal, Form, Upload, Button } from "antd";
import { AppProvider } from "../../Context/AppContext";
import { AuthProvider } from "../../Context/AuthContext";
import { UploadOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { storage } from "../../Firebase/Config";
import { createNewMessage } from "../../Firebase/Service";
const UploadStyled = styled(Upload)`
  &&& {
    .ant-upload.ant-upload-select {
      display: block;
    }
  }
`;
const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 5000);
};
export default function UploadFile() {
  const {
    isVisiableModalUploadFile,
    setIsVisiableModalUploadFile,
    selectedRoom,
  } = useContext(AppProvider);

  const [pathImage, setPathImage] = useState(null);
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthProvider);

  const normFile = (e) => {
    const uploadPicture = storage
      .ref(`images/${selectedRoom.name}/${e.file.originFileObj.name}`)
      .put(e.file.originFileObj);
    uploadPicture.on(
      "state_changed",
      (snap) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref(`images/${selectedRoom.name}`)
          .child(e.file.originFileObj.name)
          .getDownloadURL()
          .then((url) => {
            setPathImage(url);
          });
      },
    );
  };

  const handleOk = () => {
    createNewMessage("message", {
      image: pathImage,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });
    setIsVisiableModalUploadFile(false);
  };

  const handleCancel = () => {
    setIsVisiableModalUploadFile(false);
  };

  return (
    <Modal
      title="Files"
      visible={isVisiableModalUploadFile}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form>
        <Form.Item
          getValueFromEvent={normFile}
          valuePropName="file"
          name="upload"
        >
          <UploadStyled customRequest={dummyRequest}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </UploadStyled>
        </Form.Item>
      </Form>
    </Modal>
  );
}
