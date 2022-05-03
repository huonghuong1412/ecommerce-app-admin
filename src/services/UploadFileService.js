import axios from 'axios'
import { API_URL } from '../constants'
const token = localStorage.getItem('token');
// const headers = { Authorization: `Bearer ${token}` }

// export const uploadImage = (file) => {
//     return axios.post(`${API_URL}/api/upload/image?File=`, file)
// }

export const uploadImage = (files) => {
    const url = `${API_URL}/api/upload/image/product`;
    let formData = new FormData();
    for(let i = 0; i< files.length; i++) {
      formData.append('File', files[i]);
    }
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    }
    return axios.post(url, formData, config)
  }
  

export const uploadImageSlide = (file) => {
    const url = `${API_URL}/api/upload/image`;
    let formData = new FormData();
    formData.append('File', file[0]);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    }
    return axios.post(url, formData, config)
  }
  