import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  CardMedia,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import axios from './PublicAxios';
import {useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import './PublicMain.css';

const cuisines = [
  { name: 'All', image: '/Images/Cuisine/All.jpg' },
  { name: 'Indian', image: '/Images/Cuisine/Indian.jpg' },
  { name: 'Chinese', image: '/Images/Cuisine/Chinese.jpg' },
  { name: 'South Indian', image: '/Images/Cuisine/SouthIndian.jpg' },
  { name: 'Dessert', image: '/Images/Cuisine/Desert.jpg' },
  { name: 'Italian', image: '/Images/Cuisine/Italian.jpg' },
];

const placeholders = [
  'Search by restaurant name',
  'Search by cuisine name',
  'Search by rating',
];

const PublicMain = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCuisine, setFilterCuisine] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCriterion, setSearchCriterion] = useState('restaurantName');
  const [showMessage, setShowMessage] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [darkMode] = useState(false);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const search = searchQuery.toLowerCase() || searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    fetchRestaurants();
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await axios.get('/enabled');
      setRestaurants(res.data);
    } catch (err) {
      console.error('Error fetching restaurant data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRestaurantClick = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const handleSearchCriterionChange = () => {
    const nextCriterion = {
      restaurantName: 'cuisine',
      cuisine: 'rating',
      rating: 'restaurantName',
    };
    setSearchCriterion(nextCriterion[searchCriterion]);
  };

  const filteredRestaurants = restaurants.filter((r) => {
    const cuisine = (r.cuisine || "").toLowerCase();
    const name = (r.restaurantName || "").toLowerCase();
    const rating = r.rating || 0;

    const matchCuisine = filterCuisine === "All" || cuisine.includes(filterCuisine.toLowerCase());
    const matchSearch =
      searchCriterion === 'restaurantName' ? name.includes(search) :
      searchCriterion === 'cuisine' ? cuisine.includes(search) :
      rating.toString().includes(search);

    return matchCuisine && matchSearch;
  });

  // Inline styles for the top image section
  const topImageSectionStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '40px',
    marginBottom: '60px',
  };

  const sideImageBoxStyles = {
 width: '17%',         // approx. 100px wide
  height: '460px', 
    borderRadius: '20px',
    overflow: 'hidden',
    position: 'relative',
  };

  const imageCarouselStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  };

  const imgAnimationStyles = (delay) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0,
    transform: 'translateY(20px)',
    animation: `slideFade 16s infinite`,
    animationDelay: delay,
    borderRadius: '20px',
  });

  const centerImageBoxStyles = {
    width: '60%',
    height: '440px',
    borderRadius: '20px',
    overflow: 'hidden',
    animation: 'centerFloat 6s ease-in-out infinite',
  };

  const centerImageStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '20px',
  };

  const keyframesStyle = `
    @keyframes slideFade {
      0% { opacity: 0; transform: translateY(20px); }
      10%, 25% { opacity: 1; transform: translateY(0); }
      40%, 100% { opacity: 0; transform: translateY(-10px); }
    }

    @keyframes centerFloat {
      0%, 100% { transform: scale(1) translateY(0); }
      50% { transform: scale(1.03) translateY(-10px); }
    }
  `;

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  return (
    <Box className={`public-main-container ${darkMode ? 'dark-mode' : ''}`}>
      <style>{keyframesStyle}</style>

      {/* Top Image Section */}
      <Box sx={topImageSectionStyles}>
        <Box sx={sideImageBoxStyles}>
          <div style={imageCarouselStyles}>
            {['PM1', 'PM2', 'PM3', 'PM4'].map((img, i) => (
              <img
                key={i}
                src={`/Images/PublicMain/${img}.jpg`}
                alt={`img${i + 1}`}
                style={imgAnimationStyles(`${i * 4}s`)}
              />
            ))}
          </div>
        </Box>

        <Box sx={centerImageBoxStyles}>
          <img
            src="/Images/PublicMain/center.jpg"
            alt="center-visual"
            style={centerImageStyles}
          />
        </Box>

        <Box sx={sideImageBoxStyles}>
          <div style={imageCarouselStyles}>
            {['PM2', 'PM3', 'PM4', 'PM1'].map((img, i) => (
              <img
                key={i}
                src={`/Images/PublicMain/${img}.jpg`}
                alt={`img${i + 5}`}
                style={imgAnimationStyles(`${i * 4}s`)}
              />
            ))}
          </div>
        </Box>
      </Box>

      {/* Cuisine Filter */}
   <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '60px', // increased spacing
    mt: 10,
    mb: 10,
  }}
>
  {cuisines.map((cuisine) => (
    <Box
      key={cuisine.name}
      onClick={() => setFilterCuisine(cuisine.name)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        transform:
          cuisine.name === filterCuisine ? 'scale(1.1)' : 'scale(1)',
        '&:hover': {
          transform: 'scale(1.1)',
        },
      }}
    >
      <img
        src={cuisine.image}
        alt={cuisine.name}
        style={{
          width: '110px',
          height: '110px',
          borderRadius: '50%',
          border: '4px solid #ccc',
          objectFit: 'cover',
          transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s',
          boxShadow:
            cuisine.name === filterCuisine
              ? '0 0 12px rgba(255, 255, 255, 0.6)'
              : '0 0 6px rgba(0,0,0,0.3)',
          borderColor:
            cuisine.name === filterCuisine ? '#8d6e63' : '#ccc',
        }}
      />
      <Typography
        variant="body1"
        sx={{
          mt: 2,
          fontSize: '18px',
          fontWeight: cuisine.name === filterCuisine ? 700 : 600,
          color: cuisine.name === filterCuisine ? '#6d4966' : '#444',
        }}
      >
        {cuisine.name}
      </Typography>
    </Box>
  ))}
</Box>

      {/* Search Bar */}
      <Box className="search-button-container">
        <TextField
          variant="outlined"
          placeholder={placeholders[placeholderIndex]}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearchCriterionChange}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

<Grid
  container
  spacing={4}
  sx={{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '30px',
  }}
>
  {filteredRestaurants.map((restaurant) => (
    <Grid item xs={12} sm={6} md={4} key={restaurant.resid} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card
        onClick={handleRestaurantClick}
        sx={{
          width: 400,
          height: 460,
          borderRadius: '25px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          boxShadow: '2px 4px 15px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.03)',
          },
          backgroundColor: '#fff',
        }}
      >
        <CardMedia
          component="img"
          height="250"
          image={`data:image/jpeg;base64,${restaurant.restaurantImage}`}
          alt={restaurant.restaurantName}
          sx={{
            objectFit: 'cover',
            height: 250,
          }}
          onError={(e) => {
            e.currentTarget.src = 'https://source.unsplash.com/400x250/?restaurant,food';
          }}
        />
        <CardContent
          sx={{
            padding: '14px !important',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" sx={{ fontSize: 22, fontWeight: 700, color: '#333' }}>
            {restaurant.restaurantName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            📍 {restaurant.address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ⭐ {restaurant.rating} / 5
          </Typography>
          <Typography variant="body2" color="text.secondary">
            🍴 Cuisine: {restaurant.cuisine}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

      {/* Login Prompt */}
      {showMessage && (
        <Box className="message-box">
          <Typography variant="h6" className="message-text">
            😊 For more details kindly Login
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PublicMain;
