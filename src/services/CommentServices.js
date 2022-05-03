import axios from 'axios'
import { API_URL } from '../constants'
const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }

export const getAllItem = (searchObject) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/comment/all?page=${searchObject.page}&limit=${searchObject.limit}&keyword=${searchObject.keyword}`,
        headers: headers
    })
}

export const getOneItem = (id) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/comment/${id}`,
        headers: headers
    });
}

// confirm bình luận để hiển thị
export const updateItem = (data) => {
    return axios({
        method: 'PUT',
        url: `${API_URL}/api/comment/confirm/${data.id}`,
        data: data,
        headers: headers
    })
}

// xoa bình luận
export const deleteItem = (id) => {
    return axios({
        method: 'DELETE',
        url: `${API_URL}/api/comment/remove/${id}`,
        headers: headers
    })
}
