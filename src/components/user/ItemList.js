import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Button,
  TextField,
  Box
} from '@mui/material';


const ItemList = ({ restaurant, addToCart, goBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  if (!restaurant) return null;

  let filteredItems = restaurant.itemDetails.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (priceFilter === 'asc') {
    filteredItems.sort((a, b) => a.itemPrice - b.itemPrice);
  } else if (priceFilter === 'desc') {
    filteredItems.sort((a, b) => b.itemPrice - a.itemPrice);
  }

  return (
    <Box sx={{ mt: 2, px: 3 }}>
      <Button
        variant="contained"
        onClick={goBack}
        className="itemlist-back-button"
        sx={{
          mb: 4,
          backgroundColor: '#8D6E63',
          '&:hover': { backgroundColor: '#6d4966' },
          fontWeight: 'bold'
        }}
      >
        ⬅ Back to Restaurants
      </Button>

      <Grid container spacing={3} alignItems="center" sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Search Items"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="itemlist-search-field"
            sx={{
              borderRadius: 5,
              width: 350,
              backgroundColor: '#fdfdfd',
              boxShadow: 1
            }}
          />
        </Grid>
      </Grid>

      <div className="itemlist-grid-wrapper">
        <Grid container spacing={4} justifyContent="center">
          {filteredItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={item.itemId || index}>
              <Card
                className="itemlist-card"
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  width: 270 ,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 6
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={`data:image/jpeg;base64,${item.itemImage}`}
                  alt={item.itemName}
                  sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.itemName}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                    Price: ₹{item.itemPrice}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                    Quantity: {item.quantity}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => addToCart(item)}
                    className="itemlist-add-button"
                    sx={{
                      backgroundColor: '#8d6e63',
                      '&:hover': { backgroundColor: '#8d6e63' },
                      textTransform: 'none'
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
};

export default ItemList;
