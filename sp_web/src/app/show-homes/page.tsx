"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBed, FaBath, FaRulerCombined, FaArrowRight } from "react-icons/fa";
import { client } from "@/sanity/client";
import FilterByCommunity from "@/components/filterByCommunity/FilterByCommunity";
import { useCity } from "../../../context/cityContext";
import Loader from "@/components/loader/Loader";
import { motion, AnimatePresence } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
} as const;


const bannerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

const titleVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      delay: 0.3,
    },
  },
};

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
      .catch((error: unknown) => {
        console.error("Error fetching filtered show homes:", error);
        setData([]);
        setLoading(false);
      });
  }, [city, community]);

  return (
    <div className="show_homes_wrapper">
      {/* Banner Section with Animation */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={bannerVariants}
        className="relative w-full h-[240px] md:h-[480px] lg:h-[520px] bg-fixed bg-center bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <div className="relative flex items-center justify-center text-center h-full w-full z-20">
          <motion.h1
            variants={titleVariants}
            className="text-white text-5xl sm:text-6xl font-bold drop-shadow-xl"
          >
            SHOW HOMES
          </motion.h1>
        </div>
      </motion.div>

      {/* Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="filter_wrapper"
      >
        <FilterByCommunity community={community} setCommunity={setCommunity} />
      </motion.div>

      {/* Cards Section */}
      <div className="px-4 py-10 bg-white dark:bg-gray-900">
        {loading ? (
          <Loader />
        ) : data.length > 0 ? (
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {data.map((item) => (
                <motion.li
                  key={item._id}
                  variants={itemVariants}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    },
                  }}
                  className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden border border-gray-200"
                  layout
                >
                  {/* Image */}
                  <motion.div
                    className="relative w-full h-52 sm:h-64"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Image
                      src={item.featuredImage}
                      alt={item.houseModel}
                      fill
                      className="object-cover"
                      priority={false}
                    />
                  </motion.div>

                  {/* Details */}
                  <div className="p-5 space-y-2">
                    <motion.h2
                      className="text-2xl font-bold text-gray-800 dark:text-white"
                      whileHover={{ color: "#d97706" }} // yellow-600
                    >
                      {item.houseModel}
                    </motion.h2>
                    <p className="text-yellow-600 font-medium uppercase">
                      {item.community.name}
                    </p>
                    <p className="text-gray-500 dark:text-gray-300 font-semibold">
                      {item.streetAddress}
                    </p>
                    <p className="text-base text-gray-500 dark:text-gray-200 font-semibold">
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
                  <motion.div
                    className="bg-yellow-600 py-3 text-center"
                    whileHover={{ backgroundColor: "#b45309" }} // darker yellow
                  >
                    <Link
                      href={`/show-homes/${item.slug}`}
                      className="text-white font-bold flex items-center justify-center"
                    >
                      View This Home{" "}
                      <FaArrowRight className="inline-block ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 dark:text-gray-300 py-10"
          >
            No show homes available for{" "}
            <span className="font-semibold">
              {community || city || "this selection"}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ShowHome;
