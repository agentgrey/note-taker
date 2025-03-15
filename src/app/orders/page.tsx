"use client";
import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import OrderCard from "@/components/Orders/OrderCard";
import MainLayout from "@/layouts/admin";
import Breadcrumbs from "@/core/Breadcrum";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

type Order = {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  status: "Shipped" | "Delivered" | "Pending" | "Cancelled";
  orderDate: string;
};


const Orders = () => {
  const [fetchedOrders, setFetchedOrders] = useState<Order[]>([]); // ✅ Explicitly typed useState
  const { authConfig } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders", authConfig);
        
        if (Array.isArray(response.data)) {
          setFetchedOrders(response.data);
        } else {
          console.error("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [authConfig]);

  const links = [{ id: 1, page: "Order Dashboard", link: "/orders" }];

  return (
    <MainLayout title="Orders">
      <>
        <div className="px-2 md:px-0 ml-14 mt-10 mb-10">
          <Breadcrumbs links={links} />
        </div>

        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
          My Orders
        </Typography>

        <div className="flex-1 flex">
          <div className="w-[95%] mx-auto mt-4 pb-10 bg-white shadow-xl rounded-md p-5">
            {fetchedOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      </>
    </MainLayout>
  );
};

export default Orders;