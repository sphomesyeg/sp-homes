import { client } from "@/sanity/client";
import { FilterByCommunityProps } from "@/types/propsInterfaces";
import { useEffect, useState } from "react";
import { useCity } from "../../../context/cityContext";

interface CommunityData {
  _id: string;
  name: string;
  city: string;
}

const FilterByCommunity = ({
  community,
  setCommunity,
}: FilterByCommunityProps) => {
  const { city } = useCity();
  const [data, setData] = useState<CommunityData[]>([]);

  useEffect(() => {
    if (!city) {
      setData([]);
      return;
    }

    client
      .fetch(
        `*[_type == "community" && city->name == $city]{
          _id,
          name,
          "city": city->name
        }`,
        { city }
      )
      .then((data: CommunityData[]) => setData(data))
      .catch((error) => {
        console.error("Error fetching communities:", error);
        setData([]);
      });
  }, [city]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Select a Community
        </h2>
        <div className="mt-2 w-16 mx-auto border-t-2 border-amber-600" />
      </div>

      <select
        id="community-select"
        className="w-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-md px-4 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
        value={community}
        onChange={(e) => setCommunity(e.target.value)}
      >
        <option value="">All Communities</option>
        {data.map((item) => (
          <option key={item._id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterByCommunity;
