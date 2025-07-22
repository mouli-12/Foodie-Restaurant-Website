import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function AboutUs() {
  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ color: "#8D6E63", fontWeight: 700 }}>
          About Foodie
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
          Welcome to <strong>Foodie</strong> – your ultimate destination for discovering and ordering delicious food
          from your favorite local restaurants. We are passionate about connecting food lovers with amazing meals,
          offering a seamless and joyful food delivery experience across the city.
        </Typography>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, backgroundColor: "#f9f4f2", borderRadius: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ color: "#8D6E63" }}>
                Our Mission
              </Typography>
              <Typography variant="body2">
                At Foodie, our mission is to make great food accessible to everyone, anytime and anywhere.
                We empower local restaurant owners while delivering happiness to customers one bite at a time.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, backgroundColor: "#f9f4f2", borderRadius: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ color: "#8D6E63" }}>
                Why Choose Us?
              </Typography>
              <Typography variant="body2">
                We provide a curated list of top-rated eateries, fast delivery, and secure payment options.
                With an intuitive interface and real-time tracking, your next meal is just a click away.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="h5" gutterBottom sx={{ color: "#8D6E63" }}>
            Join the Foodie Family!
          </Typography>
          <Typography variant="body2">
            Whether you're a hungry customer or a restaurant owner, Foodie is built to serve you better.
            Sign up today and experience food ordering the way it should be – fast, fresh, and fun!
          </Typography>
        </Box>

        <Box mt={3}>
          <Button
            variant="outlined"
            component={Link} // Add Link component here
            to="/" // Link to the home page or the previous page
            sx={{
              color: "#8D6E63",
              borderColor: "#8D6E63",
              '&:hover': {
                borderColor: "#6E534B",
                color: "#6E534B"
              }
            }}
          >
            Back
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
