"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLocationDot,
} from "react-icons/fa6";
import { IoMailOpenOutline } from "react-icons/io5";
import { GiRotaryPhone } from "react-icons/gi";
import { useCity } from "../../../context/cityContext";
import { client } from "@/sanity/client";

// Image paths
const spAlignedText = "/images/sp-aligned-text.png";
const omikTagline = "/images/omik-tagline.png";

interface Community {
  _id: string;
  name: string;
  slug: string;
}

const Footer = () => {
  const { city } = useCity();
  const [data, setData] = useState<Community[]>([]);

  useEffect(() => {
    const filters = ['_type == "community"', '!(_id in path("drafts.**"))'];
    const params: Record<string, string> = {};

    if (city) {
      filters.push("city->name == $city");
      params.city = city;
    }

    const query = `*[
      ${filters.join(" && ")}
    ] | order(_createdAt desc)[0...5]{
      _id,
      name,
      "slug": slug.current
    }`;

    client
      .fetch(query, params)
      .then((data: Community[]) => setData(data))
      .catch((error) => {
        console.error("Error fetching communities:", error);
        setData([]);
      });
  }, [city]);

  return (
    <footer>
      {/* Upper Footer */}
      <div className="content_footer p-6 border-gray-800 border-t-2 bg-black text-gray-100 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {/* Logo Block */}
        <div className="company_info flex flex-col gap-4 items-center text-center">
          <Image
            src={spAlignedText}
            alt="SP tagline logo"
            width={256}
            height={80}
            className="object-contain w-auto max-h-[100px]"
          />
          <Image
            src={omikTagline}
            alt="Omik tagline logo"
            width={256}
            height={80}
            className="object-contain w-auto max-h-[100px]"
          />
        </div>

        {/* Quick Links */}
        <div className="quick_menu">
          <h3 className="text-2xl font-semibold text-yellow-400">Quick Menu</h3>
          <ul className="mt-2 space-y-2">
            {[
              "Home",
              "Show Homes",
              "Quick Possessions",
              "Communities",
              "Gallery",
              "Contact",
            ].map((item, index) => (
              <li key={index}>
                <Link
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="hover:text-yellow-300"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Communities List */}
        <div className="our_communities">
          <h3 className="text-2xl font-semibold text-yellow-400">
            Communities
          </h3>
          <ul className="mt-2 space-y-2">
            {data.map((community) => (
              <li key={community._id}>
                <Link
                  href={`/communities/${community.slug}`}
                  className="hover:text-yellow-300"
                >
                  {community.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="contact_us">
          <h3 className="text-2xl font-semibold text-yellow-400">Contact Us</h3>
          <ul className="mt-2 space-y-3">
            <li className="flex items-center gap-2">
              <FaLocationDot className="text-yellow-400" />
              <Link
                target="_blank"
                href="https://g.co/kgs/4pJozk9"
                className="hover:text-yellow-300 truncate block"
              >
                2817 63rd Ave NE, Leduc County T4X 3A6
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <IoMailOpenOutline className="text-yellow-400" />
              <Link
                href="mailto:sphomesedm@gmail.com"
                className="hover:text-yellow-300"
              >
                sphomesedm@gmail.com
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <GiRotaryPhone className="text-yellow-400" />
              <Link href="tel:780-254-4000" className="hover:text-yellow-300">
                780-254-4000
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Lower Footer */}
      <div className="primary_footer bg-black text-gray-100 p-6 flex flex-col items-center gap-4 border-t border-gray-700">
        <ul className="socials flex gap-6 items-center justify-center">
          {(
            [
              ["https://facebook.com/", FaFacebook],
              ["https://www.instagram.com/sp.homes.yeg/", FaInstagram],
              ["https://youtube.com/", FaYoutube],
            ] as [string, React.ElementType][]
          ).map(([url, Icon], index) => (
            <li key={index} className="text-2xl hover:text-yellow-400">
              <Link target="_blank" href={url}>
                <Icon />
              </Link>
            </li>
          ))}
        </ul>

        <p className="text-lg text-center">
          <span className="font-bold">©</span> {new Date().getFullYear()} SP
          Homes. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
