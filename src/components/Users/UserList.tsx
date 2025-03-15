"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { Add, Edit, Receipt } from "@mui/icons-material";
import UserCreationDialog from "./UserCreationDialog";
import axios from "axios";
import Swal from "sweetalert2";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type UserListProps = {
  users: User[];
  onDelete: (id: string) => void;
};

const UserList = ({ users, onDelete }: UserListProps) => {
  console.log("users ", users);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleOpenEditDialog = (user: User) => {
    setEditingUser(user);
    setOpen(true);
  };

  async function handleCreateUser(values: { name: string; email: string; password?: string; role: string; id?: string }): Promise<void> {
    try {
      if (values.id) {
        await axios.put(`/api/users/${values.id}`, values);
        Swal.fire({
          icon: "success",
          title: "User Updated",
          text: `User ${values.name} has been successfully updated!`,
          confirmButtonColor: "#4CAF50",
        });
      } else {
        await axios.post("/api/users", values);
        Swal.fire({
          icon: "success",
          title: "User Created",
          text: `User ${values.name} has been successfully created!`,
          confirmButtonColor: "#4CAF50",
        });
      }
      setOpen(false);
      setEditingUser(null);
    } catch (error) {
      console.error("Error creating/updating user:", error);
      Swal.fire({
        icon: "error",
        title: "Operation Failed",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  }

  return (
    <>
      <UserCreationDialog 
        open={open}
        onClose={() => setOpen(false)}
        initialData={editingUser}
      />
      <section className="mx-10 p-2">
        <div className="mx-2 my-5 flex justify-between items-center mt-5">
          <div className="flex items-center space-x-2 text-lg font-semibold">
            <Receipt />
            <span>All Team Members</span>
          </div>

          <Button
            onClick={() => {
              setEditingUser(null);
              setOpen(true);
            }}
            variant="contained"
            className="!bg-theme"
            startIcon={<Add />}
          >
            CREATE
          </Button>
        </div>

        <TableContainer component={Paper} sx={{ borderRadius: "8px" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" size="small" startIcon={<Edit />} onClick={() => handleOpenEditDialog(user)}>
                      Edit
                    </Button>
                    <Button variant="contained" color="secondary" size="small" onClick={() => onDelete(user.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
    </>
  );
};

export default UserList;