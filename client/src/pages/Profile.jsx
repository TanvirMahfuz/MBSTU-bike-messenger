import {useEffect} from "react";
import { useUserStore } from "../store/useUserStore";

import MyBike from "../components/profile/MyBike";
function Profile() {
  const { authUser } = useUserStore();
  const bike = authUser?.bikes?.[0]; // assuming one bike per user
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center mb-8">
        <img
          src={authUser?.image ?? "../src/assets/Logo.png"}
          alt={`${authUser?.name ?? "User"}'s profile`}
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-200 object-contain"
        />
        <h2 className="text-xl font-semibold text-gray-800">
          {authUser?.name ?? "John Doe"}
        </h2>
        <p className="text-sm text-gray-500">{authUser?.email}</p>
        <span className="inline-block mt-2 px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-full capitalize">
          {authUser?.role}
        </span>
        <hr className="my-4 border-gray-200" />
        <p className="text-xs text-gray-400">
          Joined on {new Date(authUser?.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Bike Info */}
      <MyBike/>
    </div>
  );
}

export default Profile;
