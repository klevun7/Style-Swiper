import { motion } from "framer-motion";         // Allows smooth swiping/dragging
import React, { useState } from "react";

type SwipeCardProps = {
    item: { id: number; name: string; imageUrl: string }; // Take in clothing item with image
    onSwipe: (direction: "left" | "right") => void;     // Function prop which takes string direction, updates state when swipe occurs
};

export default function SwipeCard({ item, onSwipe} : SwipeCardProps) {
    const [position, setPosition] = useState(0);        // Tracks card position


    const handleDragBounds = (_event: any, info: any) => {
        const swipeThreshold = 150;                     // Needs swipe distance >= 150 to be considered valid swipe


        if (info.offset.x > swipeThreshold) {           // Detected swipe in pos direction
            setPosition(1);                             // Card is leaving page
            onSwipe("right");
        } else if (info.offset.x < -swipeThreshold) {   // Detected swipe in neg direction
            setPosition(1);                             // Card is leaving page
            onSwipe("left");
        }
    };


    return (
        // Allows for animation features
        <motion.div                                
            drag="x"      // Enable horizontal movement
            dragConstraints={{ left: -300, right: 300 }}          // Horizontal movement boundaries; -100px left & 400px right
            whileTap={{ cursor: "grabbing" }}                     // Changes cursor to grab when you drag/tap
            whileHover={{ scale: 1.05 }}                          // Enlarges the card when you hover over it
            // animate={{ x: position, transition: { type: "spring", stiffness: 500, damping: 1000 } }}        // Trying to stop it from sliding after letting go
            animate={position ? {x: "150%", opacity: 0} : {x : 0}} transition={{type: "spring", stiffness: 300, damping: 30}}
            onDragEnd={handleDragBounds}                          // Drag boundary issues handled w/ handleDragBounds() method
            className="relative w-[300px] h-[400px] flex flex-col justify-center items-center rounded-lg shadow-lg cursor-grab border-2 border-gray-300 bg-white"
        >
            {/*Content inside card -- fit full item image w/ object-contain*/}
            <div className="w-full h-64 flex justify-center items-center bg-white-200">
                <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="max-w-full max-h-full object-cover"    // maintain aspect ratio of image
                    draggable="false" 
                />
            </div>
        </motion.div>
  );
}
