import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./redux/reducers";
import { searchCity } from "./redux/reducers";

import { CiDroplet } from "react-icons/ci";
import { LuWind } from "react-icons/lu";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa";

const App = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const userss = useSelector((state) => state.user.userss);
  const loading = useSelector((state) => state.user.loading);

  console.log(userss);
  console.log(loading);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      dispatch(searchCity(searchQuery));
      setSearchQuery("");
    }
  };

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (!userss || Object.keys(userss).length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container w-[800px] mx-auto mt-5">
      <form onSubmit={handleSearch}>
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search country"
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <div className="mt-5 border p-2 flex justify-around">
        <div className="flex flex-col gap-2">
          <p className="text-xl text-[#A09AAC] font-semibold">
            Current Weather
          </p>
          <h1 className="text-[#2FA7ED] text-2xl">{userss.name || "N/A"}</h1>
          <span className="text-5xl text-[#2FA7ED] ">
            {userss.main?.temp || "N/A"}°
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-[#2FA7ED] text-xl">
            Feels like {userss.main.feels_like}°C
          </span>
          <div className="flex justify-between">
            <span className="flex items-center text-[#2FA7ED]">
              <FaArrowUp />
              {userss.main.temp_max}
            </span>
            <span className="flex items-center text-[#2FA7ED]">
              <FaArrowDown />
              {userss.main.temp_min}
            </span>
          </div>
          <span className="flex items-center">
            <CiDroplet />
            Humidity {userss.main.humidity}%
          </span>
          <span className="flex items-center">
            <LuWind /> Wind {userss.wind.speed}kph
          </span>
          <span>Pressure {userss.main.pressure}hPa</span>
        </div>
      </div>
    </div>
  );
};

export default App;
