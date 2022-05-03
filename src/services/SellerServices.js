import axios from 'axios'
import { API_URL } from '../constants'
const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}` }

export const getListOrder = (searchObject) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/order/seller?page=${searchObject.page}&limit=${searchObject.limit}&last_date=${searchObject.last_date}&status=${searchObject.status}`,
        headers: headers
    })
}

// lấy thông tin đặt hàng theo loại
export const getQuantityOrderByStatus = (search) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/report/seller/count?last_date=${search.last_date}`,
        headers: headers
    })
}
