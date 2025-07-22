import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Signup.css';
import { toast } from 'react-toastify';

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange'
  });

  const navigate = useNavigate();
  const role = watch('role');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const onSubmit = async (data) => {
    try {
      const payload = {
        emailId: data.emailId,
        userName: data.userName,
        password: data.password,
        address: data.address,
        role: data.role,
        phNumber: data.phNumber
      };

      const response = await axios.post('http://localhost:8080/signup', payload);
      if (response.status === 201) {
        toast.success("Registration Completed Successfully");
        setOpenSnackbar(true);         // ✅ Show success snackbar
        reset();                        // ✅ Clear form
        setTimeout(() => navigate('/login'), 1500); // Redirect after delay
      }
    } catch (error) {
      console.error('Signup Error:', error);
    }
  };

  const handleRoleChange = (selectedRole) => {
    setValue('role', selectedRole, { shouldValidate: true });
  };

  return (
    <Container className="signup-container">
      <Box className="signup-form">
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: 2 }}
        >
          Back
        </Button>

        <Typography variant="h4" align="center" className="signup-title" gutterBottom>
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" gap={2}>

            <TextField
              label="Email ID"
              fullWidth
              className="signup-field"
              {...register('emailId', {
                required: 'Email ID is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email format'
                }
              })}
              error={!!errors.emailId}
              helperText={errors.emailId?.message}
            />

            <TextField
              label="User Name"
              fullWidth
              className="signup-field"
              {...register('userName', {
                required: 'User Name is required',
                minLength: {
                  value: 3,
                  message: 'Must be at least 3 characters'
                }
              })}
              error={!!errors.userName}
              helperText={errors.userName?.message}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              className="signup-field"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Must be at least 6 characters'
                }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <TextField
              label="Phone Number"
              fullWidth
              className="signup-field"
              {...register('phNumber', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Must be 10 digits'
                }
              })}
              error={!!errors.phNumber}
              helperText={errors.phNumber?.message}
            />

            <TextField
              label="Address"
              fullWidth
              className="signup-field"
              {...register('address', {
                required: 'Address is required',
                minLength: {
                  value: 5,
                  message: 'Must be at least 5 characters'
                }
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />

            <Box className="role-options" sx={{ mt: 2 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Want to Register as :
              </Typography>

              <FormControlLabel
                control={
                  <input
                    type="radio"
                    value="user"
                    checked={role === 'user'}
                    onChange={() => handleRoleChange('user')}
                    style={{ marginRight: '8px' }}
                  />
                }
                label="User"
              />

              <FormControlLabel
                control={
                  <input
                    type="radio"
                    value="owner"
                    checked={role === 'owner'}
                    onChange={() => handleRoleChange('owner')}
                    style={{ marginRight: '8px' }}
                  />
                }
                label="Restaurant Owner"
              />

              <Typography variant="body2" color="error">
                {errors.role?.message}
              </Typography>
            </Box>

            <input
              type="hidden"
              {...register('role', { required: 'Role selection is required' })}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="signup-btn"
              disabled={!isValid}
            >
              Sign Up
            </Button>

          </Box>
        </form>
      </Box>

      {/* ✅ Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Successfully registered!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignUpPage;
