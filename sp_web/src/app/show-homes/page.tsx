"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { client } from "@/sanity/client";
import FilterByCommunity from "@/components/filterByCommunity/FilterByCommunity";
import { useCity } from "../../../context/cityContext";
import Loader from "@/components/loader/Loader";

interface ShowHome {
  _id: string;
  houseModel: string;
  houseType: string;
  streetAddress: string;
  community: {
    name: string;
  };
  province: string;
  propertySize: number;
  numOfBeds: number;
  numOfBaths: number;
  featuredImage: string;
  slug: string;
}

const ShowHome = () => {
  const { city } = useCity();
  const [community, setCommunity] = useState<string>("");
  const [data, setData] = useState<ShowHome[]>([]);
  const [loading, setLoading] = useState(true);

  const banner = "/images/sp-showhomes.jpg";

  useEffect(() => {
    const filters = ['_type == "showHome"', '!(_id in path("drafts.**"))'];
    const params: Record<string, string> = {};

    if (community) {
      filters.push("community->name == $community");
      params.community = community;
    }

    if (city) {
      filters.push("community->city->name == $city");
      params.city = city;
    }

    const query = `*[${filters.join(" && ")}]{
      _id,
      houseModel,
      houseType,
      streetAddress,
      "community": community->{ name },
      province,
      propertySize,
      numOfBeds,
      numOfBaths,
      "featuredImage": featuredImage.asset->url,
      "slug": slug.current
    }`;

    setLoading(true);
    client
      .fetch(query, params)
      .then((data: ShowHome[]) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching filtered show homes:", error);
        setData([]);
        setLoading(false);
      });
  }, [city, community]);

  return (
    <div className="show_homes_wrapper">
      {/* Banner Section */}
      <div
        className="relative w-full h-[240px] md:h-[480px] lg:h-[520px] bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <div className="relative flex items-center justify-center text-center h-full w-full z-20">
          <h1 className="text-white text-5xl sm:text-6xl font-bold drop-shadow-xl">
            SHOW HOMES
          </h1>
        </div>
      </div>

      {/* Filter */}
      <div className="filter_wrapper">
        <FilterByCommunity community={community} setCommunity={setCommunity} />
      </div>

      {/* Cards Section */}
      <div className="px-4 py-10 bg-white dark:bg-gray-900">
        {loading ? (
          <Loader />
        ) : data.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <li
                key={item._id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden border border-gray-200"
              >
                {/* Image */}
                <div className="relative w-full h-52 sm:h-64">
                  <Image
                    src={item.featuredImage}
                    alt={item.houseModel}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="p-5 space-y-2">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {item.houseModel}
                  </h2>
                  <p className="text-yellow-600 font-medium uppercase">
                    {item.community.name}, {item.province}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {item.streetAddress}
                  </p>
                  <p className="text-base text-gray-700 dark:text-gray-200 font-semibold">
                    {item.houseType.toUpperCase()}
                  </p>

                  <div className="flex items-center gap-4 mt-3 text-gray-700 dark:text-gray-200">
                    <span className="flex items-center gap-1">
                      <FaRulerCombined className="text-yellow-600" />
                      {item.propertySize} sqft
                    </span>
                    <span className="flex items-center gap-1">
                      <FaBed className="text-yellow-600" />
                      {item.numOfBeds}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaBath className="text-yellow-600" />
                      {item.numOfBaths}
                    </span>
                  </div>
                </div>

                {/* Link Button */}
                <div className="bg-yellow-600 py-3 text-center">
                  <Link
                    href={`/show-homes/${item.slug}`}
                    className="text-white font-medium text-sm"
                  >
                    View This Home →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-300 py-10">
            No show homes available for{" "}
            <span className="font-semibold">
              {community || city || "this selection"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowHome;
