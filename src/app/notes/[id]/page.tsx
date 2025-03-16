"use client";

import { useState, useEffect, useContext } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import MainLayout from "@/layouts/admin";
import { Container, Typography, CircularProgress } from "@mui/material";
import { useAuth } from "@/context/AuthContext";

const NoteDetails = () => {
  const { id } = useParams(); // ✅ Get note ID from URL
  console.log("id ", id);
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const {authConfig} = useAuth();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        console.log(id);
        const response = await axios.get(`/api/notes/getSingle/?id=${id}`, authConfig);
        console.log(response);
        setNote(response.data.note);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  return (
    <MainLayout title={note?.title || "Note Details"}>
      <Container>
        {loading ? (
          <CircularProgress />
        ) : note ? (
          <>
            <Typography variant="h4" fontWeight="bold" gutterBottom>{note.title}</Typography>
            {/* ✅ Display HTML content properly */}
            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: note.content }} />
          </>
        ) : (
          <Typography color="error">Note not found.</Typography>
        )}
      </Container>
    </MainLayout>
  );
};

export default NoteDetails;