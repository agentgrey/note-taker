'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Typography } from "@mui/material";
import UserList from "../../components/Users/UserList";
import MainLayout from "@/layouts/admin";
import Breadcrumbs from "@/core/Breadcrum";
import { useAuth } from "@/context/AuthContext";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const dummyUsers = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
    { id: "2", name: "Bob Smith", email: "bob@example.com", role: "User" },
    { id: "3", name: "Charlie Brown", email: "charlie@example.com", role: "User" },
]

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {authConfig} = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_URL;
        if (!API_BASE_URL) {
          throw new Error("API base URL is missing from environment variables.");
        }

        const response = await axios.get(`${API_BASE_URL}/users`, authConfig);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setUsers(response.data);
        } else {
          console.warn("API returned an empty response, using dummy users.");
          setUsers(dummyUsers);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Function to delete a user locally
  const deleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };
  console.log("users", users);
  const links = [{ id: 1, page: "Users Dashboard", link: "/users" }];

  return (
    <MainLayout title="USERS">
      <>
        {/* Breadcrumbs */}
        <div className="px-2 md:px-0 ml-14 mt-10 mb-10">
          <Breadcrumbs links={links} />
        </div>
        
        <div className="w-[95%] mx-auto my-4 -mt-5 bg-white">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <CircularProgress />
            </div>
          ) : error ? (
            <Typography color="error" align="center">{error}</Typography>
          ) : (
            <UserList users={users} onDelete={deleteUser} />
          )}
        </div>
      </>
    </MainLayout>
  );
};

export default UsersPage;