import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import this to extend Jest matchers
import Login from "../../components/Login";
import useLogin from "../../hooks/useLogin";
import { vi } from "vitest";

vi.mock("../../hooks/useLogin");

describe("Login component", () => {
  let mockUseLogin;

  beforeEach(() => {
    mockUseLogin = {
      username: "",
      setUsername: vi.fn(),
      password: "",
      setPassword: vi.fn(),
      handleLogin: vi.fn(),
      isLoading: false,
      error: null,
    };
    useLogin.mockReturnValue(mockUseLogin);
  });

  it("should render the login form", () => {
    const { getByPlaceholderText, getByRole } = render(<Login />);

    expect(getByPlaceholderText("Username: mor_2314")).toBeInTheDocument();
    expect(getByPlaceholderText("Kata Sandi: 83r5^_")).toBeInTheDocument();
    expect(
      getByRole("button", { name: "Masuk ke Dashboard" }),
    ).toBeInTheDocument();
  });

  it("should display error message if error exists", () => {
    mockUseLogin.error = "Terjadi kesalahan saat login";
    useLogin.mockReturnValue(mockUseLogin);

    const { getByText } = render(<Login />);

    expect(getByText("Terjadi kesalahan saat login")).toBeInTheDocument();
  });
});
