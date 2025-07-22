import React, { useState, useEffect } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CardMedia,
  IconButton,
  Box
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './Cart.css'; // ⬅️ Linked external CSS
import DeleteIcon from '@mui/icons-material/Delete';


const Cart = ({ cartItems, setCartItems, placeOrder }) => {
  const [selectedItemNames, setSelectedItemNames] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const initialQuantities = {};
    cartItems?.forEach(item => {
      initialQuantities[item.itemName] = quantities[item.itemName] || 1;
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  const handleToggle = (itemName) => {
    setSelectedItemNames(prev =>
      prev.includes(itemName)
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  const handleIncrement = (itemName) => {
    setQuantities(prev => ({
      ...prev,
      [itemName]: (prev[itemName] || 1) + 1,
    }));
  };

  const handleDecrement = (itemName) => {
    setQuantities(prev => ({
      ...prev,
      [itemName]: Math.max((prev[itemName] || 1) - 1, 1),
    }));
  };

  const handlePlaceOrder = () => {
    setOpen(true);
  };

  const handleConfirmOrder = () => {
    const orderItems = cartItems
      .filter(item => selectedItemNames.includes(item.itemName))
      .map(item => ({
        ...item,
        quantity: quantities[item.itemName] || 1,
      }));

    placeOrder(orderItems);
    setSelectedItemNames([]);
    setOpen(false);
  };

  const handleDeleteItem = (itemName) => {
  const updatedCart = cartItems.filter(item => item.itemName !== itemName);
  setCartItems(updatedCart);
  setSelectedItemNames(prev => prev.filter(name => name !== itemName));
};


  const totalAmount = cartItems.reduce((sum, item) => {
    if (!selectedItemNames.includes(item.itemName)) return sum;
    const price = parseFloat(item.itemPrice) || 0;
    const qty = quantities[item.itemName] || 1;
    return sum + price * qty;
  }, 0);

  return (
    <Box className="cart-container">
      <Typography variant="h5" className="cart-header">Cart</Typography>
      <List>
        {cartItems?.map((item, index) => {
          const itemKey = item.itemName;
          return (
            <ListItem key={itemKey} className="cart-item">
              <Box className="cart-image-box" style={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  image={`data:image/jpeg;base64,${item.itemImage}`}
                  alt={item.itemName}
                  className="cart-item-image"
                />
                {/* 🔴 Delete Icon over image */}
                <IconButton
                  size="small"
                  onClick={() => handleDeleteItem(itemKey)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    color:'red'
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>

                {/* Quantity Controls */}
                <Box className="cart-quantity-controls">
                  <IconButton size="small" onClick={() => handleDecrement(itemKey)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ mx: 1 }}>{quantities[itemKey] || 1}</Typography>
                  <IconButton size="small" onClick={() => handleIncrement(itemKey)}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>


              <Checkbox
                edge="start"
                checked={selectedItemNames.includes(itemKey)}
                onChange={() => handleToggle(itemKey)}
                sx={{ marginRight: 2 }}
              />
              <ListItemText
                primary={item.itemName}
                secondary={`Price: ₹${item.itemPrice}`}
              />
            </ListItem>
          );
        })}
      </List>

      <Button
        variant="contained"
        onClick={handlePlaceOrder}
        disabled={selectedItemNames.length === 0}
        className="cart-order-button"
      >
        Place Order
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle className="cart-dialog-title">Order Summary</DialogTitle>
        <DialogContent>
          {cartItems
            .filter(item => selectedItemNames.includes(item.itemName))
            .map((item, index) => (
              <div key={index} className="cart-dialog-item">
                <CardMedia
                  component="img"
                  image={`data:image/jpeg;base64,${item.itemImage}`}
                  alt={item.itemName}
                  className="cart-dialog-image"
                />
                <Typography>
                  {item.itemName} - ₹{item.itemPrice} × {quantities[item.itemName] || 1}
                </Typography>
              </div>
            ))}
          <Typography variant="h6" sx={{ mt: 2 }}>Total: ₹{totalAmount}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirmOrder} className="cart-confirm-button">
            Buy Now
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cart;
