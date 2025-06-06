import axios from "axios";

const API = import.meta.env.VITE_API_URL;


export const loginUser = (email, password) =>
  axios.post(
    `${API}/user/log-in`,
    { email, password },
    { withCredentials: true }
  ).then((res) => res.data);
export const logoutUser = () =>
  axios
    .get(`${API}/user/log-out`, { withCredentials: true })
    .then((res) => res.data);
export const checkUser = () =>
    axios
      .get(
        `${API}/user/check`, { withCredentials: true }
      )
      .then((res) => res.data);

export const fetchProfile = (token) =>
  axios
    .get(`${API}/user/profile`, {
      withCredentials:true
    })
    .then((res) => res.data);
