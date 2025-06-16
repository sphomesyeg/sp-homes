"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion } from "motion/react";
import sp_logo from "@/public/images/sp-logo.png";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/house-models", label: "HOUSE MODELS" },
  { href: "/quick-possessions", label: "QUICK POSSESSIONS" },
  { href: "/communities", label: "COMMUNITIES" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/contact", label: "CONTACT" },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="navigation">
      <div className="bg-gray-600 py-3 px-4 md:px-8 sticky top-0 z-50 font-sans shadow-sm">
        <div className="flex items-center justify-between mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image
                src={sp_logo}
                alt="RealEstate Logo"
                className="h-16 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-base text-gray-100 hover:text-yellow-300 transition-colors font-semibold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Nav Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-yellow-300 focus:outline-none"
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

      {/* Mobile Menu with Motion */}
      <motion.div
        className="md:hidden absolute left-0 right-0 top-[90px] z-40 bg-gray-700 rounded-b shadow px-4 py-4"
        animate={{ opacity: mobileOpen ? 1 : 0, y: mobileOpen ? 0 : -20 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <ul className="flex flex-col gap-0">
          {navLinks.map((link) => (
            <li
              key={link.href}
              className="border-b border-gray-600 last:border-b-0"
            >
              <Link
                href={link.href}
                className="block text-gray-100 hover:text-yellow-300 transition-colors py-3 px-1"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </nav>
  );
};

export default Navbar;
