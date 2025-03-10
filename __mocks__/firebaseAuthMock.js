// Export the mock functions so they can be controlled in tests
export const mockSignInWithEmailAndPassword = jest.fn();
export const mockOnAuthStateChanged = jest.fn();
export const mockGetAuth = jest.fn();

// Create a mock auth object that will be returned by getAuth
const mockAuthInstance = {};

jest.mock('firebase/auth', () => {
  return {
    getAuth: jest.fn().mockImplementation(() => mockAuthInstance),
    signInWithEmailAndPassword: (...args) => mockSignInWithEmailAndPassword(...args),
    onAuthStateChanged: (...args) => mockOnAuthStateChanged(...args),
  };
});