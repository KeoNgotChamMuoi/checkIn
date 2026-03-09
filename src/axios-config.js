import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const ACCESS_TOKEN = "access_token";

export const setCookie = (key, value) => {
    Cookies.set(key, value, { expires: 1/60 });
};

export const getCookie = (key) => {
    return Cookies.get(key);
};

export const clearCookie = () => {
    Object.keys(Cookies.get()).forEach((cookieName) => {
        Cookies.remove(cookieName);
    });
};

export const getAuthorizationHeader = () => `Bearer ${getCookie(ACCESS_TOKEN)}`;

const fetchHandler = axios.create({
  baseURL: "https://ddc.fis.vn/fis0/api",
  timeout: 30000,
  headers: {
    authorization: getAuthorizationHeader(),
    "Cache-Control": "no-cache",
  },
});

fetchHandler.interceptors.request.use(
  (config) => {
    config.headers.Authorization = getAuthorizationHeader();

    return config;
  },
  (err) => {
    console.log(err);
  }
);
export default fetchHandler;

fetchHandler.interceptors.response.use(
  (value) => {
    return value.data;
  },
  (err) => {
    console.log(err);
    toast.error(err.response.message);
  }
);
