import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Paper
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function ContactUs() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Contact form submitted:", data);
    alert("Thank you for contacting us! We'll get back to you soon.");
    reset();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ color: "#8D6E63", fontWeight: 700 }}>
          Contact Us
        </Typography>

        <Typography variant="body1" align="center" sx={{ mb: 4 }}>
          We'd love to hear from you! Whether you have a question about our services, need help, or just want to give feedback.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6" gutterBottom sx={{ color: "#8D6E63" }}>
                Contact Information
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                📧 Email: support@foodieapp.com
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                ☎ Phone: +91-9876543210
              </Typography>
              <Typography variant="body2">
                📍 Address: 123 Food Street, Flavor Town, India
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Your Name"
                fullWidth
                variant="outlined"
                {...register("name", { required: true })}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Your Email"
                type="email"
                fullWidth
                variant="outlined"
                {...register("email", { required: true })}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Message"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                {...register("message", { required: true })}
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#8D6E63",
                  color: "#fff",
                  '&:hover': {
                    backgroundColor: "#6E534B"
                  }
                }}
              >
                Send Message
              </Button>
            </form>
          </Grid>
        </Grid>

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
