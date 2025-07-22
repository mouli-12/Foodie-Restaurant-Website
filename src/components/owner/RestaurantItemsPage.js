import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import Navbar from '../Global/Navbar';

function RestaurantItemsPage() {
  const { id } = useParams(); // restaurant ID from URL
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restaurantName, setRestaurantName] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    fetchItems();
  }, [id]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/api/restaurants/${id}`);
      setItems(response.data.itemDetails || []);
      setFilteredItems(response.data.itemDetails || []);

      if (response.data.restaurantName) {
        setRestaurantName(response.data.restaurantName);
      }
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = [...items];

    if (searchTerm) {
      result = result.filter(item =>
        item.itemName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === 'name') {
      result.sort((a, b) => a.itemName?.localeCompare(b.itemName));
    } else if (sortBy === 'price') {
      result.sort((a, b) => a.itemPrice - b.itemPrice);
    }

    setFilteredItems(result);
  }, [searchTerm, sortBy, items]);

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {restaurantName ? `${restaurantName}'s Menu` : 'Restaurant Items'}
        </Typography>

        {loading ? (
          <Grid container justifyContent="center" sx={{ mt: 4 }}>
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Search items"
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    label="Sort By"
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="price">Price</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={4}>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Card>
                    {item.itemImage && (
                      <img
                        src={`data:image/jpeg;base64,${item.itemImage}`}
                        alt={item.itemName}
                        style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: '8px' }}
                      />
                    )}
                      <CardContent>
                        <Typography variant="h6">{item.itemName}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {item.quantity || 'No description'}
                        </Typography>
                        <Typography variant="body1" color="primary">
                          ₹{item.itemPrice}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 3 }}>
                  No items available for this restaurant.
                </Typography>
              )}
            </Grid>
          </>
        )}
      </Container>
    </>
  );
}

export default RestaurantItemsPage;
