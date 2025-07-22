// Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Tabs, Tab, Box } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = ({ currentTab, setCurrentTab }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/login');
    setTimeout(() => logout(), 0);
};

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const isUserPage = user?.role === 'user' && location.pathname === '/user-page';

  return (
    <AppBar position={user?.role === 'owner' ? 'fixed' : 'static'}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1,color:"white" }}>
          Foodie
        </Typography>

        {isUserPage && (
          <Tabs
  value={currentTab}
  onChange={handleTabChange}
  textColor="inherit"
  indicatorColor="secondary"
  sx={{ display: 'flex', alignItems: 'center' }}
>
  <Tab label="Restaurants" />
  <Tab label="Cart" />
  <Tab label="Order History" />
  <Tab
  label={
    <Box display="flex" alignItems="center" gap={1}>
      <AccountCircleIcon sx={{ fontSize: 20 }} />
      <Typography sx={{ fontFamily: 'Poppins, sans-serif',color:"white" }}>
        {user.userName}
      </Typography>
      <LogoutIcon sx={{ fontSize: 20 }} />
      <Typography sx={{ fontFamily: 'Poppins, sans-serif',color:"white" }}>
        Logout
      </Typography>
    </Box>
  }
  onClick={handleLogout}
  sx={{
    textTransform: 'none',
    fontWeight: 500,
    minHeight: '48px',
    '&:hover': {
      backgroundColor: 'rgba(255, 252, 252, 0.1)',
    },
  }}
/>

</Tabs>
        )}

        {!user ? (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/signup">Signup</Button>
          </>
        ) : (
          <>
            {user.role === 'admin' && (
              <Button color="inherit" component={Link} to="/admin">Admin Panel</Button>
            )}
            {user.role === 'user' && !isUserPage && (
              <Button color="inherit" component={Link} to="/user-page">User Home</Button>
            )}
            {user.role === 'owner' && (
              <Box display="flex" alignItems="center">
                <Box display="flex" alignItems="center" mr={3}>
                  <AccountCircleIcon sx={{ fontSize: 28, mr: 1 }} />
                  <Button
                    color="inherit"
                    sx={{
                      textTransform: 'none',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 500,
                      padding: 0,
                      minWidth: 0,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 252, 252, 0.1)',
                      },
                    }}
                  >
                    Hi, {user.userName}
                  </Button>
                </Box>

                <Button
                  color="inherit"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogout}
                  sx={{
                    textTransform: 'none',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 252, 252, 0.1)',
                    },
                  }}
                >
                  Logout
                </Button>
              </Box>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
