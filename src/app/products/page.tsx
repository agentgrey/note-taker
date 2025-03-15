// pages/products.tsx
import ProductList from "@/components/Products/ProductList";
import Breadcrumbs from "@/core/Breadcrum";
import MainLayout from "@/layouts/admin";
import React from "react";

const ProductsPage: React.FC = () => {

  const links = [
    { id: 1, page: "Product Dashboard", link: "/products" },
    // { id: 2, page: "Promissory-Note", link: "/promissory-note" },
  ];
  return (
    <MainLayout title="All Products">
      <>
        <div className="px-2 md:px-0 ml-14 mt-10 mb-10">
          <Breadcrumbs links={links} />
        </div>
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Products</h1>
          <ProductList />
        </div>
      </>
    </MainLayout>
  );
};

export default ProductsPage;