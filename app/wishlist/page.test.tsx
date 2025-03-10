import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import WishlistPage from "./page";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";

// Mock Next.js router
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
jest.mock("@/lib/firebase", () => ({
  db: {},
}));
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
}));

describe("WishlistPage", () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  test("renders loading state initially", () => {
    render(<WishlistPage />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("redirects to login if no user is signed in", async () => {
    (getAuth as jest.Mock).mockReturnValue({ currentUser: null });

    render(<WishlistPage />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });

  test("renders empty wishlist message if no items are found", async () => {
    (getDocs as jest.Mock).mockResolvedValue({ docs: [] });

    render(<WishlistPage />);

    await waitFor(() => {
      expect(screen.getByText(/Your wishlist is empty/i)).toBeInTheDocument();
    });
  });

  test("displays wishlist items correctly", async () => {
    (getDocs as jest.Mock).mockResolvedValue({
      docs: [
        {
          id: "item123",
          data: () => ({
            name: "Test Shirt",
            price: 25.99,
            category: "Clothing",
            imageUrl: "test-image.jpg",
          }),
        },
      ],
    });

    render(<WishlistPage />);

    await waitFor(() => {
      expect(screen.getByText(/Test Shirt/i)).toBeInTheDocument();
      expect(screen.getByText(/\$25.99/i)).toBeInTheDocument();
      expect(screen.getByText(/Clothing/i)).toBeInTheDocument();
    });
  });

  test("removes an item from wishlist", async () => {
    (getDocs as jest.Mock).mockResolvedValue({
      docs: [
        {
          id: "item123",
          data: () => ({
            name: "Test Shirt",
            price: 25.99,
            category: "Clothing",
            imageUrl: "test-image.jpg",
          }),
        },
      ],
    });

    render(<WishlistPage />);

    await waitFor(() => {
      expect(screen.getByText(/Test Shirt/i)).toBeInTheDocument();
    });

    const removeButton = screen.getByText(/Remove/i);
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(deleteDoc).toHaveBeenCalledWith(doc({}, "wishlist", "item123"));
    });
  });
});