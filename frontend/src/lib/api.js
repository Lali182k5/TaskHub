import axios from "axios";

const getBaseUrl = () => {
  const envBase = import.meta.env.VITE_API_BASE_URL;
  if (envBase) return `${envBase.replace(/\/$/, "")}/api`;
  return "/api";
};

export const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiErrorMessage = (err) => {
  return (
    err?.response?.data?.message ||
    err?.message ||
    "Something went wrong"
  );
};
