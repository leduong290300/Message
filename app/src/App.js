import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as ROUTER from "./Routes/index";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import WindowChat from "./Pages/WindowChat/WindowChat";
import AuthProvider from "./Context/AuthContext";
import AppProvider from "./Context/AppContext";
import CreateRoom from "./Components/Modals/CreateRoom";
import InviteMembers from "./Components/Modals/InviteMembers";
import UploadFile from "./Components/Modals/UploadFile";
export default function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <AppProvider>
            <Switch>
              <Route path={ROUTER.LOGIN}>
                <Login />
              </Route>
              <Route path={ROUTER.REGISTER}>
                <Register />
              </Route>
              <Route path={ROUTER.WINDOWCHAT}>
                <WindowChat />
              </Route>
            </Switch>
            <CreateRoom />
            <InviteMembers />
            <UploadFile />
          </AppProvider>
        </AuthProvider>
      </Router>
    </>
  );
}
