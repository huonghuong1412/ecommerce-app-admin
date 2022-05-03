// export const API_URL = "http://localhost:8080"
export const API_URL = process.env.REACT_APP_BASE_URL;
export const IMAGE_FOLDER = `${API_URL}/images/product/`
// export const API_URL_WEB = "https://shielded-sea-59884.herokuapp.com"

// AUTH
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const GET_ERRORS = 'GET_ERRORS';