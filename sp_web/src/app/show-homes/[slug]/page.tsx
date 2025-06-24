"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import { client } from "@/sanity/client";

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
  videoTour: string;
  featuredImage: string;
  slug: string;
}

const ShowHomeSingle = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const [home, setHome] = useState<ShowHome | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    client
      .fetch(
        `*[_type == "showHome" && slug.current == $slug][0]{
          _id,
          houseModel,
          houseType,
          streetAddress,
          "community": community->{ name },
          province,
          propertySize,
          numOfBeds,
          numOfBaths,
          videoTour,
          "featuredImage": featuredImage.asset->url,
          "slug": slug.current
        }`,
        { slug }
      )
      .then((data: ShowHome) => {
        setHome(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching show home:", error);
        setHome(null);
        setLoading(false);
      });
  }, [slug]);

  const getEmbedUrl = (url: string): string | null => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname === "youtu.be") {
        return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
      }
      const videoId = parsed.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    } catch {
      return null;
    }
  };

  const embedUrl = home?.videoTour ? getEmbedUrl(home.videoTour) : null;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  if (!home) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-center px-4">
        <p className="text-red-600 font-semibold text-lg">Home not found.</p>
        <Link href="/show-homes" className="mt-4 text-yellow-600 underline">
          &larr; Back to Show Homes
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Image */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/show-homes"
            className="text-yellow-600 hover:underline inline-block"
          >
            &larr; Back to Show Homes
          </Link>
        </div>

        {/* Grid Layout: Image + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Featured Image */}
          <div className="relative w-full h-[300px] sm:h-[450px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg ring-1 ring-black/10">
            <Image
              src={home.featuredImage}
              alt={home.houseModel}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Details */}
          <div className="bg-white dark:bg-gray-900 p-6 sm:p-10 rounded-xl shadow-lg space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
                {home.houseModel}
              </h1>
              <p className="text-yellow-600 font-semibold uppercase tracking-wide">
                {home.houseType}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {home.streetAddress}, {home.community.name}, {home.province}
              </p>
            </div>

            <div className="flex flex-wrap gap-8 text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <FaRulerCombined className="text-yellow-600" />
                <span>{home.propertySize} sqft</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBed className="text-yellow-600" />
                <span>{home.numOfBeds} Beds</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBath className="text-yellow-600" />
                <span>{home.numOfBaths} Baths</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Tour */}
      {embedUrl && (
        <section className="w-full bg-gray-100 dark:bg-gray-900 py-16 mt-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-yellow-600 dark:text-white">
              Video Tour
            </h2>
            <div className="w-full aspect-video max-w-5xl mx-auto rounded-xl overflow-hidden shadow-lg ring-1 ring-black/10">
              <iframe
                src={embedUrl}
                title="Video Tour"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ShowHomeSingle;
