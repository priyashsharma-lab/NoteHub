import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000
});
axiosInstance.interceptors.response.use
(
    (response)=> response,

    (error)=> 
        {
            const status=error.response?.status;
            if (!error.response)
            {
                console.log("Cannot Reach Backend- Network Error");
            }
            if (status===500)
            {
                console.log("Internal Server Error - 500 ");
            }
            if (status===503)
            {
                console.log("Service Unavilable");
            }
            return Promise.reject(error);
        }
);
export default axiosInstance;