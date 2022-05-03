import axios from 'axios'
import { API_URL } from '../constants'
const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}` }

export const getAllCustomer = (searchObject) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/auth/all/user?page=${searchObject.page}&limit=${searchObject.limit}&keyword=${searchObject.keyword}`,
        headers: headers
    })
}

export const getAllSeller = (searchObject) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/auth/all/seller?page=${searchObject.page}&limit=${searchObject.limit}&keyword=${searchObject.keyword}`,
        headers: headers
    })
}

export const getOneItem = (id) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/auth/customer/${id}`,
        headers: headers
    });
}

export const registerNewUser = (data) => {
    return axios({
        method: 'POST',
        url: `${API_URL}/api/auth/register`,
        data: data,
        headers: headers
    }); 
}

export const updateUser = (data) => {
    return axios({
        method: 'PUT',
        url: `${API_URL}/api/auth/update-user/${data.username}`,
        data: data,
        headers: headers
    }); 
}

export const deleteItem = (id) => {
    return axios({
        method: 'DELETE',
        url: `${API_URL}/api/auth/hide-user/${id}`,
        headers: headers
    });
}

export const updateItem = (data) => {
    return axios.put(
        `${API_URL}/api/auth/${data.id}`,
        data
    )
}
