import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../../contexts/AuthContext';
import './RestaurantList.css';

// Predefined cuisine types with images
const cuisines = [
  { name: 'All', image: '/Images/Cuisine/All.jpg' },
  { name: 'Indian', image: '/Images/Cuisine/Indian.jpg' },
  { name: 'Chinese', image: '/Images/Cuisine/Chinese.jpg' },
  { name: 'South Indian', image: '/Images/Cuisine/SouthIndian.jpg' },
  { name: 'Dessert', image: '/Images/Cuisine/Desert.jpg' },
  { name: 'Italian', image: '/Images/Cuisine/Italian.jpg' },
];

const RestaurantList = ({ onSelectRestaurant }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [filterCuisine, setFilterCuisine] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get('http://localhost:9090/api/restaurants/enabled')
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.error(error));
  }, []);

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const name = restaurant.restaurantName?.toLowerCase() || '';
    const cuisine = restaurant.cuisine?.toLowerCase() || '';
    const matchesCuisine =
      filterCuisine === 'All' || cuisine.includes(filterCuisine.toLowerCase());
    const matchesSearch = name.includes(searchQuery.toLowerCase());

    return matchesCuisine && matchesSearch;
  });

  return (
    
    <Box className="restaurant-list-container">
      <Box className="welcome-banner">
  <Typography variant="h3" className="welcome-text">
    Welcome, {user.userName || 'Guest'}!
  </Typography>
  <Typography variant="h5" className="welcome-subtext">
    We're delighted to serve you delicious food.
  </Typography>
</Box>
      {/* Cuisine Filter Section */}
      <Box className="cuisine-filter-container">
        {cuisines.map((cuisine) => (
          <Box
            key={cuisine.name}
            className={`cuisine-circle ${filterCuisine === cuisine.name ? 'active' : ''}`}
            onClick={() => setFilterCuisine(cuisine.name)}
          >
            <img src={cuisine.image} alt={cuisine.name} />
            <Typography variant="body2">{cuisine.name}</Typography>
          </Box>
        ))}
      </Box>

      {/* Search Bar */}
      <Box className="search-bar-wrapper">
        <TextField
          fullWidth
          placeholder="Search by restaurant name"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            sx: {
              borderRadius: '30px',
              backgroundColor: '#fff',
              paddingLeft: '10px',
            },
          }}
        />
      </Box>

      {/* Restaurant Cards */}
      <Grid container spacing={5} sx={{ mt: 2 }}justifyContent="center">
        {filteredRestaurants.map((restaurant) => (
          <Grid item xs={12} sm={6} md={4} key={restaurant.resid}>
            <Card
              onClick={() => onSelectRestaurant(restaurant)}
              className="restaurant-card"
            >
              <CardMedia
                component="img"
                height="180"
                width = "230"
                position = "center"
                image={`data:image/jpeg;base64,${restaurant.restaurantImage}`}
                alt={restaurant.restaurantName}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {restaurant.restaurantName}
                </Typography>
                <Typography className="restaurant-info" variant="body2" color="textSecondary">
                  Cuisine: {restaurant.cuisine}
                </Typography>
                <Typography className="restaurant-info" variant="body2" color="textSecondary">
                  Rating: {restaurant.rating} / 5
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RestaurantList;
