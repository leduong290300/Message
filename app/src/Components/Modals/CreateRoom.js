import React, { useContext } from "react";
import { Modal, Form, Input } from "antd";
import { AppProvider } from "../../Context/AppContext";
import { createNewRoom } from "../../Firebase/Service";
import { AuthProvider } from "../../Context/AuthContext";
export default function CreateRoom() {
  const { isVisiableModalCreateRoom, setIsVisiableModalCreateRoom } =
    useContext(AppProvider);
  const {
    user: { uid },
  } = useContext(AuthProvider);
  const [form] = Form.useForm();
  const handleOk = () => {
    createNewRoom("rooms", { ...form.getFieldValue(), members: [uid] });
    form.resetFields();
    setIsVisiableModalCreateRoom(false);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsVisiableModalCreateRoom(false);
  };
  return (
    <Modal
      title="Tạo phòng"
      visible={isVisiableModalCreateRoom}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Tên phòng" name="name">
          <Input placeholder="Nhâp tên phòng" />
        </Form.Item>
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea placeholder="Mô tả" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
