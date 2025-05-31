import axios from "axios";
const API = import.meta.env.VITE_API_URL;
export const createBike = (bikeData)=>
  axios
    .post(`${API}/bikes/createBike`, bikeData, { withCredentials: true })
    .then((res) => res.data.data);
export const fetchBikes=async ()=> 
  await axios
    .get(`${API}/bikes/allBikes`, { withCredentials: true })
    .then((res) => res.data);
export const fetchBike= (bikeDaId)=>
  axios
    .get(`${API}/bikes/oneBike/${bikeDaId}`, { withCredentials: true })
    .then((res) => res.data.data);
export const updateBike= (bikeData)=>{
  return bikeData
}
export const deleteBike = (bikeData) => {
  return bikeData;
};