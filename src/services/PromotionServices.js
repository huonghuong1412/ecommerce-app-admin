import axios from 'axios'
import { API_URL } from '../constants'
const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}` }

export const getAllPromotions = (search) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/promotion?page=${search.page}&limit=${search.limit}`,
        headers: headers
    })
}

export const getOneItem = (id) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/promotion/${id}`,
        headers: headers
    });
}

export const deleteItem = (id) => {
    return axios({
        method: 'DELETE',
        url: `${API_URL}/api/promotion/${id}`,
        headers: headers
    });
}

export const saveItem = (promotion) => {
    return axios({
        method: 'POST',
        url: `${API_URL}/api/promotion`,
        data: promotion,
        headers: headers
    });
}

export const updateItem = (promotion) => {
    return axios({
        method: 'PUT',
        url: `${API_URL}/api/promotion/${promotion.id}`,
        data: promotion,
        headers: headers
    })
}
