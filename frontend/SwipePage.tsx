"use client"; // Required for animations in Next.js
import React, {useState} from "react";
import SwipeCard from "@/components/SwipeCard";

export default function SwipePage() 
{
    const [cards, cardSet] = useState([
        {id: 1, name: "Item 1"},
        {id: 2, name: "Item 2"},
        {id: 3, name: "Item 3"},
    ]);

    const [lastSwiped, setLastSwiped] = useState<{id: number; name: string} | null>(null); // Tracking previous state for undo functionality
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
            backgroundColor: "white",                           // Background color
            }}
        >
            {swipeMessage && (<div className="absolute top-1/4 text-6xl font-extrabold text-gray-900 text-white font-serif drop-shadow-lg">
                {swipeMessage}                                  
            </div>                                              // Display the skip/keep message after swipe
            )}

            {cards.length > 0 ?                                 // Card stack not empty, set direction
                (<SwipeCard key={cards[0].id} onSwipe={handleSwipe} />)
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