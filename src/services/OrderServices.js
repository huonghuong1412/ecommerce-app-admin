import axios from 'axios'
import { API_URL } from '../constants'
const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}` }

export const getListOrder = (searchObject) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/order/all?page=${searchObject.page}&limit=${searchObject.limit}&last_date=${searchObject.last_date}&status=${searchObject.status}`,
        headers: headers
    })
}

export const getDetailOrderById = (id) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/order/detail-full/${id}`,
        headers: headers
    });
}

// xu ly don hang
export const confirmOrder = (id) => {
    return axios({
        method: 'PUT',
        url: `${API_URL}/api/order/confirm/${id}`,
        headers: headers
    })
}

export const shippingOrder = (id, order_code) => {
    return axios({
        method: 'PUT',
        url: `${API_URL}/api/order/is-shipping/${id}`,
        params: {order_code: order_code},
        headers: headers
    })
}

export const cancelOrder = (id) => {
    return axios({
        method: 'PUT',
        url: `${API_URL}/api/order/cancel/${id}`,
        headers: headers
    })
}