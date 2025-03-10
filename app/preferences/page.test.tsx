import { render, screen, fireEvent } from "@testing-library/react";
import PreferencesPage from "./page";
import { useRouter } from "next/navigation";

// Mock Next.js router
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

// Mock Firebase Firestore calls (since Firestore is not available in a test environment)
jest.mock("@/lib/firebase", () => ({
    db: jest.fn(),
}));

describe("PreferencesPage", () => {
    const mockPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    });

    //test("renders loading state initially", () => {
      //  render(<PreferencesPage />);
        //expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    //});

    test("renders login prompt if no user", async () => {
        render(<PreferencesPage />);
        expect(await screen.findByText(/Please log in to set preferences/i)).toBeInTheDocument();
    });

    test("renders preferences selection when user is authenticated", async () => {
        localStorage.setItem("userSession", JSON.stringify({ isLoggedIn: true, uid: "testUid", email: "test@example.com" }));
        render(<PreferencesPage />);
        
        // Check if the page renders selection buttons
        expect(await screen.findByText(/Select Your Style Preferences/i)).toBeInTheDocument();
    });

    //test("calls router.push on save preferences", async () => {
      //  render(<PreferencesPage />);
        //const saveButton = screen.getByRole("button", { name: /Save Preferences/i });
        
        //fireEvent.click(saveButton);
        //expect(mockPush).toHaveBeenCalledWith("/swipe-page");
    //});
});