/* eslint-disable no-unsafe-optional-chaining */
import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// http.interceptors.response.use(
//   (response) => {
//     if ("message" in response?.data) {
//       console.log(response.data.message);
//     }
//     return response;
//   },
//   (error) => {
//     if ("message" in error?.response?.data) {
//       console.log(error.response.data.message);
//     }
//     return Promise.reject(error);
//   }
// );
export default http;
