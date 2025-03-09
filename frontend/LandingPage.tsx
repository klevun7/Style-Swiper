import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Sliders, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">StyleSwiper</h1>
        <div className="flex gap-11">
          <Link href='/preferences'>
          <Button variant="ghost" className="flex items-center gap-2">
            <Sliders /> Preferences
          </Button>
          </Link>
          <Button variant="ghost" className="flex items-center gap-2">
            <Heart /> Wishlist
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <ShoppingBag /> Profile
          </Button>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center py-20">
        <h2 className="text-4xl font-semibold mb-6 mt-6">Swipe. Save. Shop.</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-xl text-center">
          Discover trendy outfits by swiping left or right. Save your favorite looks and shop them instantly.
        </p>
        <Link href={'/login'}>
        <Button size="lg" className="bg-blue-600 text-white px-3 py-3 rounded-xl shadow-lg">
          Start Swiping
        </Button>
        </Link>
      </main>

      <section className="flex justify-center gap-6 mt-16 px-6">
        <Card className="w-64 shadow-lg rounded-2xl">
          <CardContent className="p-4 flex flex-col items-center">
            <Image
              src="https://via.placeholder.com/150"
              alt="Fashion Item"
              className="w-full h-48 object-cover rounded-lg"
              width={150}
              height={150}
            />
            <p className="mt-4 font-medium">Trendy Jacket</p>
            <p className="text-gray-500">$79.99</p>
          </CardContent>
        </Card>

        <Card className="w-64 shadow-lg rounded-2xl">
          <CardContent className="p-4 flex flex-col items-center">
            <Image
              src="https://via.placeholder.com/150"
              alt="Fashion Item"
              className="w-full h-48 object-cover rounded-lg"
              width={150}
              height={150}
            />
            <p className="mt-4 font-medium">Stylish Sneakers</p>
            <p className="text-gray-500">$99.99</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
