import BikesTableView from "./BikesTableVIew.jsx";
import BikesGrid from "./BikesGrid/BikesGrid.jsx";

export default function BikesTableSection() {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6 max-h-max">
        {/* <BikesTableView /> */}
        <BikesGrid/>
      </div>
    </div>
  );
}
