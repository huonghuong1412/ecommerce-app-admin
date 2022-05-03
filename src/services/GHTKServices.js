import axios from 'axios'
import {API_URL} from '../constants'
export const printInvoiceGHTK = (id) => {
    return axios({
        method: 'GET',
        url: `${API_URL}/api/services/ship/ghtk/print-invoice/${id}`
    })
}

export const createOrderGHTK = (data) => {
    return axios({
        method: 'POST',
        url: `${API_URL}/api/services/ship/ghtk/create-order/${data.id}`,
    })
}
