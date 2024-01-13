import React, { useState, useEffect, useContext } from "react";
import AddStore from "../components/AddStore";
import AuthContext from "../AuthContext";

function Store() {
  const [showModal, setShowModal] = useState(false);
  const [stores, setAllStores] = useState([]);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetching all stores data
  const fetchData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllStores(data);
      });
  };

  const modalSetting = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center ">
      <div className=" flex flex-col gap-5 w-11/12">
      <span className="font-bold">Manage Store</span>
        <div className="flex justify-between">
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold p-2 text-xs  rounded"
            onClick={modalSetting}
          >
            Add Store
          </button>
        </div>
        <div className="grid grid-cols-1 col-span-12 lg:col-span-10 gap-6 md:grid-cols-2 lg:grid-cols-3  p-4 ">
        {showModal && <AddStore />}
        {stores.map((element, index) => {
          return (
            <div
              className="bg-white flex flex-col gap-4 p-4 rounded-lg"
              key={element._id}
            >
              <div className="border-2 border-solid-black">
                <img
                  alt="store"
                  className="h-60 w-full object-contain p-4"
                  src={element.image}
                />
              </div>
              <div className="flex flex-col gap-3 justify-between items-start">
                <span className="font-bold">{element.name}</span>
                <div className="flex">
                  <img
                    alt="location-icon"
                    className="h-6 w-6"
                    src={require("../assets/location-icon.png")}
                  />
                  <div>
                  <span>{element.address + ", " + element.city}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}

export default Store;
