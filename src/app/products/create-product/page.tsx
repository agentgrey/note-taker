'use client'
import React, { useState } from "react";

import { Box, Typography, Grid } from "@mui/material";
import ProductForm from "@/components/Products/ProductForm";
import ProductCard from "@/components/Products/ProductCard";
import MainLayout from "@/layouts/admin";
import Breadcrumbs from "@/core/Breadcrum";

interface Product {
  name: string;
  totalQuantity: number;
  MRP: number;
  discount: number;
  sellingPrice: number;
  category: string;
  brand: string;
  description: string;
  image: string;
  color: string;
}


const CreateProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);

  
  const links =
    [
      { id: 1, page: "Products", link: "/products" },
      { id: 2, page: "Create Product", link: `/products/create-product` }
    ]
  return (
    <MainLayout title="Create Product">
      <>
        <div className="px-2 md:px-0 ml-10 pt-4">
          <Breadcrumbs links={links} />
        </div>

        <div className="flex-1 flex">
        <div className="w-[95%] mx-auto mt-4 pb-10 bg-white shadow-xl rounded-md p-5">
          {/* <AddPNote /> */}
          <ProductForm />
        </div>
      </div>
      </>
    </MainLayout>
  );
};

export default CreateProduct;