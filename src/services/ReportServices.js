import axios from 'axios'
import { API_URL } from '../constants'
const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}` }

// lấy thông tin đặt hàng theo loại
export const getQuantityOrderByStatus = (search) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/report/order/count?last_date=${search.last_date}`,
        headers: headers
    })
}

// top 5 khách hàng đặt hàng nhiều nhất
export const reportCustomerTop5MostBuy = () => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/report/customer?limit=5`,
        headers: headers
    })
}

// thống kê theo ds khách hàng
export const reportAllCustomer = (search) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/report/customer?page=${search.page}&limit=${search.limit}&last_date=${search.last_date}`,
        headers: headers
    })
}

// thong ke theo nhan vien giao hang
export const getListOrderBySeller = (username, searchObject) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/report/seller_list/${username}?page=${searchObject.page}&limit=${searchObject.limit}`,
        headers: headers
    })
}

// lấy thông tin đặt hàng theo loại
export const getQuantityOrderByStatusSeller = (username) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/report/seller/count/${username}`,
        headers: headers
    })
}


// lấy thông tin ds đặt hàng của 1 khách hàng
export const reportAllOrderByCustomer = (customer_id) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/report/customer_all?user=${customer_id}`,
        headers: headers
    })
}

// top 5 sản phẩm bán chạy nhất
export const reportProductTop5MostSold = () => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/report/product?limit=5`,
        headers: headers
    })
}

// Thống kê sản phẩm đã bán
export const reportAllProduct = (search) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/report/product?page=${search.page}&limit=${search.limit}&last_date=${search.last_date}`,
        headers: headers
    })
}

// lấy ds thông tin sản phẩm trong đơn hàng
export const reportAllProductFromOrder = (search) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/report/product-in-order?page=${search.page}&limit=${search.limit}&product=${search.product}`,
        headers: headers
    })
}

// số lượng sản phẩm theo loại
export const getQuantityProductByType = () => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/report/product/count`,
        headers: headers
    })
}

// thống kê số lượng sản phẩm hết hàng trong kho
export const reportProductOutOfStock = (search) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/report/inventory/out-stock?page=${search.page}&limit=${search.limit}`,
        headers: headers
    })
}

// thống kê tỉ lệ bình luận theo số sao
export const reportCommentByRating = () => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/report/comment`,
        headers: headers
    })
}

// thống kê tổng doanh thu, lợi nhuận, tổng tiền nhập hàng
export const reportRevenueAndProfit = (search) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/report/revenue?last_date=${search.last_date}`,
        headers: headers
    })
}

// Thống kê theo danh mục
export const reportByCategory = (search) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/report/category?page=${search.page}&limit=${search.limit}&last_date=${search.last_date}`,
        headers: headers
    })
}

// Thống kê chi tiết theo danh mục
export const reportDetailProductByCategory = (id, search) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/report/category/detail/${id}?page=${search.page}&limit=${search.limit}&last_date=${search.last_date}`,
        headers: headers
    })
}

// Thống kê theo thương hiệu
export const reportByBrand = (search) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/report/brand?page=${search.page}&limit=${search.limit}&last_date=${search.last_date}`,
        headers: headers
    })
}

// Thống kê chi tiết theo thương hiệu
export const reportDetailProductByBrand = (id, search) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/report/brand/detail/${id}?page=${search.page}&limit=${search.limit}&last_date=${search.last_date}`,
        headers: headers
    })
}


// Thống kê theo nhà cung cấp
export const reportBySupplier = (search) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/report/supplier?page=${search.page}&limit=${search.limit}&last_date=${search.last_date}`,
        headers: headers
    })
}

// Thống kê chi tiết theo nhà cung cấp
export const reportDetailProductBySupplier = (id, search) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/report/supplier/detail/${id}?page=${search.page}&limit=${search.limit}&last_date=${search.last_date}`,
        headers: headers
    })
}