import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icons for mobile toggle

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
 <header className="bg-white shadow-sm sticky top-0 z-50">
  <div className="container mx-auto px-4 py-4 flex items-center justify-between">
    {/* Logo Section */}

        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            B
          </div>
          <div>
            <div className="font-semibold text-slate-900">BookIt</div>
            <div className="text-xs text-slate-500">Experiences & Slots</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm text-slate-700 hover:text-slate-900">
            Home
          </Link>
          <Link
            to="/about"
            className="text-sm text-slate-700 hover:text-slate-900"
          >
            About
          </Link>
          <Link
            to="/bookings"
            className="text-sm text-slate-700 hover:text-slate-900"
          >
            Bookings
          </Link>
          <button className="px-4 py-1.5 rounded-md bg-accent text-white text-sm">
            Sign in
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-white border-t border-slate-200">
          <div className="flex flex-col px-4 py-3 space-y-2">
            <Link
              to="/"
              className="text-sm text-slate-700 hover:text-slate-900"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-sm text-slate-700 hover:text-slate-900"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/bookings"
              className="text-sm text-slate-700 hover:text-slate-900"
              onClick={() => setIsOpen(false)}
            >
              Bookings
            </Link>
            <button className="px-3 py-2 rounded-md bg-accent text-white text-sm">
              Sign in
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
