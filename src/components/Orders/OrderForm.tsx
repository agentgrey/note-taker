"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";


interface OrderFormProps {
  productId: string;
  productName: string;
  onClose: ()=> void;
}


const validationSchema = Yup.object({
  customerName: Yup.string().required("Customer name is required"),
  customerEmail: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  quantity: Yup.number().min(1, "Quantity must be at least 1").required("Quantity is required"),
});

const OrderForm: React.FC<OrderFormProps> = ({ productId, productName , onClose }) => {
  const [loading, setLoading] = useState(false);
  const {authConfig} = useAuth();  
  const BASE_URL = process.env.NEXT_PUBLIC_URL;
  const formik = useFormik({
    initialValues: {
      product: productId || "",
      customerName: "",
      customerEmail: "",
      address: "",
      quantity: 1,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}/api/orders`, values, authConfig);
        Swal.fire({
          title: "Success",
          text: "Order placed successfully!",
          icon: "success",
        });
        resetForm();
        onClose();
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Something went wrong!",
          icon: "error",
        });
        onClose();
      } finally {
        setLoading(false);
        onClose();
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <TextField
        label="Product"
        name="product"
        value={productName}
        InputProps={{ readOnly: true }} // Product is readonly
      />
      <TextField
        label="Customer Name"
        name="customerName"
        value={formik.values.customerName}
        onChange={formik.handleChange}
        error={formik.touched.customerName && Boolean(formik.errors.customerName)}
        helperText={formik.touched.customerName && formik.errors.customerName}
      />
      <TextField
        label="Customer Email"
        type="email"
        name="customerEmail"
        value={formik.values.customerEmail}
        onChange={formik.handleChange}
        error={formik.touched.customerEmail && Boolean(formik.errors.customerEmail)}
        helperText={formik.touched.customerEmail && formik.errors.customerEmail}
      />
      <TextField
        label="Shipping Address"
        name="address"
        value={formik.values.address}
        onChange={formik.handleChange}
        error={formik.touched.address && Boolean(formik.errors.address)}
        helperText={formik.touched.address && formik.errors.address}
      />
      <TextField
        label="Quantity"
        type="number"
        name="quantity"
        value={formik.values.quantity}
        onChange={formik.handleChange}
        error={formik.touched.quantity && Boolean(formik.errors.quantity)}
        helperText={formik.touched.quantity && formik.errors.quantity}
        inputProps={{ min: 1 }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
        {loading ? <CircularProgress size={24} color="inherit" /> : "Place Order"}
      </Button>
    </form>
  );
};

export default OrderForm;
