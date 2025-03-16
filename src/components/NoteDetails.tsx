"use client";

import { useState, useEffect } from "react";
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Typography, IconButton, Button, Box, TextField 
} from "@mui/material";
import { X } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";

// Dynamically import RichTextEditor to avoid SSR issues
const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), { ssr: false });

const NoteDetails = ({ id, open, onClose }: { id: string | null, open: boolean, onClose: () => void }) => {
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { authConfig } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchNote = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/notes/getSingle/?id=${id}`, authConfig);
        const fetchedNote = response.data.note;

        setNote(fetchedNote);
        setTitle(fetchedNote.title); // Set title
        setContent(fetchedNote.content); // Set content
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  // Function to format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  const handleDelete = async () => {
    if (!note?.id) return;
  
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
      await axios.delete(`/api/notes/delete?id=${note.id}`, authConfig);
  
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your note has been deleted successfully.",
        confirmButtonColor: "#3085d6",
        timer: 2000, // ✅ Auto-close after 2 seconds
        timerProgressBar: true,
      });
  
      onClose();
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
  

  const handleSave = async () => {
    if (!note?.id) return;
    try {
      await axios.patch(
        `/api/notes/edit?id=${note.id}`,
        { title, content },
        authConfig
      );
      setEditMode(false);
      onClose();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your note has been updated successfully.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
  
      setEditMode(false);
      setNote((prev: any) => ({ ...prev, title, content })); // Update local state
    } catch (error) {
      console.error("Error updating note:", error);
      setEditMode(false);
      onClose();
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong while updating the note. Please try again.",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {editMode ? "Edit Note" : note?.title || "Note Details"}
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 16, top: 16 }}>
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : note ? (
          editMode ? (
            <>
              <TextField 
                fullWidth 
                label="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                margin="normal" 
              />
              <RichTextEditor value={content} onChange={setContent} />
            </>
          ) : (
            <>
              <Typography variant="h6">{note.title}</Typography>
              <Typography variant="body1" dangerouslySetInnerHTML={{ __html: note.content }} />
            </>
          )
        ) : (
          <Typography color="error">Note not found.</Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", padding: "16px" }}>
        <Box>
          <Typography variant="body2" color="textSecondary">
            Created At: {formatDate(note?.createdAt)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Updated At: {formatDate(note?.updatedAt)}
          </Typography>
        </Box>
        <Box>
          {editMode ? (
            <>
              <Button variant="contained" color="success" size="small" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outlined" color="secondary" size="small" sx={{ ml: 2 }} onClick={() => setEditMode(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button variant="contained" color="primary" size="small" onClick={() => setEditMode(true)}>
                Edit
              </Button>
              <Button 
                variant="outlined" 
                color="error" 
                size="small" 
                sx={{ ml: 2 }} 
                onClick={handleDelete}
              >
                Delete
              </Button>
            </>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default NoteDetails;
