import { useEffect } from "react";
import { useBikeStore } from "../../store/useBikeStore";

function BikesTableViewTemp() {
  const { bikes, fetchAllBikes } = useBikeStore();

  useEffect(() => {
    const getAllBikes = async () => {
      try {
        await fetchAllBikes();
        console.log("Bikes fetched successfully");
      } catch (error) {
        console.error("Failed to fetch bikes:", error);
      }
    };
    getAllBikes();
  }, [fetchAllBikes]);

  useEffect(() => {
    if (bikes.length > 0) {
      console.log("Updated bikes:", bikes);
    }
  }, [bikes]);

  return <div>BikesTableViewTemp</div>;
}

export default BikesTableViewTemp;
