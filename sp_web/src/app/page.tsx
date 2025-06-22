"use client";
import { motion } from "motion/react";
import Link from "next/link";

export default function Home() {
  const spInterior = "/videos/sp-interior.mp4";

  return (
    <div className="home_page -mt-2">
      {/* Hero section */}
      <div className="hero_section relative">
        {/* overlay */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* Video section */}
        <video
          className="w-full object-cover h-[480px] sm:h-[520px] md:h-[580px] lg:h-[640px]"
          loop
          muted
          autoPlay
          poster="/images/video-placeholder.jpg"
        >
          <source src={spInterior} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Text section - Overlays the video */}
        <div className="absolute inset-0 flex items-center justify-center text-center z-20">
          <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] flex flex-col items-center justify-center text-white">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide p-6 pb-0 uppercase">
              YOUR DREAM HOME, BUILT WITH HEART
            </h1>
            <p className="max-w-3xl tracking-wide text-white text-lg sm:text-2xl font-light p-4">
              Experience Design & Innovation in Every Detail of Your Dream Home.
            </p>
            <Link
              href="/contact"
              className="text-xl font-semibold text-white px-6 py-3 bg-yellow-500 rounded-full shadow-lg transition duration-300 ease-in-out hover:bg-yellow-600"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      {/* Emotional Tagline */}
      <div className="emotional_tagline flex flex-col items-center justify-center py-12 px-4 bg-white/80 rounded-lg shadow-md mt-8 mx-auto max-w-3xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-500 mb-4 tracking-wide text-center">
          YOUR HOME, YOUR STORY
        </h2>
        <p className="text-gray-700 text-base sm:text-lg md:text-xl font-light text-center leading-relaxed">
          More than walls and a roof — a home is where your life unfolds.
          It&apos;s where laughter echoes, dreams grow, and memories are made.
          At <span className="font-semibold ">SP Home</span>, we
          don&apos;t just build houses — we shape the spaces that shape you.
          Explore homes designed not just for living, but for belonging.
          Let&apos;s create the place you&apos;ll call yours — in every sense of
          the word.
        </p>
      </div>

      {/* Explore Your Dream Home */}
      <div className="explore-container py-10 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6 text-yellow-500">
          Explore Your Dream Home
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              item: "Quick Possessions",
              image: "/images/sp-quickpossession.jpg",
              link: "/quick-possessions",
            },
            {
              item: "Show HOmes",
              image: "/images/sp-showhomes.jpg",
              link: "/show-homes",
            },
            {
              item: "Gallery",
              image: "/images/sp-gallery.jpg",
              link: "/gallery",
            },
            {
              item: "Community",
              image: "/images/sp-communities.jpg",
              link: "/communities",
            },
          ].map(({ item, image, link }) => (
            <motion.div
              className="explore-card relative p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-white"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "320px",
                width: "100%",
                borderRadius: "0.8rem",
              }}
              whileHover={{
                scale: 0.98,
                transition: { duration: 0.3 },
              }}
              key={item}
            >
              <div className="absolute inset-0 bg-black/30 z-10 rounded-xl"></div>
              <div className="relative top-[60%] z-20 flex flex-col items-center justify-center text-center text-white">
                <span className="text-3xl font-bold px-4 rounded-md">
                  {item}
                </span>
                <Link href={link}>
                  <span className="text-xl font-bold">View 🠮</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
