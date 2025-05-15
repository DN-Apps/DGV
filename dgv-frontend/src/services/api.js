import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getFirmen = async () => {
    const response = await axios.get(`${API_URL}/firmen`);
    return response.data;
};

export const addBenutzerdaten = async (daten) => {
    const response = await axios.post(`${API_URL}/daten`, daten);
    return response.data;
};
