import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "https://foodbridge-backend-guhe.onrender.com",
})

export default axiosInstance