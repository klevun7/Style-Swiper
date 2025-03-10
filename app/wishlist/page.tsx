'use client'

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function WishlistPage() {
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        
        if (!currentUser) {
          console.error("No user is signed in");
          router.push("/login");
          return;
        }
        
        // Query the wishlist collection for items associated with the current user
        const wishlistQuery = query(
          collection(db, "wishlist"),
          where("userId", "==", currentUser.uid)
        );
        
        const querySnapshot = await getDocs(wishlistQuery);
        const items = querySnapshot.docs.map(doc => ({
          wishlistId: doc.id,
          ...doc.data(),
    
        }));
        
  
        
        setWishlistItems(items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [router]);

  const handleRemoveItem = async (wishlistId: string) => {
    try {
      await deleteDoc(doc(db, "wishlist", wishlistId));
      setWishlistItems(prev => prev.filter(item => item.wishlistId !== wishlistId));
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <button
            onClick={() => router.push("/swipe-page")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Back to Swipe
          </button>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-xl font-medium text-gray-700 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Swipe right on items you like to add them to your wishlist.</p>
            <button
              onClick={() => router.push("/swipe")}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Start Swiping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.wishlistId} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="relative h-64 w-full">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-200">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-blue-600 font-bold">
                      {item.price ? formatPrice(item.price) : 'No price'}
                    </span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {item.category || 'Uncategorized'}
                    </span>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => handleRemoveItem(item.wishlistId)}
                      className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}