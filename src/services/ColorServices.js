import axios from 'axios'
import { API_URL } from '../constants'
const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}` }

export const getAll = (search) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/color/all?page=${search.page}&limit=${search.limit}`,
        headers: headers
    })
}

export const getOneItem = (id) => {
    return axios.get(`${API_URL}/api/color/${id}`);
}

export const deleteItem = (id) => {
    return axios({
        method: 'DELETE',
        url: `${API_URL}/api/color/${id}`,
        headers: headers
    });
}

export const checkCode = (id, code) => {
    const config = { params: { id: id, code: code } };
    return axios.get(`${API_URL}/api/color/checkCode`, config);
}

export const saveItem = (data) => {
    return axios({
        method: 'POST',
        url: `${API_URL}/api/color`,
        data: data,
        headers: headers
    });
}

export const updateItem = (data) => {
    return axios({
        method: 'PUT',
        url: `${API_URL}/api/color/${data.id}`,
        data: data,
        headers: headers
    })
}
