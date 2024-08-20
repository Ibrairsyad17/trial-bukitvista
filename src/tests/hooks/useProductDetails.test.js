import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import useProductDetails from "../../hooks/useProductDetails.js";
import { vi } from "vitest";

vi.mock("axios");

describe("useProductDetails hook", () => {
  beforeEach(() => {
    axios.get.mockClear();
  });

  it("should fetch product details successfully", async () => {
    const product = { id: 1, title: "Test Product" };
    axios.get.mockResolvedValue({ data: product });

    const { result } = renderHook(() => useProductDetails(1));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.product).toEqual(product);
    expect(result.current.error).toBe(null);
  });

  it("should handle loading state correctly", () => {
    const { result } = renderHook(() => useProductDetails(1));

    expect(result.current.loading).toBe(true);
    expect(result.current.product).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it("should handle error state correctly", async () => {
    axios.get.mockRejectedValue(new Error("Failed to fetch product details"));

    const { result } = renderHook(() => useProductDetails(1));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.product).toBe(null);
    expect(result.current.error).toBe("Failed to fetch product details");
  });
});
