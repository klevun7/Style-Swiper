import "@testing-library/jest-dom";

import { jest } from "@jest/globals";

// ✅ Mock Next.js useRouter globally
jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));
