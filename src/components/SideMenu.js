import React from "react";
import { Link } from "react-router-dom";

function SideMenu() {
  const localStorageData = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="h-full flex-col justify-between bg-cyan-900 hidden lg:flex inset-x-0 bottom-0 border-t border-cyan-400">
      <div className="px-4 py-6">
        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg hover:bg-cyan-600 px-4 py-2 text-white  hover:text-white"
          >
            <img className="rounded-full h-9 w-9"
              alt="dashboard-icon"
              src={require("../assets/dashboard-icon.png")}
            />
            <span className="text-xl font-medium"> Dashboard </span>
          </Link>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-white hover:bg-cyan-600 hover:text-white">
              <Link to="/inventory">
                <div className="flex items-center gap-2">
                  <img className="rounded-full h-9 w-9"
                    alt="inventory-icon"
                    src={require("../assets/inventory-icon.png")}
                  />
                  <span className="text-xl font-medium"> Inventory </span>
                </div>
              </Link>
            </summary>
          </details>

          <Link
            to="/purchase-details"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-white hover:bg-cyan-600 hover:text-white"
          >
            <img className="rounded-full h-9 w-9"
              alt="purchase-icon"
              src={require("../assets/supplier-icon.png")}
            />
            <span className="text-xl font-medium"> Purchase Details</span>
          </Link>
          <Link
            to="/sales"
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-white hover:bg-cyan-600 hover:text-white"
          >
            <img className="rounded-full h-9 w-9"
            alt="sales-icon" src={require("../assets/sales-icon.png")} />
            <span className="text-xl font-medium"> Sales</span>
          </Link>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-white hover:bg-cyan-600 hover:text-white">
              <Link to="/manage-store">
                <div className="flex items-center gap-2">
                  <img className="rounded-full h-9 w-9"
                    alt="store-icon"
                    src={require("../assets/order-icon.png")}
                  />
                  <span className="text-xl font-medium"> Manage Store </span>
                </div>
              </Link>
            </summary>
          </details>
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-cyan-400">
        <div className="flex items-center gap-2 bg-cyan-900 p-4 hover:bg-cyan-600">
          <img
            alt="Profile"
            src={localStorageData.imageUrl}
            className="h-9 w-9 rounded-full object-cover p-0"
          />

          <div>
            <p className="text-xs text-white">
              <strong className="block font-medium">
                {localStorageData.firstName + " " + localStorageData.lastName}
              </strong>

              <span> {localStorageData.email} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
