import {useEffect} from "react";
import { useUserStore } from "../../../store/useUserStore";
import { useRentStore } from "../../../store/useRentStore";

import Bike from "./Bike"; // Assuming you have a Bike component to display each rented bike
function RentedBike() {
  const { authUser } = useUserStore();
  const { userRents, getRentedBikeOfUser } = useRentStore();
  useEffect(() => {
    console.log("Rented bike mounted")
    async function fetchRentedBikes() {
      if (authUser?._id) {
        const data = await getRentedBikeOfUser(authUser._id);
        console.log(data);
      }
    }
    fetchRentedBikes();
  }, [authUser]);
  return (
    <div className="w-full">
      {
        userRents.length > 0 ? (
        userRents.map((bike)=>{
          return <Bike key={bike._id} bike={bike} />;
        })
      ) : (
        <div>no bikes rented</div>
      )
      }
    </div>
  );
    
}

export default RentedBike;
