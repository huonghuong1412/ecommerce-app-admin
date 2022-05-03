import axios from 'axios'
import { API_URL } from '../constants'
const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}` }

export const getAllBrand = (search) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/brand/all?page=${search.page}&limit=${search.limit}&display=${search.display}`,
        headers: headers
    })
}

export const getOneItem = (id) => {
    return axios.get(`${API_URL}/api/brand/${id}`);
}

export const deleteItem = (id) => {
    return axios({
        method: 'DELETE',
        url: `${API_URL}/api/brand/${id}`,
        headers: headers
    });
}

export const checkCode = (id, code) => {
    const config = { params: { id: id, code: code } };
    return axios.get(`${API_URL}/api/brand/checkCode`, config);
}

export const saveItem = (brand) => {
    return axios({
        method: 'POST',
        url: `${API_URL}/api/brand`,
        data: brand,
        headers: headers
    });
}

export const updateItem = (brand) => {
    return axios({
        method: 'PUT',
        url: `${API_URL}/api/brand/${brand.id}`,
        data: brand,
        headers: headers
    })
}
