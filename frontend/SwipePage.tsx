"use client"; // Required for animations in Next.js
import React, {useState} from "react";
import SwipeCard from "@/components/SwipeCard";
import { url } from "inspector/promises";


export default function SwipePage()
{
    const [cards, cardSet] = useState([
        {id: 1, name: "Item 1", imageUrl: "https://images.footlocker.com/is/image/EBFL2/N8490100_02?wid=500&hei=500&fmt=png-alpha"},
        {id: 2, name: "Item 2", imageUrl: "https://images.asics.com/is/image/asics/1183B391_200_SR_LT_GLB-3?qlt=80&wid=1280&hei=1452&bgc=255,255,255&resMode=bisharp"},
        {id: 3, name: "Item 3", imageUrl: "https://images.urbndata.com/is/image/UrbanOutfitters/87974176_001_b?$xlarge$&fit=constrain&fmt=webp&qlt=80&wid=960"},
        {id: 4, name: "Item 4", imageUrl: "https://images.urbndata.com/is/image/UrbanOutfitters/89806079_011_b?$xlarge$&fit=constrain&fmt=webp&qlt=80&wid=960"},
        {id: 5, name: "Item 5", imageUrl: "https://www.aelfriceden.com/cdn/shop/files/jpeg_d2be3321-9a38-4944-8510-a055ad019cbb.jpg?v=1728509310&width=600"},
        {id: 6, name: "Item 6", imageUrl: "https://www.aelfriceden.com/cdn/shop/files/5_2024-9-14.jpg?v=1730840555&width=600"}
    ]);


    const [lastSwiped, setLastSwiped] = useState<{id: number; name: string, imageUrl: string} | null>(null); // Tracking previous state for undo functionality
    const [swipeMessage, setSwipeMessage] = useState<string | null>(null);  // Keep swipe state for output


    const handleSwipe = (direction: "left" | "right") => {
        if (cards.length == 0) return;


        const removedCard = cards[0];   // Save last swiped card
        setLastSwiped(removedCard);     // Set the undo state
       
        if (direction == 'left') {
            setSwipeMessage("Skip");
        }
        else if (direction == 'right') {
            setSwipeMessage("Keep");
        }
        setTimeout(() => setSwipeMessage(null), 500);           // Make skip/keep msg disappear after 0.5 second
        cardSet((prev) => prev.slice(1));                       // Remove card from deck
    };


    const handleUndo = () => {
        if (lastSwiped) {                              
            cardSet((prev) => [lastSwiped, ...prev]);   // Add last swiped card back to the front
            setLastSwiped(null);                        // Clear up undo state for use again
        }
    }


    return (
        <div
            style={{
            display: "flex",
            alignItems: "center",                               // Vertical alignment of card
            justifyContent: "center",                           // Horizontal alignment of card
            height: "100vh",                                    // 100% of the visible part of the screen (Makes it white, but when you swipe around screen you meet black)
            backgroundColor: "gray",                           // Background color
            }}
        >
            {swipeMessage && (<div className="absolute top-1/4 text-6xl font-extrabold text-gray-900 text-white font-serif drop-shadow-lg">
                {swipeMessage}                                  
            </div>                                              // Display the skip/keep message after swipe
            )}


            {cards.length > 0 ?                                 // Card stack not empty, set direction
                (<SwipeCard key={cards[0].id} item={cards[0]} onSwipe={handleSwipe} />)
                : (<p className="text-9xl font-extrabold text-gray-900 font-serif mt-4">Out of clothes...</p>)  // Empty, print text
            }


            {lastSwiped && (
                <button onClick={handleUndo}
                className="absolute bottom-16 text-white font-bold text-2xl bg-green-500 hover:bg-green-600 px-8 py-4"
                >
                    Undo Swipe
                </button>
            )}


             {/* <SwipeCard />               Grabs the swipe card  */}
      </div>
    );
}

"use client";               // Run on client side instead of server
