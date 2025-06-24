import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import Carousel from "@/components/carousel/Carousel";
import type { Metadata } from "next";


interface FloorPlan {
  floor: string;
  image: string;
}

interface QuickPossessionDetail {
  _id: string;
  houseModel: string;
  houseType: string;
  city: {
    name: string;
  };
  community: {
    name: string;
  };
  sqft: number;
  beds: number;
  baths: number;
  oldPrice: number;
  newPrice: number;
  featuredImage: string;
  status: "ready" | "pending" | "sold";
  availability?: number;
  houseGallery?: { url: string }[];
  creativeTitle?: string;
  shortDescription?: string;
  keyFeatures?: string[];
  floorPlans?: FloorPlan[];
  slug: string;
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const possession = await client.fetch<QuickPossessionDetail | null>(
    `*[_type == "quickPossession" && slug.current == $slug][0]{
      houseModel,
      "city": city->{name},
      "community": community->{name},
      shortDescription,
      "featuredImage": featuredImage.asset->url
    }`,
    { slug }
  );

  if (!possession) {
    return {
      title: "Quick Possession Not Found",
    };
  }

  return {
    title: `${possession.houseModel} | ${possession.community.name}`,
    description:
      possession.shortDescription ??
      `Explore the ${possession.houseModel} in ${possession.community.name}.`,
    openGraph: {
      images: [possession.featuredImage],
    },
  };
}

export default async function QuickPossessionPage({ params }: Params) {
  const { slug } = await params;


  const possession = await client.fetch<QuickPossessionDetail | null>(
    `*[_type == "quickPossession" && slug.current == $slug][0]{
      _id,
      houseModel,
      houseType,
      "city": city->{name},
      "community": community->{name},
      sqft,
      beds,
      baths,
      oldPrice,
      newPrice,
      "featuredImage": featuredImage.asset->url,
      status,
      availability,
      houseGallery[]{ "url": asset->url },
      creativeTitle,
      shortDescription,
      keyFeatures,
      floorPlans[]{ floor, "image": image.asset->url },
      "slug": slug.current
    }`,
    { slug }
  );

  if (!possession) {
    return <p className="text-center py-10 text-red-600">Home not found.</p>;
  }

  

  return (
    <div className="text-gray-900">
      {/* Hero */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <Link
            href="/quick-possessions"
            className="text-yellow-600 underline mb-6 inline-block"
          >
            🠔 Back to Quick Possessions
          </Link>

          <div className="bg-white shadow-xl rounded-xl overflow-hidden border">
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={possession.featuredImage}
                alt={possession.houseModel}
                fill
                className="object-cover object-center rounded-t-xl"
                priority
              />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {possession.houseModel}
                  </h1>
                  <p className="text-yellow-600 font-bold uppercase text-sm mt-1">
                    In {possession.community?.name}
                  </p>
                </div>
                <div className="mt-4 sm:mt-0">
                  {possession.status === "sold" && (
                    <span className="text-red-600 font-semibold text-xs">
                      🔴 Sold
                    </span>
                  )}
                  {possession.status === "ready" && (
                    <span className="text-green-700 font-semibold text-xs">
                      🟢 Ready
                    </span>
                  )}
                  {possession.status === "pending" && (
                    <span className="text-yellow-800 font-semibold text-xs">
                      🟡 Pending
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 text-sm text-gray-800">
                <div>
                  🏠 <strong>Type:</strong> {possession.houseType}
                </div>
                <div>
                  📏 <strong>Size:</strong> {possession.sqft} sqft
                </div>
                <div>
                  🛏 <strong>Beds:</strong> {possession.beds}
                </div>
                <div>
                  🛁 <strong>Baths:</strong> {possession.baths}
                </div>
                {possession.availability && (
                  <div>
                    ⏳ <strong>Ready In:</strong> {possession.availability} days
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-6">
                <span className="text-2xl font-bold text-green-700">
                  ${possession.newPrice.toLocaleString()}
                </span>
                {possession.oldPrice && (
                  <span className="line-through text-gray-500">
                    ${possession.oldPrice.toLocaleString()}
                  </span>
                )}
                <Link
                  href="/contact"
                  className="ml-auto bg-yellow-600 text-white text-sm px-5 py-2.5 rounded-md hover:bg-yellow-700 transition"
                >
                  Inquire About This Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {Array.isArray(possession.houseGallery) &&
        possession.houseGallery.length > 0 && (
          <section className="py-14 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl font-semibold mb-6">Gallery</h2>
              <Carousel images={possession.houseGallery} />
            </div>
          </section>
        )}

      {/* Description + Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:flex md:gap-16 items-start">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h3 className="text-2xl font-semibold mb-4">
              Find your perfect fit in{" "}
              <span className="text-yellow-600">{possession.houseModel}</span>
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {possession.shortDescription}
            </p>
          </div>

          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">Key Features</h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-gray-800 list-disc list-inside">
              {possession.keyFeatures?.map((feature: string, i: number) => (
                <li key={i} className="text-sm">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Floor Plans */}
      {Array.isArray(possession.floorPlans) &&
        possession.floorPlans.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl font-semibold mb-8">
                Explore the Floor Plans
              </h2>
              <div className="grid md:grid-cols-2 gap-10">
                {possession.floorPlans.map((floor: FloorPlan, i: number) => (
                  <div key={i}>
                    <h3 className="text-lg font-medium mb-2 text-gray-700">
                      {floor.floor}
                    </h3>
                    <div className="rounded-xl overflow-hidden shadow border border-gray-200">
                      <Image
                        src={floor.image}
                        alt={`${floor.floor} plan`}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      {/* CTA */}
      <div className="bg-yellow-600 py-10 mt-20 text-center">
        <h2 className="text-white text-2xl font-bold mb-3">
          Like What You See?
        </h2>
        <p className="text-white mb-6">
          Let’s turn this house into your dream home.
        </p>
        <Link
          href="/contact"
          className="bg-white text-gray-800 font-medium px-6 py-3 rounded-md hover:bg-blue-100 transition-all"
        >
          Contact Our Team
        </Link>
      </div>
    </div>
  );
}
