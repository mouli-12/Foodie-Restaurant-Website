import { useEffect, useState } from 'react';
import { Container, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import axios from 'axios';

const AdminApprovalPage = () => {
  const [pendingUsers, setPendingUsers] = useState([]);

  const fetchPendingUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/pending-owners');
      setPendingUsers(response.data);
    } catch (error) {
      console.error('Error fetching pending users', error);
      
    }
  };

  console.log("pending users",pendingUsers);
  const approveUser = async (userId) => {
    try {
      await axios.put(`http://localhost:8080/update-approval/${userId}`, null, {
        params: { status: 'ACCEPTED' } // Adding status parameter
      });
      alert('User Approved Successfully!');
      fetchPendingUsers(); // Refresh the list
    } catch (error) {
      console.error('Error approving user', error);
    }
  };

  const rejectUser = async (userId) => {
    try {
      await axios.put(`http://localhost:8080/update-approval/${userId}`, null, {
        params: { status: 'DECLINED' } // Adding status parameter
      });
      alert('User Rejected Successfully!');
      fetchPendingUsers(); // Refresh the list
    } catch (error) {
      console.error('Error rejecting user', error);
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  return (
    <Container
      sx={{
        mt: 5,
        background: 'linear-gradient(to right,rgb(169, 145, 136),rgb(152, 118, 145))',
        padding: 4,
        borderRadius: 4,
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
        animation: 'fadeIn 0.6s ease-in-out',
        '@keyframes fadeIn': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        }
      }}
    >
      {pendingUsers.length === 0 ? (
        <Typography variant="h6" align="center" color="white">
          No pending users for approval.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {pendingUsers.map((user) => (
            <Grid item xs={12} md={6} key={user.id}>
              <Card variant="outlined" sx={{ borderRadius: 3, boxShadow: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>
                    Username: {user.userName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Email: {user.emailId}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Role: {user.role}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Status: {user.status}
                  </Typography>

                  <div style={{ marginTop: '15px' }}>
                    <Button
                      variant="contained"
                      color="success"
                      sx={{
                        mr: 2,
                        background: '#4caf50',
                        '&:hover': { backgroundColor: '#388e3c' }
                      }}
                      onClick={() => approveUser(user.emailId)}
                    >
                      Approve
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      sx={{
                        background: '#f44336',
                        '&:hover': { backgroundColor: '#d32f2f' }
                      }}
                      onClick={() => rejectUser(user.emailId)}
                    >
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default AdminApprovalPage;
