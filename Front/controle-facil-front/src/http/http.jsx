import axios from 'axios';

const token = localStorage.getItem('token');

const http = axios.create({
  baseURL: 'https://localhost:7238',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default http;