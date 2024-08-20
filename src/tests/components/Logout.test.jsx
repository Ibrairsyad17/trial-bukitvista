import { describe, it, expect, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { useAuth } from "../../context/AuthContext";
import Logout from "../../components/Logout";
import { vi } from "vitest";

vi.mock("../../context/AuthContext");

describe("Logout component", () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
    useAuth.mockReturnValue({ dispatch });
  });

  it("should call dispatch on logout", () => {
    const { getByText } = render(<Logout />);
    fireEvent.click(getByText("Logout"));
    expect(dispatch).toHaveBeenCalledWith({ type: "LOGOUT" });
  });
});
