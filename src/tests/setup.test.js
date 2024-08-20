import { expect, vi } from "vitest";
import { configure } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

global.expect = expect;
global.vi = vi;
global.eventUser = userEvent;

configure({ testIdAttribute: "data-testid" });

// Mock window.location to handle navigation in tests
const originalLocation = window.location;
delete window.location;
window.location = {
  ...originalLocation,
  href: "",
  assign: vi.fn(),
  replace: vi.fn(),
};

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;
