"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBath, FaBed, FaRulerCombined } from "react-icons/fa6";

import FilterByCommunity from "@/components/filterByCommunity/FilterByCommunity";
import Loader from "@/components/loader/Loader";
import { client } from "@/sanity/client";
import { QuickPossession } from "@/types/propsInterfaces";
import { useCity } from "../../../context/cityContext";

const QuickPossessions = () => {
  const { city } = useCity();
  const [community, setCommunity] = useState<string>("");
  const [data, setData] = useState<QuickPossession[]>([]);
  const [loading, setLoading] = useState(true);

  const quickPossessionCover = "/images/sp-quickpossession.jpg";

  useEffect(() => {
    const filters = [
      '_type == "quickPossession"',
      '!(_id in path("drafts.**"))',
    ];
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
      "community": community->{ name },
      sqft,
      beds,
      baths,
      oldPrice,
      newPrice,
      "featuredImage": featuredImage.asset->url,
      status,
      availability,
      "slug": slug.current
    }`;

    setLoading(true);
    client
      .fetch(query, params)
      .then((data: QuickPossession[]) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quick possessions:", error);
        setData([]);
        setLoading(false);
      });
  }, [community, city]);

  const colorStatus = {
    ready: "bg-green-700",
    pending: "bg-yellow-600",
    sold: "bg-red-700",
  };

  return (
    <div className="quick_possession_wrapper">
      {/* Hero Header */}
      <div
        className="relative w-full object-cover h-[240px] md:h-[480px] lg:h-[520px]"
        style={{
          backgroundImage: `url(${quickPossessionCover})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/20 z-10" />
        <div className="relative flex items-center justify-center text-center h-full w-full z-20">
          <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-bold tracking-wide drop-shadow-[6px_2px_6px_rgba(0,0,0,0.6)]">
            QUICK POSSESSIONS
          </h1>
        </div>
      </div>

      {/* Filter Component */}
      <div className="filter_wrapper">
        <FilterByCommunity community={community} setCommunity={setCommunity} />
      </div>

      {/* Results Section */}
      <div className="quickPossession px-4 py-10 bg-white dark:bg-gray-900">
        {loading ? (
          <Loader />
        ) : data.length > 0 ? (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <li
                key={item._id}
                className="bg-blue-100 dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
              >
                {/* Image */}
                <div className="relative w-full h-52 sm:h-64">
                  <Image
                    src={item.featuredImage || ""}
                    alt={item.houseModel}
                    fill
                    className="object-cover"
                  />
                  <div
                    className={`absolute top-3 left-3 px-3 py-1 text-xs rounded-full text-white ${
                      colorStatus[item.status as keyof typeof colorStatus]
                    }`}
                  >
                    {item.status === "ready" && item.availability
                      ? `READY IN 1–${item.availability} DAYS`
                      : item.status.toUpperCase()}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 relative space-y-1">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {item.houseModel}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {item.community.name} • {item.houseType.toUpperCase()}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-gray-700 dark:text-gray-200 text-sm">
                    <span className="flex items-center gap-1">
                      <FaRulerCombined className="text-gray-500" />
                      {item.sqft} sqft
                    </span>
                    <span className="flex items-center gap-1">
                      <FaBed className="text-gray-500" />
                      {item.beds}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaBath className="text-gray-500" />
                      {item.baths}
                    </span>
                  </div>

                  {/* Price Tag */}
                  {(item.status === "ready" || item.status === "pending") && (
                    <div className="absolute top-4 right-4 bg-white dark:bg-gray-700 shadow-md rounded-md px-2 py-2 text-right">
                      {item.oldPrice && item.oldPrice > item.newPrice && (
                        <div className="text-xs text-red-500 line-through font-medium">
                          ${item.oldPrice.toLocaleString()}
                        </div>
                      )}
                      <div className="text-green-700 dark:text-green-400 text-base font-bold">
                        ${item.newPrice.toLocaleString()}
                      </div>
                      {item.oldPrice && item.oldPrice > item.newPrice && (
                        <div className="text-xs text-yellow-600 font-medium">
                          Save ${item.oldPrice - item.newPrice}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Link */}
                <div className="bg-yellow-600 py-3 text-center">
                  <Link
                    href={`/quick-possessions/${item.slug}`}
                    className="text-white font-semibold text-sm"
                  >
                    View This Home →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-300 py-10">
            No quick possessions available for{" "}
            <span className="font-semibold">
              {community || city || "this selection"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickPossessions;
