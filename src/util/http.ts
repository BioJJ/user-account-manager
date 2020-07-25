import axios from 'axios';

const http = axios.create({
    baseURL: process.env.VUE_APP_URL_API || `http://localhost:3000` // TODO: Trocar para .env
});

export default http;
