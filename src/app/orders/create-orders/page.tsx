"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardContent, CardHeader, Typography, TextField, MenuItem, Button } from "@mui/material";
import Swal from "sweetalert2";
import MainLayout from "@/layouts/admin";
import Breadcrumbs from "@/core/Breadcrum";

const products = [
  { id: 1, name: "Product A" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
];

const validationSchema = Yup.object({
  product: Yup.string().required("Product is required"),
  customerName: Yup.string().required("Customer name is required"),
  customerEmail: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  quantity: Yup.number().min(1, "Quantity must be at least 1").required("Quantity is required"),
});


export default function CreateOrder() {
  
  const links = [
    { id: 1, page: "Product Dashboard", link: "/products" },
    // { id: 2, page: "Promissory-Note", link: "/promissory-note" },
  ];
  
  return (
    
    <MainLayout title="Create Order">
      <>
      <div className="px-2 md:px-0 ml-14 mt-10 mb-10">
          <Breadcrumbs links={links} />
        </div>
      </>
    </MainLayout>
  );
}