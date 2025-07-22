import axios from 'axios';

const publicAxios = axios.create({
  baseURL: 'http://localhost:9090/api/restaurants', 
});

export default publicAxios;
