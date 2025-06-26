import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const createRent = async (rentData) => {
  return axios
    .post(`${API}/rent/create`, rentData, { withCredentials: true })
    .then((res) => res.data.data);
};
export const rentCompletion = async (rentData) => {
  return axios
    .post(`${API}/rent/complete`, rentData, { withCredentials: true })
    .then((res) => res.data.data);
};
export const getUserRent = async (userId) => {
  return axios
    .get(`${API}/rent/user/${userId}`, { withCredentials: true })
    .then((res) => res.data.data);
};
