import { useEffect, useState } from 'react';
import { 
  Typography, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody,
  Chip,
  Paper,
  TableContainer,
  CircularProgress,
  Box
} from '@mui/material';
import axios from 'axios';


const OrderHistory = ({ emailId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/api/orders/history/${emailId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [emailId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'warning';
      case 'DELIVERED': return 'success';
      case 'CANCELLED': return 'error';
      case 'CONFIRMED': return 'info';
      case 'PREPARING': return 'secondary';
      case 'READY_FOR_PICKUP': return 'primary';
      case 'COMPLETED': return 'success';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }} className="order-history-wrapper">
      <Typography 
        variant="h5" 
        sx={{ 
          mt: 2, 
          mb: 3, 
          fontWeight: 'bold',
          color: '#6d4966' 
        }}
        className="order-history-title"
      >
        Order History
      </Typography>

      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: 3, 
          boxShadow: 4, 
          background: 'linear-gradient(120deg, #fdf7f4, #f6f0fa)' 
        }}
        className="order-history-table-container"
      >
        <Table>
          <TableHead>
            <TableRow sx={{ background: 'linear-gradient(120deg, #8d6e63, #6d4966)', color: '#fff' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Restaurant</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Items</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Total Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#fff' }}>Order Time</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.orderId} hover sx={{ backgroundColor: '#fffdfd' }}>
                  <TableCell sx={{ py: 2 }}>{order.restaurantName}</TableCell>

                  <TableCell sx={{ py: 2 }}>
                    {order.items.map((item, index) => (
                      <Box key={index}>
                        {item.itemName} × {item.quantity} (₹{item.itemPrice})
                      </Box>
                    ))}
                  </TableCell>

                  <TableCell sx={{ py: 2 }}>₹{order.totalAmount}</TableCell>

                  <TableCell sx={{ py: 2 }}>
                    <Chip
                      label={order.status}
                      color={getStatusColor(order.status)}
                      variant="outlined"
                      sx={{ 
                        fontWeight: 600,
                        minWidth: 110,
                        borderRadius: 2,
                        textTransform: 'capitalize'
                      }}
                      className="order-status-chip"
                    />
                  </TableCell>

                  <TableCell sx={{ py: 2 }}>
                    {new Date(order.orderTime).toLocaleString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                  <Typography color="text.secondary" fontStyle="italic">
                    No orders found in your history
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderHistory;
