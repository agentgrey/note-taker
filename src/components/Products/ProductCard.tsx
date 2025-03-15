'use client';
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import OrderForm from "../Orders/OrderForm";

interface ProductProps {
  product: {
    id: string;
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
  };
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const [openDetails, setOpenDetails] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);

  return (
    <>
      {/* Product Card */}
      <Card sx={{ maxWidth: 350, boxShadow: 3, borderRadius: 2 }}>
        <CardMedia component="img" height="180" image={product.image} alt={product.name} />
        <CardContent>
          <Typography variant="h6" fontWeight="bold">{product.name}</Typography>
          <Typography variant="body2" color="text.secondary">{product.brand} - {product.category}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{product.color}</Typography>
          <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
            ₹{product.sellingPrice} 
            <Typography variant="body2" component="span" sx={{ ml: 1, textDecoration: "line-through", color: "gray" }}>
              ₹{product.MRP}
            </Typography>
          </Typography>
          <Typography variant="body2" color="green">Discount: {product.discount}%</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>Stock: {product.totalQuantity}</Typography>
        </CardContent>

        <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="primary" onClick={() => setOpenDetails(true)}>View Details</Button>
          <Button variant="outlined" color="secondary" onClick={() => setOpenOrder(true)}>Place Order</Button>
        </CardContent>
      </Card>

      {/* Dialog (Popup) for View Details */}
      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} fullWidth maxWidth="sm">
        <DialogTitle>{product.name}</DialogTitle>
        <DialogContent>
          <CardMedia component="img" height="250" image={product.image} alt={product.name} sx={{ borderRadius: 2, mb: 2 }} />
          <Typography variant="body1"><strong>Brand:</strong> {product.brand}</Typography>
          <Typography variant="body1"><strong>Category:</strong> {product.category}</Typography>
          <Typography variant="body1"><strong>Color:</strong> {product.color}</Typography>
          <Typography variant="body1"><strong>Description:</strong> {product.description}</Typography>
          <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
            ₹{product.sellingPrice} 
            <Typography variant="body2" component="span" sx={{ ml: 1, textDecoration: "line-through", color: "gray" }}>
              ₹{product.MRP}
            </Typography>
          </Typography>
          <Typography variant="body2" color="green">Discount: {product.discount}%</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}><strong>Stock:</strong> {product.totalQuantity}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetails(false)} color="secondary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog (Popup) for Order Form */}
      <Dialog open={openOrder} onClose={() => setOpenOrder(false)} fullWidth maxWidth="sm">
        <DialogTitle>Place Order for {product.name}</DialogTitle>
        <DialogContent>
          <OrderForm productId={product.id} productName={product.name} onClose={() => setOpenOrder(false)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenOrder(false)} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductCard;
