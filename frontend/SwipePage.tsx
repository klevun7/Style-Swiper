'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import SwipeCard from "@/components/SwipeCard";

import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where, doc, getDoc, addDoc } from "firebase/firestore";

export default function SwipePage() {
    const router = useRouter();
    const [cards, setCards] = useState<{ id: string; name: string; imageUrl: string; price?: number; category?: string }[]>([]);
    const [lastSwiped, setLastSwiped] = useState<any | null>(null);
    const [swipeMessage, setSwipeMessage] = useState<string | null>(null);
    const [userPreferences, setUserPreferences] = useState<string[]>([]);
   

    useEffect(() => {
        const fetchUserPreferencesAndClothes = async () => {
            try {
                
                const auth = getAuth();
                const currentUser = auth.currentUser;
                
                if (!currentUser) {
                    console.error("No user is signed in");
                    router.push("/login"); 
                    return;
                }
                
                
                const userDocRef = doc(db, "users", currentUser.uid);
                const userDoc = await getDoc(userDocRef);
                
                if (!userDoc.exists()) {
                    console.error("User document not found");
                    return;
                }
                
                const userData = userDoc.data();
                
                const preferences = userData.preferences ? 
                    (Array.isArray(userData.preferences) ? 
                        userData.preferences : 
                        Object.values(userData.preferences).filter(p => p !== undefined && p !== null)) :
                    [];
                
                setUserPreferences(preferences);
                
                
                if (preferences.length > 0) {
                    const clothingQuery = query(
                        collection(db, "clothingItems"),
                        where("category", "in", preferences)
                    );
                    
                    const querySnapshot = await getDocs(clothingQuery);
                    const items = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    })) as { id: string; name: string; imageUrl: string; price?: number; category?: string }[];
                    
                    setCards(items);
                } else {
                    
                    const querySnapshot = await getDocs(collection(db, "clothingItems"));
                    const items = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    })) as { id: string; name: string; imageUrl: string; price?: number; category?: string }[];
                    
                    setCards(items);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } 
        };

        fetchUserPreferencesAndClothes();
    }, [router]);

    
    const handleSwipe = async (direction: "left" | "right") => {
        if (cards.length == 0) return;

        const removedCard = cards[0];   // Save last swiped card
        setLastSwiped(removedCard);     // Set the undo state
       
        if (direction == 'left') {
            setSwipeMessage("Skip");
        }
        else if (direction == 'right') {
            setSwipeMessage("Keep");

            // Fix: Saving clothing items to the wishlist 
            try {
                const auth = getAuth();
                const currentUser = auth.currentUser;
                
                if (currentUser) {
                    await addDoc(collection(db, "wishlist"), {
                        itemId: removedCard.id,
                        name: removedCard.name,
                        imageUrl: removedCard.imageUrl,
                        price: removedCard.price,
                        category: removedCard.category,
                        userId: currentUser.uid,
                    });
                    console.log("Added to wishlist:", removedCard.name);
                }
            } catch (error) {
                console.error("Error saving to wishlist:", error);
            }
        }
        setTimeout(() => setSwipeMessage(null), 500);           // Make skip/keep msg disappear after 0.5 second
        setCards((prev) => prev.slice(1));           
    };

    const handleUndo = () => {
        if (lastSwiped) {                              
            setCards((prev) => [lastSwiped, ...prev]);   // Add last swiped card back to the front
            setLastSwiped(null);                        // Clear up undo state for use again
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen relative w-full" style={{ backgroundColor: "gray" }}>
            {swipeMessage && (
                <div className="absolute left-10 top-1/3 text-1xl font-semibold text-white drop-shadow-lg">
                    {swipeMessage}
                </div>
            )}

            <div className="flex items-center justify-center flex-grow w-full h-full">
                {cards.length > 0 ? (
                    <SwipeCard key={cards[0].id} item={cards[0]} onSwipe={handleSwipe} index={0} />
                ) : (
                    <div className="flex flex-col items-center gap-6">
                        <h1 className="text-3xl font-semibold text-white">Out of clothes...</h1>
                        <button
                            onClick={() => router.push("/wishlist")}
                            className="px-6 py-3 text-white text-lg font-semibold bg-blue-200 px-8 px-4 rounded-lg"
                        >
                            View Wishlist
                        </button>
                    </div>
                )}
            </div>

            {lastSwiped && (
                <div className="absolute right-4 bottom-4 z-50 gap-4">
                    <button
                        onClick={handleUndo}
                        className="text-white font-semibold text-1xl bg-green-400 px-8 py-4 rounded-lg"
                    >
                        Undo Swipe
                    </button>
                </div>
            )}
        </div>
    );
}