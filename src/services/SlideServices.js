import axios from 'axios'
import { API_URL } from '../constants'
const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}` }

export const getAllSlide = (search) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/slide?page=${search.page}&limit=${search.limit}`,
        headers: headers
    })
}

export const getOneItem = (id) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/slide/${id}`,
        headers: headers
    });
}

export const deleteItem = (id) => {
    return axios({
        method: 'DELETE',
        url: `${API_URL}/api/slide/${id}`,
        headers: headers
    });
}

export const saveItem = (slide) => {
    return axios({
        method: 'POST',
        url: `${API_URL}/api/slide`,
        data: slide,
        headers: headers
    });
}

export const updateItem = (slide) => {
    return axios({
        method: 'PUT',
        url: `${API_URL}/api/slide/${slide.id}`,
        data: slide,
        headers: headers
    })
}
