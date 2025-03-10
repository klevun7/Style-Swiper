// __tests__/Signup.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import SignupPage from '@/app/signup/page';

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

  test('displays error if server returns invalid email error', async () => {
    // 1) Mock fetch to simulate a server-side Firebase invalid email error
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            error: 'Firebase: Error (auth/invalid-email)',
          }),
      } as Response)
    ) as jest.Mock;

    // 2) Render SignupPage and fill in an obviously invalid email
    render(<SignupPage />);
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'invalidEmail' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: '12345' },
    });

    // 3) Click "Sign Up"
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    // 4) Wait for the error to appear
    await waitFor(() => {
      // The text from data.error is shown in the component
      expect(screen.getByText('Firebase: Error (auth/invalid-email)')).toBeInTheDocument();
    });

    // 5) Ensure no redirect and no token stored
    expect(mockPush).not.toHaveBeenCalled();
    expect(localStorage.getItem('token')).toBeNull();
  });

  test('signs up user successfully and redirects on valid credentials', async () => {
    // 1) Mock fetch to simulate a successful signup
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            token: 'fake-token',
          }),
      } as Response)
    ) as jest.Mock;

    // 2) Render SignupPage and fill in valid fields
    render(<SignupPage />);
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: 'valid@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'securePassword' },
    });

    // 3) Click "Sign Up"
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    // 4) Wait for the fetch, localStorage, and push calls
    await waitFor(() => {
      // Check fetch call
      expect(global.fetch).toHaveBeenCalledWith('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'valid@example.com',
          password: 'securePassword',
        }),
      });

      // localStorage should have the token
      expect(localStorage.getItem('token')).toBe('fake-token');

      // Router redirect to /preferences
      expect(mockPush).toHaveBeenCalledWith('/preferences');
    });
  });
});
