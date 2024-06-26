import axios from "axios";
import { redirect } from "react-router-dom";

const Api = import.meta.env.VITE_API_URL;

const instance = axios.create({
    baseURL: Api,
    timeout: 1000
});

instance.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('token') ?? '';
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        // Gestisci gli errori della risposta qui
        if (error.response) {
            // La richiesta è stata fatta e il server ha risposto con uno status diverso da 2xx
            console.error('Response error:', error.response);
        } else if (error.request) {
            // La richiesta è stata fatta ma nessuna risposta è stata ricevuta
            console.error('Request error:', error.request);
        } else {
            // Qualcosa è andato storto nella configurazione della richiesta
            console.error('Configuration error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default instance;
