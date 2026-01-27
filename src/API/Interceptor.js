import axios from "axios";
import toast from "react-hot-toast";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//  request interceptor
API.interceptors.request.use(
  (config) => {
    console.log("Request sent");
    console.log("URL", config.baseURL + config.url);
    console.log("Method", config.method?.toUpperCase());

    return config;
  },
  (error) => {
    console.log("Error", error.message);
    return Promise.reject(error);
  }
);

//  response
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // silent error for profile check
      return Promise.reject({ status: 401, message: "Unauthorized" });
    }

    if (status === 400) {
      // invalid password etc
      return Promise.reject({
        status: 400,
        message: error.response.data.message,
      });
    }

    if (status === 500) {
      return Promise.reject({
        status: 500,
        message: "Internal Server Error",
      });
    }

    return Promise.reject({
      status: status || 0,
      message: error.response?.data?.message || "Network Error",
    });
  }
);

export const loginapi = async (formdata) => {
  try {
    const response = await API.post("/auth/signin", formdata);
    toast.success(response.data.message);
    return response;
  } catch (err) {
    toast.error(err.message);
  }
};

export const logoutapi = async () => {
  try {
    const response = await API.get("/auth/logOut");
    toast.success(response.data.message);
    return response;
  } catch (err) {
    toast.error(err.message);
  }
};

export const getProfile = async () => {
  try {
    const response = await API.get("/auth/profile");
    return response;
  } catch (err) {
    console.log(err.message);
  }
};

export default API;
