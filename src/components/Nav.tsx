"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Lucide icons (you can use any icon lib)

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#0063A4] text-white py-4">
      <div className="max-w-7xl mx-auto w-[90%] flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center gap-2">
          <span className="text-white">
            JP<span className="text-[#FF0B80]">Elite Virtual Solution</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 font-medium">
          <Link href="/courses" className="hover:text-[#FF0B80] transition">Courses</Link>
          <Link href="/about" className="hover:text-[#FF0B80] transition">About JP</Link>
          <Link href="/tutorials" className="hover:text-[#FF0B80] transition">Quick Tutorials</Link>
          <Link href="/account" className="hover:text-[#FF0B80] transition">My Account</Link>
        </nav>

        {/* Call to Action (Desktop) */}
        <div className="hidden md:block">
          <Link href="/start">
            <button className="bg-[#FF0B80] hover:bg-[#FF4DA8] text-white px-4 py-1 rounded-full font-semibold transition">
              Start Learning
            </button>
          </Link>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#005188] px-6 py-4 space-y-4">
          <Link href="/courses" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#FF0B80]">Courses</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#FF0B80]">About JP</Link>
          <Link href="/tutorials" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#FF0B80]">Quick Tutorials</Link>
          <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="block hover:text-[#FF0B80]">My Account</Link>
          <Link href="/start" onClick={() => setMobileMenuOpen(false)}>
            <button className="bg-[#FF0B80] hover:bg-[#FF4DA8] w-full text-white px-4 py-2 rounded-full font-semibold transition mt-2">
              Start Learning
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
