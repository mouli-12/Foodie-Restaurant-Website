// Create Restaurant
export const createRestaurant = (restaurant) => {
    return axios.post('/api/restaurants/add', restaurant);
  };
  
  // Update Restaurant
  export const updateRestaurant = (resid, restaurant) => {
    return axios.put(`/api/restaurants/${resid}`, restaurant);
  };
  
  // Get All Restaurants
  export const getAllRestaurants = () => {
    return axios.get('/api/restaurants');
  };
  
  // Get Restaurant by ID
  export const getRestaurant = (resid) => {
    return axios.get(`/api/restaurants/${resid}`);
  };
  
  // Delete Restaurant
  export const deleteRestaurant = (resid) => {
    return axios.delete(`/api/restaurants/${resid}`);
  };
  
  // Get Enabled Restaurants
  export const getEnabledRestaurants = () => {
    return axios.get('/api/restaurants/enabled');
  };
  
  // Toggle Restaurant Visibility
  export const toggleRestaurantVisibility = (id, enabled) => {
    return axios.put(`/api/restaurants/${id}/toggle?enabled=${enabled}`);
  };