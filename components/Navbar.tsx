'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { app } from "@/lib/firebase"; 

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName || user.email?.split('@')[0] || 'User');
      } else {
        setUsername(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-slate-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">StyleSwiper</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link 
              href="/swipe-page" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/swipe') 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Swipe
            </Link>
            <Link 
              href="/wishlist" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/wishlist') 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Wishlist
            </Link>
            <Link 
              href="/preferences" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/preferences') 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Preferences
            </Link>
          </div>

          {/* User menu */}
          <div className="hidden md:flex md:items-center">
            {username ? (
              <div className="ml-4 flex items-center md:ml-6">
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-300">Hi, {username}</span>
                    <button
                      onClick={handleSignOut}
                      className="transition ease-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-700"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="transition ease-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="transition ease-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          </div>
      </div>
    </nav>
  );
}