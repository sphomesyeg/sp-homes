"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion } from "motion/react";
import sp_logo from "@/public/images/sp-logo.png";
import { useNavigation } from "../../../context/navigationContext";
import { useCity } from "../../../context/cityContext";
import { useCityPopup } from "../../../context/CityPopupContext";
import { useRouter } from "next/navigation";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/show-homes", label: "SHOW HOMES" },
  { href: "/quick-possessions", label: "QUICK POSSESSIONS" },
  { href: "/communities", label: "COMMUNITIES" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/contact", label: "CONTACT" },
];

const cityRequiredRoutes = [
  "/show-homes",
  "/quick-possessions",
  "/communities",
];

const Navbar: React.FC = () => {
  const { city } = useCity();
  const { setCityOpen } = useCityPopup();
  const { active, setActive } = useNavigation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleLinkClick = (href: string) => {
    if (!city && cityRequiredRoutes.includes(href)) {
      setCityOpen(true);
      return;
    }

    setActive(href);
    setMobileOpen(false);
    router.push(href);
  };

  const isActive = (href: string) => active === href;

  return (
    <nav className="navigation">
      <div className="max-w-[1480px] bg-gray-900 py-3 px-4 md:px-8 fixed top-0 left-1/2 transform -translate-x-1/2 w-full z-[10000] font-sans shadow-[5px_10px_30px_rgba(0,0,0,0.3)] drop-shadow-lg border-b border-gray-600">
        <div className="flex items-center justify-between mx-auto">
          {/* Logo & City Selector */}
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image
                src={sp_logo}
                alt="RealEstate Logo"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <div className="choose_city">
              <button
                onClick={() => setCityOpen(true)}
                className="text-white text-sm font-medium hover:underline focus:outline-none bg-blue-700 px-2 py-1 rounded"
              >
                {city || "Choose City"}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex gap-8">
            {navLinks.map((link) => (
              <li key={link.href} onClick={() => handleLinkClick(link.href)}>
                <span
                  className={`text-base text-gray-100 hover:text-yellow-300 transition-colors font-semibold cursor-pointer ${
                    isActive(link.href) ? "border-b-2 border-yellow-300" : ""
                  }`}
                >
                  {link.label}
                </span>
              </li>
            ))}
          </ul>

          {/* Mobile Nav Toggle */}
          <div className="lg:hidden">
            <button
              type="button"
              className="text-yellow-300 focus:outline-none cursor-pointer"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? (
                <FaTimes size={28} />
              ) : (
                <GiHamburgerMenu size={36} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="lg:hidden fixed left-0 right-0 z-40 bg-gray-700 rounded-b shadow px-4 py-4"
        initial={{ top: "-100%" }}
        animate={{ top: mobileOpen ? "88px" : "-100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <ul className="flex flex-col gap-0">
          {navLinks.map((link) => (
            <li
              key={link.href}
              className="border-b border-gray-600 last:border-b-0"
            >
              <button
                onClick={() => handleLinkClick(link.href)}
                className={`w-full text-left text-gray-100 hover:text-yellow-300 transition-colors py-3 px-1 cursor-pointer ${
                  isActive(link.href) ? "text-yellow-300" : ""
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </motion.div>
    </nav>
  );
};

export default Navbar;
