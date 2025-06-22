"use client";

import { client } from "@/sanity/client";
import React, { useEffect, useState } from "react";
import { useCity } from "../../../context/cityContext";
import { useCityPopup } from "../../../context/CityPopupContext";
import { FaTimes } from "react-icons/fa";

type City = {
  _id: string;
  name: string;
};

const CityPopup: React.FC = () => {
  const { setCity } = useCity();
  const { isCityOpen, setCityOpen } = useCityPopup();
  const [cities, setCities] = useState<City[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    client
      .fetch(`*[_type == "city"]{ _id, name }`)
      .then((data: City[]) => {
        setCities(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cities:", error);
        setCities([]);
        setLoading(false);
      });
  }, []);

  if (!isCityOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl border border-gray-200 p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          onClick={() => setCityOpen(false)}
          aria-label="Close"
        >
          <FaTimes size={18} />
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
          Select Your City
        </h2>

        {/* Content */}
        {loading ? (
          <p className="text-center text-gray-500">Loading cities...</p>
        ) : cities && cities.length > 0 ? (
          <ul className="space-y-2 max-h-[240px] overflow-y-auto custom-scrollbar pr-1">
            {cities.map((city) => (
              <li key={city._id}>
                <button
                  className="w-full py-2 px-4 rounded-md border border-gray-400 hover:bg-gray-100 text-gray-800 text-left transition font-medium"
                  onClick={() => {
                    setCity(city.name);
                    setCityOpen(false);
                  }}
                >
                  {city.name}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No cities available</p>
        )}
      </div>
    </div>
  );
};

export default CityPopup;
