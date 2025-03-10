import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import SwipePage from "@/app/swipe-page/page";
import { getAuth } from "firebase/auth";
import { collection, getDocs, getDoc, doc, addDoc } from "firebase/firestore";

// Mock Next.js Router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock Firebase Auth
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "testUser123" },
  })),
}));

// Mock Firestore
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
  addDoc: jest.fn(),
}));

// Mock the handleSwipe function
jest.mock("@/components/SwipeCard", () => {
  return function MockSwipeCard({ item, onSwipe }) {
    return (
      <div
        data-testid="swipe-card"
        className="w-[300px] h-[400px] flex flex-col justify-center items-center rounded-lg shadow-lg cursor-grab border-2 border-gray-300 bg-white"
      >
        <div className="flex flex-col items-start justify-start w-full h-16 px-4">
          <h1 className="font-bold">{item.name}</h1>
          <h2 className="font-semibold">${item.price}</h2>
        </div>
        <div className="w-full h-64 flex justify-center items-center">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="max-w-full max-h-full object-cover"
            draggable="false"
          />
        </div>
        <div className="mt-4 flex gap-4">
          <button 
            data-testid="swipe-left-button" 
            onClick={() => onSwipe("left")}
          >
            Skip
          </button>
          <button 
            data-testid="swipe-right-button" 
            onClick={() => onSwipe("right")}
          >
            Keep
          </button>
        </div>
      </div>
    );
  };
});

describe("SwipePage", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });

    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => ({
        preferences: ["Casual", "Formal"],
      }),
    });

    (getDocs as jest.Mock).mockResolvedValue({
      docs: [
        {
          id: "1",
          data: () => ({
            id: "1",
            name: "Baggy Jeans",
            imageUrl: "/baggy-jeans.jpg",
            price: 35.00,
            category: "Streetwear",
          }),
        },
      ],
    });
  });

  it("renders SwipePage with clothing items", async () => {
    render(<SwipePage />);

    await waitFor(() => {
      expect(screen.getByText("Baggy Jeans")).toBeInTheDocument();
    });
  });

  it("handles undo swipe", async () => {
    render(<SwipePage />);
  
    await waitFor(() => {
      expect(screen.getByText("Baggy Jeans")).toBeInTheDocument();
    });
  
    // Use the keep button to trigger a right swipe
    const keepButton = screen.getByTestId("swipe-right-button");
    fireEvent.click(keepButton);
    
    // Wait for the "Undo Swipe" button to appear
    await waitFor(() => {
      expect(screen.getByText("Undo Swipe")).toBeInTheDocument();
    });
    
    // Click undo button
    fireEvent.click(screen.getByText("Undo Swipe"));
    
    // Check if card reappears
    await waitFor(() => {
      expect(screen.getByText("Baggy Jeans")).toBeInTheDocument();
    });
  });

  it("redirects to login if user is not signed in", async () => {
    (getAuth as jest.Mock).mockReturnValue({ currentUser: null });

    render(<SwipePage />);

    await waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledWith("/login");
    });
  });

  it("navigates to wishlist when out of clothes", async () => {
    (getDocs as jest.Mock).mockResolvedValue({ docs: [] });

    render(<SwipePage />);

    await waitFor(() => {
      expect(screen.getByText("Out of clothes...")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("View Wishlist"));

    await waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledWith("/wishlist");
    });
  });
});