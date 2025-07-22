import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  CardMedia
} from '@mui/material';

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:9090/api/restaurants')
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.error('Error fetching restaurants:', err));
  }, []);

  const handleToggle = async (id, currentStatus) => {
    try {
      await axios.put(
        `http://localhost:9090/api/restaurants/${id}/toggle?enabled=${!currentStatus}`
      );
      setRestaurants((prev) =>
        prev.map((r) =>
          r.resid === id ? { ...r, enabled: !currentStatus } : r
        )
      );
    } catch (error) {
      console.error('Error toggling restaurant status:', error);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        background: 'linear-gradient(to right,rgb(176, 154, 146) 0%,rgb(168, 136, 162) 50%,rgb(99, 111, 155) 100%)',
        minHeight: '100vh',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          mb: 3,
          textAlign: 'center',
          fontFamily: 'Poppins, sans-serif',
          color: 'white'
        }}
      >
        🍽️ Restaurant List
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {restaurants.map((restaurant) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={restaurant.resid}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Card
              sx={{
                width: 320,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)'
                },
              }}
            >
              {restaurant.restaurantImage && (
                <CardMedia
                  component="img"
                  image={`data:image/jpeg;base64,${restaurant.restaurantImage}`}
                  alt={restaurant.restaurantName}
                  sx={{
                    height: 200,
                    objectFit: 'cover',
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />
              )}

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#8d6e63' }}>
                  {restaurant.restaurantName}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Cuisine: {restaurant.cuisine}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Rating: {restaurant.rating}
                </Typography>

                <FormControlLabel
                  control={
                    <Switch
                      checked={restaurant.enabled}
                      onChange={() => handleToggle(restaurant.resid, restaurant.enabled)}
                      color="primary"
                    />
                  }
                  label={restaurant.enabled ? 'Enabled' : 'Disabled'}
                  sx={{
                    color: '#394b8f'
                  }}
                />

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#6d4966' }}>
                  Menu Items
                </Typography>
                <List dense>
                  {restaurant.itemDetails.map((item) => (
                    <ListItem key={item.itemId} sx={{ px: 0 }}>
                      <ListItemText
                        primary={`${item.itemName} - ₹${item.itemPrice}`}
                        secondary={`Rating: ${item.itemRating} | Qty: ${item.quantity}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RestaurantsPage;
