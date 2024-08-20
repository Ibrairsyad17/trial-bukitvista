import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useProductList from "../../hooks/useProductList";
import { useProduct } from "../../context/ProductContext";
import { vi } from "vitest";

vi.mock("../../context/ProductContext");

describe("useProductList hook", () => {
  let dispatch;
  let state;

  beforeEach(() => {
    dispatch = vi.fn();
    state = {
      filteredProducts: Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
      })),
      categories: ["Category 1", "Category 2"],
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: 5,
      sort: "asc",
      category: "all",
    };
    useProduct.mockReturnValue({ state, dispatch });
  });

  it("should return the correct initial state", () => {
    const { result } = renderHook(() => useProductList());

    expect(result.current.products.length).toBe(10);
    expect(result.current.categories).toEqual(["Category 1", "Category 2"]);
    expect(result.current.currentPage).toBe(1);
    expect(result.current.itemsPerPage).toBe(10);
    expect(result.current.totalPages).toBe(5);
    expect(result.current.sort).toBe("asc");
    expect(result.current.category).toBe("all");
  });

  it("should handle page change correctly", () => {
    const { result } = renderHook(() => useProductList());

    act(() => {
      result.current.handlePageChange(2);
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "SET_CURRENT_PAGE",
      payload: 2,
    });
  });

  it("should handle sort change correctly", () => {
    const { result } = renderHook(() => useProductList());

    act(() => {
      result.current.handleSortChange({ target: { value: "desc" } });
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "SET_SORT",
      payload: "desc",
    });
  });

  it("should handle limit change correctly", () => {
    const { result } = renderHook(() => useProductList());

    act(() => {
      result.current.handleLimitChange({ target: { value: "20" } });
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "SET_ITEMS_PER_PAGE",
      payload: 20,
    });
  });

  it("should handle category change correctly", () => {
    const { result } = renderHook(() => useProductList());

    act(() => {
      result.current.handleCategoryChange({ target: { value: "Category 1" } });
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: "SET_CATEGORY",
      payload: "Category 1",
    });
  });
});
