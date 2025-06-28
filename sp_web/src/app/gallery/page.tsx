// app/gallery/page.tsx

import { groq } from "next-sanity";
import Image from "next/image";
import { client } from "@/sanity/client";
const banner = "/images/sp-gallery.jpg";

// GROQ query to fetch all gallery documents and their images
const query = groq`
  *[_type == "gallery"][0]{
    _id,
    title,
    images[]{
      altText,
      image{
        asset->{
          _id,
          url,
          metadata {
            dimensions {
              width,
              height,
              aspectRatio
            }
          }
        }
      }
    }
  }
`;

type GalleryImage = {
  altText?: string;
  image?: {
    asset?: {
      _id: string;
      url: string;
      metadata?: {
        dimensions?: {
          width: number;
          height: number;
          aspectRatio: number;
        };
      };
    };
  };
};

export default async function Gallery() {
  const gallery = await client.fetch(query);
  const images: GalleryImage[] = gallery?.images ?? [];
  return (
    <div className="bg-white dark:bg-gray-800">
      {/* Banner Section */}
      <div
        className="gallery_wrapper relative w-full object-cover h-[240px] md:h-[480px] lg:h-[520px]"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/20 z-10" />
        <div className="relative flex items-center justify-center text-center h-full w-full z-20">
          <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] flex flex-col items-center justify-center text-white">
            <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-bold tracking-wide drop-shadow-[6px_2px_6px_rgba(0,0,0,0.6)]">
              GALLERY
            </h1>
          </div>
        </div>
      </div>

      {/* Title and short description */}
      <div className="max-w-4xl mx-auto px-4 py-8 text-center bg-gray-200/80 dark:bg-black my-4">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
          Modern Design Gallery
        </h2>
        <p className="font-semibold md:text-lg text-gray-600 dark:text-gray-300">
          Explore our stunning portfolio of premium SP Homes properties. Browse
          through high-quality images of our luxury homes, modern designs, and
          exceptional craftsmanship that define SP Homes living.
        </p>
      </div>

      {/* Gallery Section - Larger images with fewer columns */}
      {images.length > 0 ? (
        <div className="gallery grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 sm:px-8 max-w-7xl mx-auto">
          {images.map((img, index) => {
            const dimensions = img.image?.asset?.metadata?.dimensions;
            const aspectRatio = dimensions?.aspectRatio || 4 / 3;

            return (
              <figure
                key={img.image?.asset?._id || index}
                className="relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                style={{ aspectRatio }}
              >
                <Image
                  src={img.image?.asset?.url || "/images/placeholder.jpg"}
                  alt={img.altText || "SP Homes property image"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, (max-width: 1280px) 50vw, 40vw"
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  quality={90}
                  // priority={index < 3}
                />
              </figure>
            );
          })}
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">
          No images found in the gallery.
        </div>
      )}
    </div>
  );
}
