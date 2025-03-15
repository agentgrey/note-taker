import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import { TextField, Button, MenuItem, Typography, Box, Paper, Grid } from "@mui/material";
import { useAuth } from "@/context/AuthContext";

const categories = ["Electronics", "Fashion", "Home Appliances", "Books"];
const brands = ["Apple", "Samsung", "Nike", "Sony"];

const validationSchema = Yup.object({
  name: Yup.string().required("Product Name is required"),
  totalQuantity: Yup.number().min(1, "Must be at least 1").required("Quantity is required"),
  MRP: Yup.number().positive("Must be positive").required("MRP is required"),
  discount: Yup.number().min(0).max(100, "Max 100%").required("Discount is required"),
  sellingPrice: Yup.number().positive("Must be positive").required("Selling Price is required"),
  category: Yup.string().required("Category is required"),
  brand: Yup.string().required("Brand is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.string().url("Invalid URL").required("Image URL is required"),
  color: Yup.string().required("Color is required"),
});

const ProductForm = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_URL;
  const {authConfig} = useAuth();
  const formik = useFormik({
    initialValues: {
      name: "",
      totalQuantity: "",
      MRP: "",
      discount: "",
      sellingPrice: "",
      category: "",
      brand: "",
      description: "",
      image: "",
      color: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const API_URL = `${BASE_URL}/api/products`
        const response = await axios.post("/api/products", values, authConfig);
        console.log(response);
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Product Added!",
            text: "Your product has been successfully added.",
          });
          resetForm();
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Something went wrong. Please try again.",
        });
      }
    },
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
      <Paper elevation={4} sx={{ maxWidth: 600, width: "100%", p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3} color="primary">
          Add New Product
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Product Name" {...formik.getFieldProps("name")} error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth type="number" label="Total Quantity" {...formik.getFieldProps("totalQuantity")} error={formik.touched.totalQuantity && Boolean(formik.errors.totalQuantity)} helperText={formik.touched.totalQuantity && formik.errors.totalQuantity} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth type="number" label="MRP (₹)" {...formik.getFieldProps("MRP")} error={formik.touched.MRP && Boolean(formik.errors.MRP)} helperText={formik.touched.MRP && formik.errors.MRP} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth type="number" label="Discount (%)" {...formik.getFieldProps("discount")} error={formik.touched.discount && Boolean(formik.errors.discount)} helperText={formik.touched.discount && formik.errors.discount} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth type="number" label="Selling Price (₹)" {...formik.getFieldProps("sellingPrice")} error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)} helperText={formik.touched.sellingPrice && formik.errors.sellingPrice} />
            </Grid>
            <Grid item xs={6}>
              <TextField select fullWidth label="Category" {...formik.getFieldProps("category")} error={formik.touched.category && Boolean(formik.errors.category)} helperText={formik.touched.category && formik.errors.category}>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField select fullWidth label="Brand" {...formik.getFieldProps("brand")} error={formik.touched.brand && Boolean(formik.errors.brand)} helperText={formik.touched.brand && formik.errors.brand}>
                {brands.map((brand) => (
                  <MenuItem key={brand} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={3} label="Description" {...formik.getFieldProps("description")} error={formik.touched.description && Boolean(formik.errors.description)} helperText={formik.touched.description && formik.errors.description} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Image URL" {...formik.getFieldProps("image")} error={formik.touched.image && Boolean(formik.errors.image)} helperText={formik.touched.image && formik.errors.image} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Color" {...formik.getFieldProps("color")} error={formik.touched.color && Boolean(formik.errors.color)} helperText={formik.touched.color && formik.errors.color} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.5 }}>
                Add Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default ProductForm;