// __tests__/Signup.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignupPage from '@/app/signup/page';
import { useRouter } from 'next/navigation';

global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ error: "Firebase: Error (auth/invalid-email)" }),
    })
  ) as jest.Mock;
  
// Mock Next.js router
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));
  
  describe('SignupPage Tests', () => {
    const mockPush = jest.fn();
  
    beforeEach(() => {
      jest.clearAllMocks();
      (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
      localStorage.clear();
    });
  
    test('displays server error if signup returns an invalid email response', async () => {
      // 1) Mock fetch to simulate Firebase "invalid-email" error
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          json: () =>
            Promise.resolve({
              error: 'Firebase: Error (auth/invalid-email)',
            }),
        } as Response)
      ) as jest.Mock;
  
      // 2) Render the signup page
      render(<SignupPage />);
  
      // 3) Fill in fields with an obviously invalid email
      fireEvent.change(screen.getByPlaceholderText(/email/i), {
        target: { value: 'invalid' },
      });
      fireEvent.change(screen.getByPlaceholderText(/password/i), {
        target: { value: '12345' },
      });
  
      // 4) Click "Sign Up"
      fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
  
      // 5) Wait for the error message to appear
      await waitFor(() => {
        expect(
          screen.getByText('Firebase: Error (auth/invalid-email)')
        ).toBeInTheDocument();
      });
  
      // 6) Verify that we did NOT redirect or store a token
      expect(mockPush).not.toHaveBeenCalled();
      expect(localStorage.getItem('token')).toBeNull();
    });

  test('creates account and redirects after successful signup', async () => {
    // Mock the global fetch function to simulate a successful signup API response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: "fake-token" }),
      } as Response)
    ) as jest.Mock;

    render(<SignupPage />);
    
    // Fill in email and password fields
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "securePassword" } });
    
    // Click the "Sign Up" button
    const signupButton = screen.getByRole('button', { name: /sign up/i });
    fireEvent.click(signupButton);
    
    // Wait for the async actions to complete and then verify:
    await waitFor(() => {
      // Check that fetch was called with the correct URL and options
      expect(global.fetch).toHaveBeenCalledWith("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@example.com", password: "securePassword" }),
      });
      
      // Verify that localStorage is updated with the token from the response
      expect(localStorage.getItem("token")).toEqual("fake-token");
      
      // Verify that the router pushed to "/preferences"
      expect(mockPush).toHaveBeenCalledWith("/preferences");
    });
  });
});
