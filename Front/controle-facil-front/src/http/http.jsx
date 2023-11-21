import axios from 'axios';


const http = axios.create({
  baseURL: 'https://localhost:7238',
});

export default http;