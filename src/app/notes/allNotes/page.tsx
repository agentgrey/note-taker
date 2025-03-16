"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import MainLayout from "@/layouts/admin";
import Breadcrumbs from "@/core/Breadcrum";
import { useAuth } from "@/context/AuthContext";
import {
  Container, Card, CardContent, Typography, Button, Grid, Box, CircularProgress
} from "@mui/material";
import NoteDetails from "@/components/NoteDetails";
import Swal from "sweetalert2";

const AllNotes = () => {
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authConfig } = useAuth();
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!subject) return;

    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/notes/getAll/?subject=${subject}`, authConfig);
        setNotes(response.data.notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [subject]);

  const handleDelete = async (note: any) => {
    console.log("in the delt", note);
    if (!note) return;

    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      await axios.delete(`/api/notes/delete?id=${note}`, authConfig);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your note has been deleted successfully.",
        confirmButtonColor: "#3085d6",
        timer: 2000, // ✅ Auto-close after 2 seconds
        timerProgressBar: true,
      }).then(() => {
        window.location.reload(); // ✅ Reload page after Swal closes
      });

      // onClose();
    } catch (error) {
      console.error("Error deleting note:", error);

      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong while deleting the note. Please try again.",
        confirmButtonColor: "#d33",
        timer: 2500,
        timerProgressBar: true,
      });
    }
  };

  return (
    <MainLayout title={`Notes for ${subject || "All Subjects"}`}>
      <Container maxWidth="lg">
        <Breadcrumbs links={[{ id: 1, page: "Dashboard", link: "/notes" }]} />
        <Typography variant="h4" fontWeight="bold" mb={3}>
          All Notes for {subject}
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : notes.length === 0 ? (
          <Typography>No notes found for {subject}.</Typography>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {notes.map((note: any) => (
              <Grid item xs={12} sm={6} md={4} key={note.id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    borderRadius: 3,
                    boxShadow: 4,
                    transition: "0.3s",
                    "&:hover": { boxShadow: 8 }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold">{note.title}</Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      dangerouslySetInnerHTML={{ __html: note.content.substring(0, 100) + "..." }}
                    />
                  </CardContent>

                  {/* Buttons Section */}
                  <Box display="flex" justifyContent="space-between" p={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => {
                        setSelectedNote(note.id);
                        setOpenModal(true);
                      }}
                    >
                      Read More
                    </Button>
                    <Button
                      onClick={() => handleDelete(note.id)}
                      variant="outlined"
                      color="error"
                      size="small"
                    >
                      Delete
                    </Button>

                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* ✅ Modal to show note details */}
        <NoteDetails id={selectedNote} open={openModal} onClose={() => setOpenModal(false)} />
      </Container>
    </MainLayout>
  );
};

export default AllNotes;
