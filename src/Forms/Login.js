import { useEffect, useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Login.css';

// Animated Login Button
const AnimatedButton = styled(Button)(({ theme }) => ({
  transition: 'background-color 0.3s, transform 0.2s',
  '&:hover': {
    backgroundColor: theme?.palette?.primary?.dark || '#5D4037',
    transform: 'scale(1.05)',
  },
}));

function LoginPage() {
  const { user, login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors } } = useForm();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token && !user) {
      try {
        const payloadBase64 = token.split('.')[1];
        const decoded = JSON.parse(atob(payloadBase64));
        const now = Date.now() / 1000;
        if (decoded.exp && decoded.exp < now) {
          localStorage.removeItem('jwtToken');
          return;
        }

        const role = decoded.userRole;
        if (role === 'admin') navigate('/admin');
        else if (role === 'owner') navigate('/owner-page');
        else if (role === 'user') navigate('/user-page');
      } catch (e) {
        console.error('Invalid token:', e);
        localStorage.removeItem('jwtToken');
      }
    }
  }, [navigate, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleLogin = async (data) => {
    const { email, password } = data;
    try {
      const response = await axios.post('http://localhost:8080/login', {
        emailId: email,
        password: password,
      });

      const token = response.data;
      if (token) {
        localStorage.setItem('jwtToken', token);

        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        const role = decodedPayload.userRole;
        const userName = decodedPayload.userName;
        const approvalStatus = decodedPayload.approvalStatus;
        const email = decodedPayload.sub;
        const storedPassword = decodedPayload.password;

        console.log('sto',storedPassword)

        if (password !== storedPassword) {
        toast.error('Invalid password!', {
          position: 'top-center',
          style: {
            background: '#ff4d4d',
            color: 'white',
            fontWeight: 'bold',
            fontFamily: 'Poppins, sans-serif',
          },
        });
        setEmail('');
        setPassword('');
        return;
      }

        const success = login(email, password, role, userName);

        if (success) {
          if (approvalStatus !== 'ACCEPTED' && role === 'owner') {
            toast.warning('Your request is under process, kindly wait.', {
              position: 'top-center',
              style: {
                background: '#6d4966',
                color: 'white',
                fontWeight: 'bold',
                fontFamily: 'Poppins, sans-serif',
              },
            });
            setEmail('');
            setPassword('');
            return;
          }

          if (role === 'admin') navigate('/admin');
          else if (role === 'owner') navigate('/owner-page');
          else if (role === 'user') navigate('/user-page');
          else alert('Unknown role');
        } else {
          alert('Login failed!');
        }
      } else {
        alert('Invalid login credentials');
      }
    } catch (error) {
      console.error(error);
      toast.warning('Your request is under process, kindly wait.', {
        position: 'top-center',
        style: {
          background: '#f0f1f6',
          color: '#394b8f',
          fontWeight: 'bold',
          fontFamily: 'Poppins, sans-serif',
        },
      });
      setEmail('');
      setPassword('');
    }
  };

  return (
    <Container className="login-container">
      <Box className="login-form" sx={{ p: 4, borderRadius: 3, boxShadow: 3, bgcolor: 'white', maxWidth: 450, mx: 'auto', mt: 5 }}>
        
        {/* ✅ Back Button INSIDE the form box, aligned to left */}
        <Button
          variant="text"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{
            alignSelf: 'flex-start',
            color: '#1976d2',
            fontWeight: 600,
            textTransform: 'uppercase',
            fontSize: '0.875rem',
            fontFamily: 'Poppins, sans-serif',
            mb: 1,
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline'
            }
          }}
        >
          Back
        </Button>

        <Typography variant="h4" align="center" className="login-title" gutterBottom>
          Login
        </Typography>

        <form onSubmit={handleSubmit(handleLogin)}>
          <TextField
            label="Email"
            fullWidth
            sx={{ mb: 2 }}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: 'Invalid email format',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <AnimatedButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!email || !password}
            style={{ background: '#8d6e63' }}
          >
            Login
          </AnimatedButton>
        </form>
      </Box>
    </Container>
  );
}

export default LoginPage;
