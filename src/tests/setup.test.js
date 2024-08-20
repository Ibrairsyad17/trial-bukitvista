import { expect, vi } from "vitest";
import { configure } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

global.expect = expect;
global.vi = vi;
global.eventUser = userEvent;

configure({ testIdAttribute: "data-testid" });
