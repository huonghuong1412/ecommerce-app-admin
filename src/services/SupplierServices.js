import axios from 'axios'
import { API_URL } from '../constants'
const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}` }

export const getAllSupplier = (search) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/supplier/all?page=${search.page}&limit=${search.limit}&display=${search.display}`,
        headers: headers
    })
}

export const getOneItem = (id) => {
    return axios.get(`${API_URL}/api/supplier/${id}`);
}

export const deleteItem = (id) => {
    return axios({
        method: 'DELETE',
        url: `${API_URL}/api/supplier/${id}`,
        headers: headers
    });
}

export const checkCode = (id, code) => {
    const config = { params: { id: id, code: code } };
    return axios.get(`${API_URL}/api/supplier/checkCode`, config);
}

export const saveItem = (supplier) => {
    return axios({
        method: 'POST',
        url: `${API_URL}/api/supplier`,
        data: supplier,
        headers: headers
    });
}

export const updateItem = (supplier) => {
    return axios({
        method: 'PUT',
        url: `${API_URL}/api/supplier/${supplier.id}`,
        data: supplier,
        headers: headers
    })
}
