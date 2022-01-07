import { createContext, useContext, useMemo, useState } from "react";
import { AuthProvider } from "../Context/AuthContext";
import useFirebase from "../Hooks/useFirebase";
export const AppProvider = createContext();
export default function AppContext({ children }) {
  // TODO: Ẩn/hiên modal thêm phòng
  const [isVisiableModalCreateRoom, setIsVisiableModalCreateRoom] =
    useState(false);

  const {
    user: { uid },
  } = useContext(AuthProvider);

  const roomCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  const rooms = useFirebase("rooms", roomCondition);

  return (
    <AppProvider.Provider
      value={{ rooms, isVisiableModalCreateRoom, setIsVisiableModalCreateRoom }}
    >
      {children}
    </AppProvider.Provider>
  );
}
