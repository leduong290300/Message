import React, { useContext, useState, useMemo } from "react";
import { Modal, Form, Select, Spin, Avatar } from "antd";
import { AppProvider } from "../../Context/AppContext";
import { debounce } from "lodash";
import { database } from "../../Firebase/Config";
// TODO Xử lí việc search
function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const debounceFetch = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);
      fetchOptions(value, props.currentMember).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions]);
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetch}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size="small" src={opt.photoURL}>
            {opt.photoURL ? "" : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {`${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}
// MODULE Thực hiên việc tìm kiếm
async function fetchUserList({ search, currentMember }) {
  return database
    .collection("users")
    .where("keywords", "array-contains", search)
    .orderBy("displayName")
    .limit(20)
    .get()
    .then((snapshot) => {
      return snapshot.docs
        .map((doc) => ({
          lable: doc.data().displayName,
          value: doc.data().uid,
          photoURL: doc.data().photoURL,
        }))
        .filter((opt) => !currentMember.includes(opt.value));
    });
}

export default function InviteMembers() {
  const {
    isVisiableModalInviteMember,
    setIsVisiableModalInviteMember,
    isSelectedRoom,
    selectedRoom,
  } = useContext(AppProvider);
  const [form] = Form.useForm();
  const handleOk = () => {
    form.resetFields();
    const roomRef = database.collection("users").doc(isSelectedRoom);
    roomRef.update({
      members: [...selectedRoom.members, ...value.map((val) => val.value)],
    });
  };
  const handleCancel = () => {
    form.resetFields();
    setIsVisiableModalInviteMember(false);
  };
  const [value, setValue] = useState([]);
  return (
    <Modal
      title="Mời thêm thành viên"
      visible={isVisiableModalInviteMember}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <DebounceSelect
          mode="multiple"
          label="Tên các thành viên"
          value={value}
          fetchOptions={fetchUserList}
          placeholder="Nhập tên thành vien"
          onChange={(newValue) => setValue(newValue)}
          style={{ width: "100%" }}
          currentMember={selectedRoom.members}
        />
      </Form>
    </Modal>
  );
}
