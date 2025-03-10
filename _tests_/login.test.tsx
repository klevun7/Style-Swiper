import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import LoginPage from '@/app/login/page';

// Mock auth functions
const mockSignIn = jest.fn();
const mockAuthStateChange = jest.fn();

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock Firebase
jest.mock('@/lib/firebase', () => ({
  app: {},
}));

// Mock Firebase auth with function mocks
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  signInWithEmailAndPassword: (...args) => mockSignIn(...args),
  onAuthStateChanged: (auth, callback) => {
    // Call the auth state callback with null (not logged in)
    mockAuthStateChange(auth, callback);
    callback(null);
    return jest.fn(); // Return unsubscribe function
  },
}));

describe('LoginPage Tests', () => {
  const mockPush = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  test('Test 1: Shows validation error when form is submitted with empty fields', async () => {
    // Render the login page
    render(<LoginPage />);
    
    // Get login button and click it without entering credentials
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    
    // Verify error message is displayed
    const errorMessage = await screen.findByText(/please enter both email and password/i);
    expect(errorMessage).toBeInTheDocument();
    
    // Verify we didn't try to navigate away
    expect(mockPush).not.toHaveBeenCalled();
  });

  test('Test 2: Redirects to preferences page after successful login', async () => {
    // Mock successful login
    mockSignIn.mockResolvedValueOnce({
      user: { uid: 'test-uid', email: 'test@example.com' }
    });
    
    // Render the login page
    render(<LoginPage />);
    
    // Fill in the form
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Submit the form
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);
    
    // Wait for the sign in to complete and verify redirect
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
      expect(mockPush).toHaveBeenCalledWith('/preferences');
    });
  });
});