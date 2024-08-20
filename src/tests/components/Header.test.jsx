import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import this to extend Jest matchers
import Header from "../../components/Header";
import { useAuth } from "../../context/AuthContext";
import { vi } from "vitest";

vi.mock("../../context/AuthContext");

describe("Header component", () => {
  let authState;

  beforeEach(() => {
    authState = { token: "fake-token" };
    useAuth.mockReturnValue({ state: authState });
  });

  it("should render the user's name if authenticated", () => {
    const { getByText } = render(<Header />);
    expect(getByText("Dashboard")).toBeInTheDocument();
  });
});
