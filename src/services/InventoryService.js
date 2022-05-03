import axios from 'axios'
import {API_URL} from '../constants'
const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}` }

export const getProductsFromInventory = (searchObject) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/inventory/search/${searchObject.category}?page=${searchObject.page}&limit=${searchObject.limit}&keyword=${searchObject.keyword}`,
        headers: headers
    })
}

export const getListByProduct = (id) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/inventory/product/${id}`,
        headers: headers
    })
}

export const getAllColorNotExsistProduct = (id) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/inventory/not-exsist-color/${id}`,
        headers: headers
    });

}
export const getDetailImport = (id) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/inventory/detail/${id}`,
        headers: headers
    });
}

export const importProduct = (data) => {
    return axios({
        method: 'POST',
        url: `${API_URL}/api/inventory/import-product`,
        data: data,
        headers: headers
    });
}

export const getOneImportItem = (id) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/inventory/${id}`,
        headers: headers
    });
}

export const updateImportProduct = (data) => {
    return axios({
        method: "PUT",
        url: `${API_URL}/api/inventory/import-product/${data.id}`,
        data: data,
        headers: headers
    })
}


export const cancelSellProduct = (id) => {
    return axios({
        method: "DELETE",
        url: `${API_URL}/api/inventory/cancel-sell-product/${id}`,
        headers: headers
    })
}
