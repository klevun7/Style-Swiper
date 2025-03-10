import { render, screen } from "@testing-library/react";
import Index from "./LandingPage";
import "@testing-library/jest-dom";

// Mock next/link to simply render its children
jest.mock("next/link", () => {
  return ({ children }: { children: React.ReactNode }) => children;
});

// Mock next/image to render a simple img element
jest.mock("next/image", () => (props: any) => {
  return <img {...props} alt={props.alt || "mocked image"} />;
});

describe("Landing Page", () => {
  it("renders the main heading", () => {
    render(<Index />);
    expect(screen.getByText("Swipe. Save. Shop.")).toBeInTheDocument();
  });

  it("renders the start swiping button", () => {
    render(<Index />);
    expect(screen.getByRole("button", { name: /start swiping/i })).toBeInTheDocument();
  });

  it("renders feature sections correctly", () => {
    render(<Index />);
    expect(screen.getByText("Swipe")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
    expect(screen.getByText("Custom-Tailored Prefernces")).toBeInTheDocument();
  });
});