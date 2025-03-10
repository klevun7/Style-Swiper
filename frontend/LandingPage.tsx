"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="flex flex-col items-center justify-center py-20">
        <h2 className="text-4xl font-semibold mb-6 mt-6">Swipe. Save. Shop.</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-xl text-center">
          Discover trendy outfits by swiping left or right. Save your favorite looks and shop them instantly.
        </p>
        <Link href='/login'>
          <Button size="lg" className="transition ease-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 bg-blue-600 text-white px-3 py-3 rounded-xl shadow-lg hover:bg-blue-700">
            Start Swiping
          </Button>
        </Link>
      </main>

      <section className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <div className="feature-card">
        <Image 
            src="/landing-page/swipe_pic.png" 
            alt="Swipe Image"
            width={500} 
            height={300}
            className="rounded-lg shadow-lg transition ease-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300" 
          />
          <h3 className="text-xl font-bold mt-2 mb-2">Swipe</h3>
          <p className="text-gray-600 font-clash">
            Quickly browse through our curated collection by swiping left and right to find your style.
          </p>
        </div>
        
        <div className="feature-card">
        <Image 
            src="/landing-page/swipe_pic2.png" 
            alt="Swipe Image"
            width={500} 
            height={300}
            className="rounded-lg shadow-lg transition ease-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300" 
          />
          <h3 className="text-xl font-bold mt-2 mb-2">Save</h3>
          <p className="text-gray-600">
            Add your favorite items to your wishlist with a simple swipe right to view them later. 
          </p>
        </div>
        
        <div className="feature-card">
        <Image 
            src="/landing-page/swipe_pic3.png" 
            alt="Swipe Image"
            width={500} 
            height={300}
            className="rounded-lg shadow-lg transition ease-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300" 
          />
          <h3 className="text-xl font-bold mt-2 mb-2">Custom-Tailored Prefernces</h3>
          <p className="text-gray-600">
            Purchase your saved items directly from retailers whenever you&apos;re ready to upgrade your wardrobe.
          </p>
        </div>
      </section>
    </div>
  );
}
