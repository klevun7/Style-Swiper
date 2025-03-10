"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Sliders, Heart, User } from "lucide-react";
import Link from "next/link";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="flex flex-col items-center justify-center py-20">
        <h2 className="text-4xl font-semibold mb-6 mt-6">Swipe. Save. Shop.</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-xl text-center">
          Discover trendy outfits by swiping left or right. Save your favorite looks and shop them instantly.
        </p>
        <Link href='/login'>
          <Button size="lg" className="bg-blue-600 text-white px-3 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-colors">
            Start Swiping
          </Button>
        </Link>
      </main>

      <section className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="feature-card">
          <h3 className="text-xl font-bold mb-2">Swipe</h3>
          <p className="text-gray-600">
            Quickly browse through our curated collection by swiping left and right to find your style.
          </p>
        </div>
        
        <div className="feature-card">
          <h3 className="text-xl font-bold mb-2">Save</h3>
          <p className="text-gray-600">
            Add your favorite items to your wishlist with a simple swipe right or heart button tap.
          </p>
        </div>
        
        <div className="feature-card">
          <h3 className="text-xl font-bold mb-2">Shop</h3>
          <p className="text-gray-600">
            Purchase your saved items directly from retailers whenever you&apos;re ready to upgrade your wardrobe.
          </p>
        </div>
      </section>
    </div>
  );
}
