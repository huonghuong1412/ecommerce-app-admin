import axios from 'axios'
import { API_URL } from '../constants'
const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}` }

export const getAllPaymentMethod = (display) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/payment-method/all`,
        headers: headers,
        params: { display: display }
    })
}

export const getOneItem = (id) => {
    return axios.get(`${API_URL}/api/payment-method/${id}`);
}

export const deleteItem = (id) => {
    return axios({
        method: 'DELETE',
        url: `${API_URL}/api/payment-method/${id}`,
        headers: headers
    });
}

export const checkCode = (id, code) => {
    const config = { params: { id: id, code: code } };
    return axios.get(`${API_URL}/api/payment-method/checkCode`, config);
}

export const saveItem = (data) => {
    return axios({
        method: 'POST',
        url: `${API_URL}/api/payment-method`,
        data: data,
        headers: headers
    });
}

export const updateItem = (data) => {
    return axios({
        method: 'PUT',
        url: `${API_URL}/api/payment-method/${data.id}`,
        data: data,
        headers: headers
    })
}
