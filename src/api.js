import axios from "axios";
import Cookies from 'js-cookie';

const baseUrl = "https://aa-solutions.tech/api";

//request interceptor to add the auth token header to requests
axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["x-auth-token"] = accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    let refreshToken = Cookies.get('refreshToken');
    if (error.response.status === 404){
      return error
    };
    if (
      refreshToken &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      console.log('here');
      originalRequest._retry = true;
      return axios
        .get(`${baseUrl}/auth/token`)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("accessToken", res.data.accessToken);
            console.log("Access token refreshed!");
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);

//functions to make api calls

const api = {
  signup: (body) => {
    return axios.post(`${baseUrl}/auth/signup`, body);
  },
  login: (body) => {
    return axios.post(`${baseUrl}/auth/login`, body);
  },
  getToken: () => {
    return axios.get(`${baseUrl}/auth/token`);
  },
  refreshToken: (body) => {
    return axios.post(`${baseUrl}/auth/refresh_token`, body);
  },
  logout: (body) => {
    return axios.delete(`${baseUrl}/auth/logout`, body);
  },
  getProtected: () => {
    return axios.get(`${baseUrl}/protected_resource`);
  },
  getUser: () => {
    return axios.get(`${baseUrl}/auth/user`);
  }
};

export default api;
