import axios from "axios";
const API = import.meta.env.VITE_API_URL;
export const createBike = (bikeData)=>{
  return bikeData
}
export const fetchBikes=async ()=> 
  await axios
    .get(`${API}/bikes/allBikes`, { withCredentials: true })
    .then((res) => res.data);
export const fetchBike= (bikeData)=>{
  return bikeData
}
export const updateBike= (bikeData)=>{
  return bikeData
}
export const deleteBike = (bikeData) => {
  return bikeData;
};