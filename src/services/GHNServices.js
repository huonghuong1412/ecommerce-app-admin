import axios from 'axios'
import {API_URL} from '../constants'
const token = process.env.REACT_APP_GHN_TOKEN;
const shopid = process.env.REACT_APP_GHN_SHOPID;
const headers = { token: token, shopid: shopid, 'Content-Type': 'application/json' };

export const createOrderGHN = (data) => {
    return axios({
        method: 'POST',
        url: `${API_URL}/api/services/ship/ghn/create-order/${data.id}`,
        params: {weight: data.weight, length: data.length, width: data.width, height: data.height},
        headers: headers
    })
}

export const getTokenPrintBill = (data) => {
    return axios({
        method: 'POST',
        data: data,
        url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/a5/gen-token',
        headers: headers
    })
}