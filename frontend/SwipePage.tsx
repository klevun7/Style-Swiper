"use client"; // Required for animations in Next.js
import React from "react";
import SwipeCard from "@/components/SwipeCard";

export default function SwipePage() 
{
    return (
        <div
            style={{
            display: "flex",
            alignItems: "center",                               // Vertical alignment of card
            justifyContent: "center",                           // Horizontal alignment of card
            height: "100vh",                                    // 100% of the visible part of the screen (Makes it white, but when you swipe around screen you meet black)
            backgroundColor: "white",                           // Background color
            }}
        >
            <SwipeCard />               {/* Grabs the swipe card */}
      </div>
    );
}