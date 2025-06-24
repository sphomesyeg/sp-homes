import { client } from "@/sanity/client";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Community {
  name: string;
  description: string;
  featuredImage: string;
  city: {
    name: string;
  };
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const community = await client.fetch<Community | null>(
    `*[_type == "community" && slug.current == $slug][0]{
      name,
      description,
      "featuredImage": featuredImage.asset->url,
      "city": city->{name}
    }`,
    { slug }
  );

  if (!community) {
    return {
      title: "Community Not Found",
    };
  }

  return {
    title: `${community.name} | ${community.city.name}`,
    description: community.description,
    openGraph: {
      images: [community.featuredImage],
    },
  };
}

export default async function CommunityPage({ params }: Params) {
  const { slug } = await params;
  const community = await client.fetch<Community | null>(
    `*[_type == "community" && slug.current == $slug][0]{
      name,
      description,
      "featuredImage": featuredImage.asset->url,
      "city": city->{name}
    }`,
    { slug }
  );

  if (!community) return notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
        <Image
          src={community.featuredImage}
          alt={community.name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
        />
       
      </div>

      <div className="mt-8 space-y-2">
        <p className="text-amber-500 text-2xl lg:text-4xl md:text-3xl font-semibold">
          Read About {community.name}
        </p>
        <p className="text-md text-gray-700 dark:text-gray-300">
          {community.description}
        </p>

      </div>
    </div>
  );
}
