import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: "https://convoflow-backend.onrender.com/api",
    withCredentials: true
})