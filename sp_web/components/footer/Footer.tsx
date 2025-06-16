import React from "react";
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

// Image paths (Ensure they are inside `public/images/`)
const spAlignedText = "/images/sp-aligned-text.png";
const omikTagline = "/images/omik-tagline.png";

const Footer = () => {
  return (
    <footer>
      {/* Upper Footer Section */}
      <div className="content_footer p-6 border-gray-800 border-t-2 bg-black text-gray-100 flex flex-wrap justify-between gap-6">
        {/* Branding Section */}
        <div className="company_info flex flex-col items-center text-center">
          <Image
            src={spAlignedText}
            alt="SP tagline logo"
            width={256}
            height={80}
            className="object-contain"
          />
          <Image
            src={omikTagline}
            alt="Omik tagline logo"
            width={256}
            height={80}
            className="object-contain"
          />
        </div>

        {/* Quick Menu */}
        <div className="quick_menu">
          <h3 className="text-2xl font-semibold text-yellow-400">Quick Menu</h3>
          <ul className="mt-2 space-y-2">
            {[
              "Home",
              "House Models",
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

        {/* Communities Section */}
        <div className="our_communities">
          <h3 className="text-2xl font-semibold text-yellow-400">Communities</h3>
          <ul className="mt-2 space-y-2">
            {[
              "Chapelle",
              "Irvine Creek, Leduc County",
              "Churchill Meadows, Leduc County",
              "Fraser",
              "Robinson, Leduc",
              "Trymph Estates, Beaumont",
            ].map((community, index) => (
              <li key={index}>
                <Link href="/" className="hover:text-yellow-300">
                  {community}
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
              <span>2817 63 Ave NE, Leduc County T4X 3A6</span>
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

      {/* Bottom Footer Section */}
      <div className="primary_footer bg-black text-gray-100 p-6 flex flex-col items-center gap-4 border-t border-gray-700">
        {/* Social Links */}
        <ul className="socials flex gap-6 items-center justify-center">
          {([
            ["https://facebook.com/", FaFacebook],
            ["https://instagram.com/", FaInstagram],
            ["https://youtube.com/", FaYoutube],
          ] as [string, React.ElementType][]).map(([url, Icon], index) => (
            <li key={index} className="text-2xl hover:text-yellow-400">
              <Link href={url}>
                <Icon />
              </Link>
            </li>
          ))}
        </ul>

        {/* Copyright Info */}
        <p className="text-lg text-center">
          <span className="font-bold">©</span> {new Date().getFullYear()} SP
          Homes. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
