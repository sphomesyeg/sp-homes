// app/communities/[slug]/page.tsx

import { client } from "@/sanity/client";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Community {
  name: string;
  description: string;
  featuredImage: string;
  city: {
    name: string;
  };
}

export default async function CommunityPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const data = await client.fetch<Community | null>(
    `*[_type == "community" && slug.current == $slug][0]{
      name,
      description,
      "featuredImage": featuredImage.asset->url,
      "city": city->{name}
    }`,
    { slug }
  );

  if (!data) return notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header Section */}
      <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={data.featuredImage}
          alt={data.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-md">
            {data.name}
          </h1>
        </div>
      </div>

      {/* Description */}
      <div className="mt-8 space-y-4">
        <p className="text-amber-500 text-lg font-semibold">
          Read About {data.name}
        </p>
        <p className="text-lg text-gray-700">{data.description}</p>
      </div>
    </div>
  );
}
