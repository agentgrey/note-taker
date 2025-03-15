"use client";

import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import { ROLE } from "@/constants/role.constants";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";

const roles = [ROLE.ADMIN, ROLE.EMPLOYEE, ROLE.MANAGER];

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserCreationDialogProps {
  open: boolean;
  onClose: () => void;
  initialData?: User | null;
}

const UserCreationDialog: React.FC<UserCreationDialogProps> = ({
  open,
  onClose,
  initialData,
}) => {
  const { user, authConfig } = useAuth();
  const isEditing = Boolean(initialData);
  const isAdmin = user?.role === ROLE.ADMIN;
  const BASE_URL = process.env.NEXT_PUBLIC_URL;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      password: "",
      role: initialData?.role || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .when([], {
          is: () => !isEditing,
          then: (schema) => schema.required("Password is required"),
        }),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      if (!isAdmin) {
        setErrors({ role: "Only admins can perform this action." });
        return;
      }
      try {
        const API_BASE_URL = `${BASE_URL}/api/users`;
        let response;

        if (isEditing) {
          response = await axios.put(`${API_BASE_URL}/${initialData?.id}`, values, authConfig);
          Swal.fire({
            icon: "success",
            title: "User Updated",
            text: `User ${values.name} has been successfully updated!`,
            confirmButtonColor: "#4CAF50",
          });
        } else {
          response = await axios.post(API_BASE_URL, values, authConfig);
          Swal.fire({
            icon: "success",
            title: "User Created",
            text: `User ${values.name} has been successfully created!`,
            confirmButtonColor: "#4CAF50",
          });
        }
        onClose();
      } catch (error) {
        console.error("Error submitting user data:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      } finally {
        setSubmitting(false);
        onClose();
      }

    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEditing ? "Edit User" : "Create User"}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="dense"
            disabled={isEditing}
          />
          {!isEditing && (
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="dense"
            />
          )}
          <TextField
            fullWidth
            select
            label="Role"
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
            margin="dense"
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" disabled={!isAdmin}>
            {isEditing ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserCreationDialog;