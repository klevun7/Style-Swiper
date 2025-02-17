"use client";               // Run on client side instead of server
import { motion } from "framer-motion";         // Allows smooth swiping/dragging
import React, { useState } from "react";

export default function SwipeCard() {
    const [position, setPosition] = useState(0);       // Tracks card position

    return (
        // Allows for animation features
        <motion.div                                 
        drag="x"      // Enable horizontal movement
        dragConstraints={{ left: -300, right: 300 }}          // Horizontal movement boundaries; -100px left & 400px right
        whileTap={{ cursor: "grabbing" }}                     // Changes cursor to grab when you drag/tap
        whileHover={{ scale: 1.05 }}                          // Enlarges the card when you hover over it
        animate={{ x: position, transition: { type: "spring", stiffness: 500, damping: 1000 } }}        // Trying to stop it from sliding after letting go
        onDragEnd={(event, info) => {                         // Triggered when the user stops dragging the card; info contains details about the drag (like how far the card moved)
            if(Math.abs(info.offset.x) < 200) {               // Checks if the distance of the card dragged doesn't pass a certain boundary
                setPosition(0);                               // Move back to center if not swiped far
            }
            else {                                                  // If card moves too far move off screen
                setPosition(info.offset.x > 0 ? 1000 : -1000)
            }
        }}
        style={{
            width: "300px",
            height: "400px",
            backgroundColor: "black", 
            borderRadius: "15px",                               // Rounds the corners
            display: "flex",                                    // Layout that helps you adjust horizontal and vertical positions
            alignItems: "center",                               // Vertical alignment
            justifyContent: "center",                           // Horizontal alignment
            fontSize: "20px",                                   // Font size
            fontWeight: "bold",                                 // Font Weight
            color: "white",                                     // Font Color
            cursor: "grab",                                     // Changes cursor to grab when you hover
        }}
        >
            {/*Content inside card*/} 
            Will Add More Later             
        </motion.div>
  );
}
