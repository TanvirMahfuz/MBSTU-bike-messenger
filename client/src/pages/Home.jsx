import React from "react";
import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import BikesTableSection from "../components/home/BikesTableSection";
import AddBikeModal from "../components/bikes/AddBikeForm/AddBikeModal";
function Home() {
  const [openModal, setOpenModal] = React.useState(false);
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {openModal && (
        <AddBikeModal onClose={() => setOpenModal(false)}/>
      )}
      <div className="max-w-7xl mx-auto">
        <HeroSection {...{ openModal, setOpenModal }} />
        {/* <StatsSection /> */}
        <BikesTableSection />
      </div>
    </div>
  );
}

export default Home;
