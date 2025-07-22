import React from 'react';
import { Container, Typography, Tabs, Tab, Box } from '@mui/material';
import AdminHeader from './AdminHeader';
import CustomersPage from './CustomersPage';
import RestaurantsPage from './RestaurantsPage';
import ApprovalsPage from './ApprovalsPage';
import './AdminPanel.css'; // Import CSS styles

function AdminPanel() {
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <>
      <AdminHeader />
      <Container className="admin-container">
        <Typography variant="h4" align="center" className="admin-title">
          WELCOME ADMIN
          
        </Typography>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          centered
          textColor="primary"
          indicatorColor="primary"
          className="admin-tabs"
        >
          <Tab label="Customers" className="admin-tab" />
          <Tab label="Restaurants" className="admin-tab" />
          <Tab label="Approvals" className="admin-tab" />
        </Tabs>
        <Box className="admin-tab-content">
          {tab === 0 && <CustomersPage />}
          {tab === 1 && <RestaurantsPage />}
          {tab === 2 && <ApprovalsPage />}
        </Box>
      </Container>
    </>
  );
}

export default AdminPanel;
