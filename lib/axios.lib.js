const axios = require('axios');
const axiosInstance = axios.create({
    baseURL: process.env.TMDB_BASE_URL,
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
    }
});

module.exports = axiosInstance;