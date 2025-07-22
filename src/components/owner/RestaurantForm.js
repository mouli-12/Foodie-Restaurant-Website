import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  IconButton,
  Snackbar,
  Alert,
  Typography,
  Paper,
  Box,
  Avatar,
  Divider,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

function RestaurantForm({ onClose, editData }) {
  const [formData, setFormData] = useState({
    restaurantName: '',
    cuisine: '',
    rating: '',
    address: '',
    ownerEmailId: '',
    itemDetails: [
      { itemName: '', itemPrice: '', itemRating: '', quantity: '' },
    ],
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [restaurantImage, setRestaurantImage] = useState(null);
  const [restaurantPreview, setRestaurantPreview] = useState(null);
  const [itemImages, setItemImages] = useState([]);
  const [itemPreviews, setItemPreviews] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({ ...prev, ownerEmailId: user.email }));
    }
    if (editData) {
      setFormData(editData);
    }
  }, [editData, user]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.itemDetails];
    updatedItems[index][name] = value;
    setFormData(prev => ({ ...prev, itemDetails: updatedItems }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      itemDetails: [...prev.itemDetails, { itemName: '', itemPrice: '', itemRating: '', quantity: '' }],
    }));
    setItemImages(prev => [...prev, null]);
    setItemPreviews(prev => [...prev, null]);
  };

  const removeItem = (index) => {
    const updatedItems = [...formData.itemDetails];
    updatedItems.splice(index, 1);
    const updatedImages = [...itemImages];
    updatedImages.splice(index, 1);
    const updatedPreviews = [...itemPreviews];
    updatedPreviews.splice(index, 1);
    setFormData(prev => ({ ...prev, itemDetails: updatedItems }));
    setItemImages(updatedImages);
    setItemPreviews(updatedPreviews);
  };

  const validateForm = () => {
    const { restaurantName, cuisine, rating, address, itemDetails } = formData;
    if (!restaurantName || !cuisine || !rating || !address || !restaurantImage) {
      setError('All restaurant fields and image are required.');
      return false;
    }
    for (let i = 0; i < itemDetails.length; i++) {
      const item = itemDetails[i];
      if (!item.itemName || !item.itemPrice || !item.itemRating || !item.quantity || !itemImages[i]) {
        setError('Please fill out all fields and upload images for each item.');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setError('Access denied. Please login to continue.');
      return;
    }
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      };
      const formDataToSend = new FormData();
      formDataToSend.append('restaurant', JSON.stringify(formData));
      formDataToSend.append('restaurantImage', restaurantImage);
      itemImages.forEach(img => formDataToSend.append('itemImages', img));
      if (editData) {
        await axios.put('http://localhost:9090/api/restaurants/update', formDataToSend, { headers });
        setSuccess('Restaurant updated successfully!');
      } else {
        await axios.post('http://localhost:9090/api/restaurants/add', formDataToSend, { headers });
        setSuccess('Restaurant added successfully!');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <Paper elevation={10} sx={{ display: 'flex', minHeight: '100vh', borderRadius: 2, overflow: 'hidden' }}>
      <Box flex={1.1} sx={{ background: 'linear-gradient(to bottom right, #6d4966, #8d6e63)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 3 }}>
        <Avatar variant="rounded" src="/Images/PublicMain/PM3.jpg" sx={{ width: 140, height: 220, mb: 2 }} />
        <Typography variant="body1" textAlign="center" color="white">
          Add your restaurant and food items details to share your culinary magic with the world. Let's get cooking!
        </Typography>
      </Box>

      <Box flex={2} sx={{ backgroundColor: '#fff', p: 5 }}>
        <Typography variant="h4" fontWeight={800} mb={3} color="#111" textAlign="left">
          {editData ? 'Update Restaurant' : 'Add New Restaurant'}
        </Typography>

        <form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}><TextField label="Restaurant Name" name="restaurantName" fullWidth value={formData.restaurantName} onChange={handleChange} required variant="standard" /></Grid>
            <Grid item xs={12} sm={6}><TextField label="Cuisine" name="cuisine" fullWidth value={formData.cuisine} onChange={handleChange} required variant="standard" /></Grid>
            <Grid item xs={12} sm={6}><TextField label="Rating" name="rating" type="number" inputProps={{ min: 0, max: 5, step: 0.1 }} fullWidth value={formData.rating} onChange={handleChange} required variant="standard" /></Grid>
            <Grid item xs={12} sm={6}><TextField label="Address" name="address" fullWidth value={formData.address} onChange={handleChange} required variant="standard" /></Grid>

            <Grid item xs={12}>
              <Typography fontWeight={500} variant="subtitle2">Upload Restaurant Image</Typography>
              <Button variant="text" component="label" startIcon={<UploadFileIcon />} sx={{ textTransform: 'none' }}>
                Choose File
                <input type="file" hidden accept="image/*" onChange={(e) => {
                  setRestaurantImage(e.target.files[0]);
                  setRestaurantPreview(URL.createObjectURL(e.target.files[0]));
                }} />
              </Button>
              {restaurantPreview && <Avatar src={restaurantPreview} variant="rounded" sx={{ mt: 1, width: 100, height: 100 }} />}
            </Grid>

            <Grid item xs={12}><Divider sx={{ my: 2 }} /><Typography variant="subtitle1" fontWeight={600}>Item Details</Typography></Grid>

            {formData.itemDetails.map((item, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} sm={3}><TextField label="Item Name" name="itemName" fullWidth value={item.itemName} onChange={(e) => handleItemChange(index, e)} required variant="standard" /></Grid>
                <Grid item xs={12} sm={2}><TextField label="Price" name="itemPrice" type="number" fullWidth value={item.itemPrice} onChange={(e) => handleItemChange(index, e)} required variant="standard" /></Grid>
                <Grid item xs={12} sm={2}><TextField label="Rating" name="itemRating" type="number" fullWidth value={item.itemRating} onChange={(e) => handleItemChange(index, e)} required variant="standard" /></Grid>
                <Grid item xs={12} sm={2}><TextField label="Quantity" name="quantity" fullWidth value={item.quantity} onChange={(e) => handleItemChange(index, e)} required variant="standard" /></Grid>
                <Grid item xs={12} sm={2}>
                  <Button variant="text" component="label" startIcon={<UploadFileIcon />}>
                    Upload
                    <input type="file" hidden accept="image/*" onChange={(e) => {
                      const newImages = [...itemImages];
                      const newPreviews = [...itemPreviews];
                      newImages[index] = e.target.files[0];
                      newPreviews[index] = URL.createObjectURL(e.target.files[0]);
                      setItemImages(newImages);
                      setItemPreviews(newPreviews);
                    }} />
                  </Button>
                  {itemPreviews[index] && <Avatar src={itemPreviews[index]} variant="rounded" sx={{ mt: 1, width: 80, height: 80 }} />}
                </Grid>
                <Grid item xs={12} sm={1}><IconButton color="error" onClick={() => removeItem(index)} disabled={formData.itemDetails.length === 1}><DeleteIcon /></IconButton></Grid>
              </React.Fragment>
            ))}

            <Grid item xs={12}><Button
  variant="contained"
  onClick={addItem}
  startIcon={<AddCircleOutlineIcon />}
  sx={{
    borderRadius: 0,
    backgroundColor: '#8d6e63', // Set the custom background color
    '&:hover': {
      backgroundColor: '#7a5c77', // Optional: change color on hover
    },
  }}
>
  Add Item
</Button></Grid>

            <Grid item xs={12}>
              <FormControlLabel control={<Checkbox defaultChecked />} label={<Typography variant="body2">I agree to the <b>terms & conditions</b></Typography>} />
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
              <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: '#8d6e63', color: 'white', px: 4, borderRadius: 0 }}>{editData ? 'Update' : 'Add Restaurent'}</Button>
            </Grid>
          </Grid>
        </form>

        <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity="error" onClose={() => setError('')}>{error}</Alert>
        </Snackbar>
        <Snackbar open={!!success} autoHideDuration={3000} onClose={() => setSuccess('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
          <Alert severity="success" onClose={() => setSuccess('')}>{success}</Alert>
        </Snackbar>
      </Box>
    </Paper>
  );
}

export default RestaurantForm;
