"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import { Community } from "@/types/propsInterfaces";
import { useCity } from "../../../context/cityContext";
import Loader from "@/components/loader/Loader";
import { ImArrowRight } from "react-icons/im";

const Communities = () => {
  const background = "/images/sp-communities.jpg";
  const { city } = useCity();
  const [data, setData] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filters = ['_type == "community"', '!(_id in path("drafts.**"))'];
    const params: Record<string, string> = {};

    if (city) {
      filters.push("city->name == $city");
      params.city = city;
    }

    const query = `*[${filters.join(" && ")}]{
      _id,
      name,
      "city": city->{name},
      description,
      "featuredImage": featuredImage.asset->url,
      "slug": slug.current
    }`;

    setLoading(true);
    client
      .fetch(query, params)
      .then((data: Community[]) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching communities:", error);
        setData([]);
        setLoading(false);
      });
  }, [city]);

  return (
    <div className="communities_wrapper">
      {/* Hero Section */}
      <div
        className="relative w-full object-cover h-[240px] md:h-[480px] lg:h-[520px]"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/20 z-10" />
        <div className="relative flex items-center justify-center text-center h-full w-full z-20">
          <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] flex flex-col items-center justify-center text-white">
            <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-bold tracking-wide drop-shadow-[6px_2px_6px_rgba(0,0,0,0.6)]">
              COMMUNITIES
            </h1>
          </div>
        </div>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="py-16 bg-white dark:bg-gray-900">
          <Loader />
        </div>
      ) : data.length > 0 ? (
        <ul className="p-6 md:px-12 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-30 bg-white">
          {data.map((item) => (
            <li
              key={item._id}
              className="relative h-72 bg-gray-900 rounded-lg overflow-hidden shadow-md group"
            >
              <Image
                src={item.featuredImage}
                alt={item.name || "Community image"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              <div className="absolute inset-0 bg-black/20 z-10" />

              {/* Content */}
              <div className="absolute top-0 left-0 w-full p-4 z-10 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
                <h2 className="text-white text-xl font-bold">{item.name}</h2>
                <p className="text-yellow-400 uppercase text-sm font-bold">
                  {item.city?.name || "Unknown"}
                </p>
              </div>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 w-full z-10 bg-yellow-600 text-center">
                <Link
                  href={`/communities/${item.slug}`}
                  className="inline-block w-full py-3 text-base font-bold text-white hover:underline"
                >
                  <div className="link_text  flex items-center gap-2 justify-center">
                    <span>Explore Community</span> <ImArrowRight />
                  </div>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-300 py-10 bg-white dark:bg-gray-900">
          No communities available for{" "}
          <span className="font-semibold">{city || "this location"}</span>
        </div>
      )}
    </div>
  );
};

export default Communities;
