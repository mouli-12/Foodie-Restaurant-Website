// At top — remove unnecessary imports
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  IconButton,
  Tooltip
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../Global/Navbar';
import RestaurantForm from './RestaurantForm';
import './OwnerPage.css';

export default function OwnerPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user || user.role !== 'owner') {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const ownerEmail = user?.email;
      const response = await axios.get(
        `http://localhost:9090/api/restaurants/enabled/by-owner?ownerEmailId=${ownerEmail}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRestaurants(response.data);
      setFiltered(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const handleDelete = async (resid) => {
    try {
      await axios.delete(`http://localhost:9090/api/restaurants/${resid}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
      });
      fetchRestaurants();
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  const handleEdit = (restaurant) => {
    setEditData(restaurant);
    setDialogOpen(true);
  };

  const handleFormClose = () => {
    setEditData(null);
    setDialogOpen(false);
    fetchRestaurants();
  };

  useEffect(() => {
    let result = [...restaurants];
    if (searchTerm) {
      result = result.filter(r =>
        r.restaurantName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortBy === 'name') {
      result.sort((a, b) => a.restaurantName.localeCompare(b.restaurantName));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }
    setFiltered(result);
  }, [searchTerm, sortBy, restaurants]);

  return (
    <>
      <Navbar />

      {/* Scrolling side images */}
      <div className="scrolling-column left-column">
        <div className="image-scroller">
          {[...Array(15)].map((_, i) => (
            <img key={i} src={`/Images/RestaurantImages/R${(i % 12) + 1}.jpg`} alt={`food${i}`} />
          ))}
        </div>
      </div>
      <div className="scrolling-column right-column">
        <div className="image-scroller">
          {[...Array(15)].map((_, i) => (
            <img key={i} src={`/Images/RestaurantImages/R${(11 - i % 12) + 1}.jpg`} alt={`food${i}`} />
          ))}
        </div>
      </div>

      <Container className="owner-container">
        <Typography
          variant="h4"
          align="center"
          sx={{ color: '#444', mb: 4, mt: 2, pt: 4 }}
        >
          Welcome, {user.userName || 'Owner'}! Manage your restaurants below.
        </Typography>

        <Typography className="section-header" variant="h4" sx={{ mb: 3 }}>
          My Restaurants
        </Typography>

        <Grid container spacing={2} alignItems="center" className="search-sort-bar">
          <Grid item xs={12} md={4}>
            <TextField
              label="Search by name"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              sx={{ borderRadius: '30px', '& fieldset': { borderRadius: '30px' } }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                fullWidth
                sx={{
                  background: 'linear-gradient(45deg, #8d6e63, #6d4966)',
                  color: 'White',
                  fontWeight: 'bold',
                  paddingX: 3,
                  borderRadius: '30px',
                  height: '56px'
                }}
                onClick={() => setDialogOpen(true)}
              >
                Add Restaurant
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <Select
                displayEmpty
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                inputProps={{ 'aria-label': 'Sort By' }}
                sx={{
                  height: '56px',
                  borderRadius: '30px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '30px',
                    height: '56px',
                  },
                  '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 2,
                  },
                }}
              >
                <MenuItem value="">Sort Your Restaurants</MenuItem>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={4} className="restaurant-grid">
          {filtered.length > 0 ? (
            filtered.map(restaurant => (
              <Grid item xs={12} sm={6} md={4} key={restaurant.resid}>
                <Card className="restaurant-card">
                  <CardContent
                    sx={{
                      cursor: 'pointer',
                      paddingX: 3,
                      paddingY: 2,
                      bgcolor: 'white',
                      color: '#333'
                    }}
                    onClick={() => navigate(`/restaurant/${restaurant.resid}/items`)}
                  >
                    {restaurant.restaurantImage && (
                      <Box
                        component="img"
                        src={`data:image/jpeg;base64,${restaurant.restaurantImage}`}
                        alt={restaurant.restaurantName}
                        className="restaurant-card-img"
                      />
                    )}
                    <Typography variant="h6" gutterBottom>
                      {restaurant.restaurantName}
                    </Typography>
                    <Typography variant="body2">Location: {restaurant.address}</Typography>
                    <Typography variant="body2">Rating: {restaurant.rating}</Typography>
                  </CardContent>

                  <Box className="card-toolbar">
                    <Tooltip title="Edit">
                      <IconButton color="primary" onClick={() => handleEdit(restaurant)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => handleDelete(restaurant.resid)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" align="center" color="text.secondary" sx={{ mt: 3 }}>
              No restaurants found.
            </Typography>
          )}
        </Grid>
      </Container>

      <Dialog open={dialogOpen} onClose={handleFormClose} fullWidth maxWidth="sm">
        <DialogTitle>{editData ? 'Edit Restaurant' : 'Add New Restaurant'}</DialogTitle>
        <DialogContent>
          <RestaurantForm onClose={handleFormClose} editData={editData} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
