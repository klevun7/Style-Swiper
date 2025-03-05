"use client"; // Required for animations in Next.js
import React, {useState} from "react";
import SwipeCard from "@/components/SwipeCard";
// import firebaseApp from "@/lib/firebase";
// const { db } = firebaseApp;
import { useRouter } from "next/navigation";

export default function SwipePage()
{
    const router = useRouter();
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

            /*
                insert code here to save liked item to wishlist --> firestore
            */
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
        <div className="bg-gray-500 flex flex-col items-center justify-center min-h-screen relative w-full">
            {swipeMessage && (
                <div className="absolute left-10 top-1/3 text-5xl font-extrabold text-white font-serif drop-shadow-lg">
                {swipeMessage}                                  
            </div>                                              // Display the skip/keep message after swipe
            )}

            <div className="flex items-center justify-center flex-grow w-full h-full">
            {cards.length > 0 ? (                                // Non-empty card stack, option 'View Wishlist' appears when stack empty
                <SwipeCard key={cards[0].id} item={cards[0]} onSwipe={handleSwipe} index={0} />
            ) : (
                <div className="flex flex-col items-center gap-6">
                    <h1 className="text-3xl font-bold text-white"> Out of clothes...&nbsp;</h1>
                    <button
                        onClick={() => router.push("/wishlist")}
                        className="px-6 py-3 text-white text-lg font-bold rounded-lg"
                    >
                        View Wishlist
                        </button>
                </div>
            )}  
            </div>

            {/* Previous card exists, set card for 'Undo Swipe'} */ }
            {lastSwiped && (       
                <div className="absolute right-4 bottom-4 z-50">                             
                    <button 
                        onClick={handleUndo}
                        className="text-white font-bold text-2xl bg-green-500 px-8 py-4 rounded-lg"
                    >
                        Undo Swipe
                    </button>
                </div>
            )}
             {/* <SwipeCard />               Grabs the swipe card  */}
      </div>
    );
}

