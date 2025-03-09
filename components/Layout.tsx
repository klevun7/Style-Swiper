"use client"

import React from "react";
import { ShoppingBag, Sliders, Heart, Home, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold cursor-pointer">StyleSwiper</h1>
        </Link>
        <div className="flex gap-4 md:gap-8">
          <Link to="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <Home className="w-5 h-5" /> Home
            </Button>
          </Link>
          <Link to="/swipe">
            <Button variant="ghost" className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" /> Discover
            </Button>
          </Link>
          <Link to="/preferences">
            <Button variant="ghost" className="flex items-center gap-2">
              <Sliders className="w-5 h-5" /> Preferences
            </Button>
          </Link>
          <Link to="/wishlist">
            <Button variant="ghost" className="flex items-center gap-2">
              <Heart className="w-5 h-5" /> Wishlist
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost" className="flex items-center gap-2">
              <User className="w-5 h-5" /> Profile
            </Button>
          </Link>
        </div>
      </nav>
      <main className="page-transition">
        {children}
      </main>
    </div>
  );
};

export default Layout;