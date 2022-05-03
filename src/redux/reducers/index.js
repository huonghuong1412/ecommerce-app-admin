import ThemeReducer from "./ThemeReducer"
import { combineReducers } from "redux"
import authReducer from './authReducer'
const rootReducer = combineReducers({
    ThemeReducer,
    auth: authReducer
})

export default rootReducer