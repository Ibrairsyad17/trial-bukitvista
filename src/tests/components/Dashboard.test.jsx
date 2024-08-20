import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { useAuth } from "../../context/AuthContext";
import { useProduct } from "../../context/ProductContext"; // Ensure correct import
import { Navigate } from "react-router-dom";
import Dashboard from "../../components/Dashboard";
import { vi } from "vitest";

vi.mock("../../context/AuthContext");
vi.mock("../../context/ProductContext"); // Mock useProduct
vi.mock("react-router-dom", () => ({
  Navigate: vi.fn(),
}));

describe("Dashboard component", () => {
  let authState;
  let productState;

  beforeEach(() => {
    authState = { token: null };
    productState = { filteredProducts: [] };
    useAuth.mockReturnValue({ state: authState });
    useProduct.mockReturnValue({ state: productState }); // Mock return value
  });

  it("should redirect to login if not authenticated", () => {
    authState.token = null;
    render(<Dashboard />);
    expect(Navigate).toHaveBeenCalledWith({ to: "/login" }, {});
  });
});
