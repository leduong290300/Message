import React from "react";
import { Avatar, Button, Typography } from "antd";
import styled from "styled-components/macro";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);
  .username {
    color: white;
    margin-left: 5px;
  }
`;
export default function UserInfo() {
  return (
    <Container>
      <div>
        <Avatar>A</Avatar>
        <Typography.Text className="username">User</Typography.Text>
      </div>
      <Button ghost>Log out</Button>
    </Container>
  );
}
