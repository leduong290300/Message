import { createContext, useContext, useMemo, useState } from "react";
import { AuthProvider } from "../Context/AuthContext";
import useFirebase from "../Hooks/useFirebase";
export const AppProvider = createContext();
export default function AppContext({ children }) {
  // TODO: Ẩn/hiên modal thêm phòng
  const [isVisiableModalCreateRoom, setIsVisiableModalCreateRoom] =
    useState(false);

  // TODO Ẩn/hiện modal thêm thành viên
  const [isVisiableModalInviteMember, setIsVisiableModalInviteMember] =
    useState(false);

  // TODO: Chọn phòng chat
  const [isSelectedRoom, setIsSelectedRoom] = useState("");
  const {
    user: { uid },
  } = useContext(AuthProvider);

  // TODO Load ra những phòng chat có uid là uid của người dùng hiện tai
  const roomCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  const rooms = useFirebase("rooms", roomCondition);

  // TODO Load ra những uid người dùng là thành viên trong nhóm chat
  const selectedRoom = useMemo(
    () => rooms.find((room) => room.id === isSelectedRoom) || {},
    [rooms, isSelectedRoom],
  );

  const userCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);

  const members = useFirebase("users", userCondition);

  return (
    <AppProvider.Provider
      value={{
        rooms,
        selectedRoom,
        members,
        isVisiableModalCreateRoom,
        setIsVisiableModalCreateRoom,
        isSelectedRoom,
        setIsSelectedRoom,
        isVisiableModalInviteMember,
        setIsVisiableModalInviteMember,
      }}
    >
      {children}
    </AppProvider.Provider>
  );
}
