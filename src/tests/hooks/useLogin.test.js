import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import axios from "axios";
import useLogin from "../../hooks/useLogin.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { vi } from "vitest";

vi.mock("axios");
vi.mock("../context/AuthContext");

describe("useLogin hook", () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
    useAuth.mockReturnValue({ dispatch });
    localStorage.setItem.mockClear();
  });

  it("should handle login correctly", async () => {
    const token = "fake-token";
    axios.post.mockResolvedValue({ data: { token } });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      result.current.setUsername("mor_2314");
      result.current.setPassword("83r5^_");
      await result.current.handleLogin({ preventDefault: vi.fn() });
    });

    expect(localStorage.setItem).toHaveBeenCalledWith("token", token);
    expect(dispatch).toHaveBeenCalledWith({ type: "LOGIN", payload: token });
    expect(result.current.isLoading).toBe(false);
    expect(window.location.href).toBe("/dashboard");
  });

  it("should set error state on login failure", async () => {
    axios.post.mockRejectedValue(new Error("Login failed"));

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      result.current.setUsername("testuser");
      result.current.setPassword("password");
      await result.current.handleLogin({ preventDefault: vi.fn() });
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe("Terjadi kesalahan saat login");
  });
});
