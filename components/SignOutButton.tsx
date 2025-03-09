"use client";

import React from "react";
import { getAuth, signOut } from "firebase/auth";

const SignOutButton = () => {
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      const response = await fetch("/api/logout", { method: "POST" });

      if (response.ok) {
        window.location.href = "/login"; 
      } else {
        console.error("Logout API failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
