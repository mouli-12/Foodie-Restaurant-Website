import { useEffect, useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from '@mui/material';
import axios from 'axios';

function CustomersPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/users');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        background: 'linear-gradient(to right,rgb(191, 172, 187),rgb(157, 166, 195),rgb(171, 151, 144))',
        borderRadius: 4,
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
        minHeight: '100vh',
        animation: 'fadeIn 0.6s ease-in-out',
        '@keyframes fadeIn': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        }
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          textAlign: 'center',
          color: 'black',
          mb: 3
        }}
      >
        👥 Customer List
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background: 'linear-gradient(to right, #8d6e63, #6d4966)'
              }}
            >
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Email ID</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Address</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Phone Number</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Role</TableCell>
              <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>User Name</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {customers.map((customer, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f4f4f4'
                  },
                  transition: 'background-color 0.3s ease'
                }}
              >
                <TableCell>{customer.emailId}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.phNumber}</TableCell>
                <TableCell>{customer.role}</TableCell>
                <TableCell>{customer.userName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default CustomersPage;
