"use client";

import Image from "next/image";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ImageCarouselProps {
  images: {
    url: string;
  }[];
}

export default function Carousel({ images }: ImageCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      containerRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white dark:bg-black p-3 shadow-md hover:bg-gray-100"
      >
        <FaChevronLeft />
      </button>

      {/* Image container */}
      <div
        ref={containerRef}
        className="flex overflow-x-auto scroll-smooth space-x-4 p-2 scrollbar-hide snap-x snap-mandatory"
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="relative shrink-0 snap-center rounded-xl overflow-hidden min-w-[90%] sm:min-w-[60%] md:min-w-[40%] aspect-video"
          >
            <Image
              src={image.url}
              alt={`House image ${index + 1}`}
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white dark:bg-black p-3 shadow-md hover:bg-gray-100"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
