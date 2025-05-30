import BikesTableView from "./BikesTableVIew.jsx";
import BikesTableViewTemp from "./BikesTableViewTemp.jsx";

export default function BikesTableSection() {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Available Bikes
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Browse and manage bikes available for rent
        </p>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <BikesTableView />
        <BikesTableViewTemp/>
      </div>
    </div>
  );
}
