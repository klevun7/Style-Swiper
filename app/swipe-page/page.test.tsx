import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import SwipePageWrapper from "@/app/swipe-page/page";
import WishlistPage from "@/app/wishlist/page";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";

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
  addDoc: jest.fn(),
}));

// Mock the SwipeCard component
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

describe("Swipe and Wishlist Integration", () => {
  beforeEach(() => {
    // Mock the router
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });

    // Mock Firestore response for SwipePage
    (getDocs as jest.Mock).mockResolvedValue({
      docs: [
        {
          id: "1",
          data: () => ({
            id: "1",
            name: "Minnesota Vikings Sweatshirt",
            imageUrl: "/viking-sweatshirt.jpg",
            price: 86.0,
            category: "vintage",
          }),
        },
      ],
    });

    // Mock Firestore response for WishlistPage
    (getDocs as jest.Mock).mockResolvedValue({
      docs: [
        {
          id: "1",
          data: () => ({
            wishlistId: "1",
            name: "Minnesota Vikings Sweatshirt",
            imageUrl: "/viking-sweatshirt.jpg",
            price: 86.0,
            category: "vintage",
            userId: "testUser123",
          }),
        },
      ],
    });
  });

  it("adds Minnesota Vikings Sweatshirt to wishlist when swiped right and displays it in the wishlist", async () => {
    // Render SwipePage
    render(<SwipePageWrapper />);

    // Wait for the item to load
    await waitFor(() => {
      expect(screen.getByText("Minnesota Vikings Sweatshirt")).toBeInTheDocument();
    });

    // Simulate a swipe right
    const keepButton = screen.getByTestId("swipe-right-button");
    fireEvent.click(keepButton);

    // Check if addDoc was called to add the item to the wishlist
    await waitFor(() => {
      expect(addDoc).toHaveBeenCalledWith(expect.anything(), {
        itemId: "1",
        name: "Minnesota Vikings Sweatshirt",
        imageUrl: "/viking-sweatshirt.jpg",
        price: 86.0,
        category: "vintage",
        userId: "testUser123",
      });
    });

    // Navigate to the wishlist page
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    fireEvent.click(screen.getByText("Wishlist"));

    // Render WishlistPage
    render(<WishlistPage />);

    // Wait for the wishlist item to load
    await waitFor(() => {
      // Use a flexible text matcher to find "Minnesota Vikings Sweatshirt"
      const sweatshirtElement = screen.getByText((content, element) => {
        return content.includes("Minnesota Vikings Sweatshirt");
      });
      expect(sweatshirtElement).toBeInTheDocument();

      // Check for other details (price and category)
      expect(screen.getByText("$86.00")).toBeInTheDocument();
      expect(screen.getByText("vintage")).toBeInTheDocument();
    });

    // Debugging: Log the DOM to inspect what is being rendered
    screen.debug();
  });
});