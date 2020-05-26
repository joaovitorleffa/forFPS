import axios from 'axios';

const api = axios.create({ baseURL: 'https://5335ff9e.ngrok.io' });

export default api;