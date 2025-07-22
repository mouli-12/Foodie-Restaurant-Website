import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function AdminHeader() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#3f51b5', boxShadow: 'none' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontFamily: 'Poppins, sans-serif', fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Foodie
        </Typography>
        <Box display="flex" alignItems="center">
  <Box display="flex" alignItems="center" mr={3}>
    <AccountCircleIcon sx={{ fontSize: 28, mr: 1 }} />
    <Button
      color="inherit"
      sx={{
        textTransform: 'none',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 500,
        padding: 0, // Remove extra padding for tighter look
        minWidth: 0, // Prevents unnecessary width
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.11)',
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
      </Toolbar>
    </AppBar>
  );
}

export default AdminHeader;
