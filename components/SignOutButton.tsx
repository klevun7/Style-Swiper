"use client";

import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const auth = getAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      
      // Sign out from Firebase Auth
      await signOut(auth);
      
      // Clear any local storage data
      localStorage.removeItem("userSession");
      
      
    
      router.push("/login");
      

    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to sign out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`${
        isLoggingOut ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
      } text-white px-4 py-2 rounded-lg transition`}
    >
      {isLoggingOut ? "Signing Out..." : "Sign Out"}
    </button>
  );
};

export default SignOutButton;