import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  CircularProgress
} from '@mui/material';
import Navbar from '../Navbar';

function OwnerOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user || user.role !== 'owner') {
      navigate('/login');
    } else {
      fetchOrders();
    }
  }, [user, navigate, statusFilter]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      let url = `http://localhost:9090/api/orders/owner`;

      if (statusFilter === 'ALL') {
        url += `?ownerEmail=${user.email}`;
      } else {
        url += `/status?ownerEmail=${user.email}&status=${statusFilter}`;
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('jwtToken');
      await axios.put(
        `http://localhost:9090/api/orders/${orderId}/status?status=${newStatus}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOrders(); // Refresh orders after update
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'warning';
      case 'DELIVERED': return 'success';
      case 'CANCELLED': return 'error';
      default: return 'default';
    }
  };

  return (
    <>
      <Typography
      variant="h5"
      align="center"
      sx={{ color: '#444', mb: 4, mt: 2 }}
       >
      Welcome, {user.userName || 'Owner'}! Manage your restaurants below.
    </Typography>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Restaurant Ordersss
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Filter by Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Filter by Status"
              >
                <MenuItem value="ALL">All Orders</MenuItem>
                <MenuItem value="PENDING">Pending</MenuItem>
                <MenuItem value="DELIVERED">Delivered</MenuItem>
                <MenuItem value="CANCELLED">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {loading ? (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : orders.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Restaurant</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Order Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.orderId}>
                    <TableCell>{order.orderId.substring(0, 8)}...</TableCell>
                    <TableCell>{order.emailId}</TableCell>
                    <TableCell>{order.restaurantName}</TableCell>
                    <TableCell>
                      {order.items?.map((item, index) => (
                        <div key={index}>
                          {item.quantity} x {item.itemName} (₹{item.itemPrice})
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>₹{order.totalAmount}</TableCell>
                    <TableCell>{new Date(order.orderTime).toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip label={order.status} color={getStatusColor(order.status)} />
                    </TableCell>
                    <TableCell>
                      {order.status === 'PENDING' && (
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => handleStatusChange(order.orderId, 'DELIVERED')}
                        >
                          Mark as Delivered
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mt: 3 }}>
            No orders found for your restaurants.
          </Typography>
        )}
      </Container>
    </>
  );
}

export default OwnerOrdersPage;
