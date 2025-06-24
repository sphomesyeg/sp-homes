import { client } from "@/sanity/client";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";

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

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const home = await client.fetch<ShowHome | null>(
    `*[_type == "showHome" && slug.current == $slug][0]{
      houseModel,
      houseType,
      "community": community->{ name },
      "featuredImage": featuredImage.asset->url
    }`,
    { slug}
  );

  if (!home) {
    return {
      title: "Show Home Not Found",
    };
  }

  return {
    title: `${home.houseModel} | ${home.community.name}`,
    description: `Explore the ${home.houseModel} (${home.houseType}) located in ${home.community.name}.`,
    openGraph: {
      images: [home.featuredImage],
    },
  };
}

function getEmbedUrl(videoUrl: string): string | null {
  try {
    const url = new URL(videoUrl);
    if (url.hostname === "youtu.be") {
      return `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
    }
    const videoId = url.searchParams.get("v");
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

export default async function ShowHomeSingle({ params }: Params) {
  const { slug } = await params;

  const home = await client.fetch<ShowHome | null>(
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
  );

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

  const embedUrl = getEmbedUrl(home.videoTour);

  return (
    <div className="w-full">
      {/* Hero Image & Info */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="mb-6">
          <Link
            href="/show-homes"
            className="text-yellow-600 hover:underline inline-block"
          >
            &larr; Back to Show Homes
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="relative w-full h-[300px] sm:h-[450px] lg:h-[500px] rounded-xl overflow-hidden shadow-lg ring-1 ring-black/10">
            <Image
              src={home.featuredImage}
              alt={home.houseModel}
              fill
              className="object-cover"
              priority
            />
          </div>

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
}
