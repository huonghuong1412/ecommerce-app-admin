import axios from 'axios'
import { API_URL } from '../constants'
const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}` }

export const getAllShipmentMethod = (display) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/shipment/all`,
        headers: headers,
        params: { display: display }
    })
}

export const getOneItem = (id) => {
    return axios.get(`${API_URL}/api/shipment/${id}`);
}

export const deleteItem = (id) => {
    return axios({
        method: 'DELETE',
        url: `${API_URL}/api/shipment/${id}`,
        headers: headers
    });
}

export const checkCode = (id, code) => {
    const config = { params: { id: id, code: code } };
    return axios.get(`${API_URL}/api/shipment/checkCode`, config);
}

export const saveItem = (data) => {
    return axios({
        method: 'POST',
        url: `${API_URL}/api/shipment`,
        data: data,
        headers: headers
    });
}

export const updateItem = (data) => {
    return axios({
        method: 'PUT',
        data: data,
        url:  `${API_URL}/api/shipment/${data.id}`,
        headers: headers
    })
}
