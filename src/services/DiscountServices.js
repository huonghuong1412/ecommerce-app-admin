import axios from 'axios'
import {API_URL} from '../constants'
const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}` }

export const getAllProductDiscount = (searchObject) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/product_discount/search?page=${searchObject.page}&limit=${searchObject.limit}&keyword=${searchObject.keyword}`,
        headers: headers
    })
}

export const getOneDiscountItem = (id) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/product_discount/${id}`,
        headers: headers
    });
}

export const updateDiscountProduct = (data) => {
    return axios({
        method: "PUT",
        url: `${API_URL}/api/product_discount/${data.id}`,
        data: data,
        headers: headers
    })
}

export const deleteDiscountProduct = (product_id) => {
    return axios({
        method: "DELETE",
        url: `${API_URL}/api/product_discount/${product_id}`,
        headers: headers
    })
}