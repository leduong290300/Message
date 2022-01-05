import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as ROUTER from "./Routes/index";
import Login from "./Pages/Login/Login";
import WindowChat from "./Pages/WindowChat/WindowChat";
import AuthProvider from "./Context/AuthContext";
export default function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path={ROUTER.LOGIN}>
              <Login />
            </Route>
            <Route path={ROUTER.WINDOWCHAT}>
              <WindowChat />
            </Route>
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}
