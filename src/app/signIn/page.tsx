"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { 
  TextField, Button, Container, Box, Typography, CircularProgress, Card, CardContent, Paper 
} from "@mui/material";
import { toast } from "react-toastify";
import { ROLE } from "@/constants/role.constants";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

export default function SignIn() {
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = {
        data: {
          email: "hima@gmail.com",
          role: ROLE.ADMIN,
          token: "token",
        },
      };
      const userData = { 
        email: response.data.email, 
        role: response.data.role, 
        token: response.data.token 
      };
      
      login(userData);
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="xs">
      <Box 
        component={Paper} 
        elevation={6} 
        sx={{ 
          mt: 12, 
          p: 3, 
          borderRadius: 2, 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          backgroundColor: "white" 
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          Please sign in to continue
        </Typography>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignInSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <Form style={{ width: "100%" }}>
              <Field
                as={TextField}
                label="Email Address"
                name="email"
                fullWidth
                variant="outlined"
                margin="normal"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                as={TextField}
                label="Password"
                name="password"
                type="password"
                fullWidth
                variant="outlined"
                margin="normal"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ mt: 2, py: 1.2, fontWeight: "bold" }} 
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Sign In"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
