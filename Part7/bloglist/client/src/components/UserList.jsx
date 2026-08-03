import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";
import userServices from "../services/users";
import { useEffect, useState } from "react";
import { useMatch, Link } from "react-router-dom";
import { useUsersActions, useUsers } from "../store";

const UserList = ({ fetchError }) => {
  const users = useUsers();

  const match = useMatch("/users/:id");
  const user = match ? users.find((u) => u.id === match.params.id) : null;

  if (users.length === 0) {
    return <div>Loading users...</div>;
  }

  if (fetchError) {
    throw new Error("Error fetching users");
  }

  return (
    <>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/user/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserList;
