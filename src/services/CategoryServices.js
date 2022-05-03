import axios from 'axios'
import { API_URL } from '../constants'
const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}` }

export const getAllCategory = (search) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/category/all?page=${search.page}&limit=${search.limit}&display=${search.display}`,
        headers: headers
    })
}

export const getOneCategoryById = (id) => {
    return axios.get(`${API_URL}/api/category/${id}`);
}

export const deleteCategory = (id) => {
    return axios({
        method: 'DELETE',
        url: `${API_URL}/api/category/${id}`,
        headers: headers
    });
}

export const checkCode = (id, code) => {
    const config = { params: { id: id, code: code } };
    return axios.get(`${API_URL}/api/category/checkCode`, config);
}

export const saveCategory = (category) => {
    return axios({
        method: 'POST',
        url: `${API_URL}/api/category`,
        data: category,
        headers: headers
    })
}

export const updateCategory = (category) => {
    return axios({
        method: 'PUT',
        url: `${API_URL}/api/category/${category.id}`,
        data: category,
        headers: headers
    })
}
