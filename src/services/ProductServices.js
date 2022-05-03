import axios from 'axios'
import {API_URL} from '../constants'
const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}` }

// export const getProductByCategory = (searchObject, category, subcategory) => {
//     return axios.get(`${API_URL}/api/product/danh-muc/${category}/${subcategory}?page=${searchObject.page}&limit=${searchObject.limit}&keyword=${searchObject.keyword}`)
// }

export const getAllProduct = (searchObject) => {    // page, limit, name, sku, category, brand, display
    return axios({
        method: 'GET',
        url: `${API_URL}/api/product/get/all?page=${searchObject.page}&limit=${searchObject.limit}&name=${searchObject.name}&sku=${searchObject.sku}&category=${searchObject.category}&brand=${searchObject.brand}&display=${searchObject.display}`,
        headers: headers
    })
}

export const getProductByCategory = (searchObject) => {
    return axios.get(`${API_URL}/api/product/danh-muc/${searchObject.category}?page=${searchObject.page}&limit=${searchObject.limit}&keyword=${searchObject.name}&sku=${searchObject.sku}&category=${searchObject.category}&brand=${searchObject.brand}&display=${searchObject.display}`)
}

export const getOneItem = (id) => {
    return axios.get(`${API_URL}/api/product/detail/${id}`);
}

export const getProductById = (id) => {
    return axios.get(`${API_URL}/api/product/san-pham/${id}`);
}

export const deleteItem = (id) => {
    return axios({
        method: 'DELETE',
        url: `${API_URL}/api/product/${id}`,
        headers: headers
    });
}

export const checkCode = (id, code) => {
    const config = { params: { id: id, code: code } };
    return axios.get(`${API_URL}/api/product/checkCode`, config);
}

export const addProduct = (data) => {
    return axios({
        method: 'POST',
        url: `${API_URL}/api/product/add-product`,
        data: data,
        headers: headers
    });
}

export const updateProduct = (data) => {
    return axios({
        method: 'PUT',
        url: `${API_URL}/api/product/update-product/${data.id}`,
        data: data,
        headers: headers
    })
}
