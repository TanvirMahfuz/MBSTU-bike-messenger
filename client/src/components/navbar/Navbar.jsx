import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import { profileIcon,dropDownKeyIcon,logOutIcon } from "../../assets/icons";;

function Navbar() {
  const { authUser,logout } = useUserStore();
  const userName = authUser?.name ?? "Guest";
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const closeOnClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", closeOnClickOutside);
    return () => document.removeEventListener("mousedown", closeOnClickOutside);
  }, []);

  return (
    <nav className="flex justify-between items-center px-4 py-2 bg-gray-50 relative">
      <Link to="/">
        <img src="./src/assets/Logo.png" alt="Logo" height={50} width={50} />
      </Link>

      <div className="flex items-center gap-4">
        {authUser ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 focus:outline-none">
              <span className="text-xl">{profileIcon}</span>
              {dropDownKeyIcon}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
                <ul className="py-1">
                  <li>
                    <Link
                      to="/profile"
                      className="flex px-4 py-2 text-gray-700 hover:bg-gray-100 items-center gap-2"
                      onClick={() => setOpen(false)}>
                      {profileIcon} {userName}
                    </Link>
                  </li>
                  <li className="">
                    <button
                      className="flex px-6 py-2 text-red-500 hover:bg-gray-100 items-center gap-2"
                      onClick={() => {
                        logout()
                        setOpen(false)
                        }}>
                      {logOutIcon}
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
