import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ToggleAddProductButton from "./ToggleAddProductForm";
import userEvent from "@testing-library/user-event";

const mockedOnFormSubmission = vi.fn();

describe("ToggableAddProductForm", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("Add Product Form is not shown unless button is clicked", async () => {
    render(
      <ToggleAddProductButton onFormSubmission={mockedOnFormSubmission} />
    );

    const form = screen.queryByRole("form");

    expect(form).not.toBeInTheDocument();
  });

  it("clicking the AddProduct Button shows the form to add a product", async () => {
    render(
      <ToggleAddProductButton onFormSubmission={mockedOnFormSubmission} />
    );

    const addProductButton = screen.getByRole("button", {
      name: "Add A Product",
    });

    await userEvent.click(addProductButton);

    const form = screen.getByRole("form");

    expect(form).toBeInTheDocument();
  });

  it("When the form is visible, clicking cancel hides the form", async () => {
    render(
      <ToggleAddProductButton onFormSubmission={mockedOnFormSubmission} />
    );

    const addProductButton = screen.getByRole("button", {
      name: "Add A Product",
    });

    await userEvent.click(addProductButton);

    const form = screen.getByRole("form");

    expect(form).toBeInTheDocument();

    const cancelFormButton = screen.getByRole("button", {
      name: "Cancel",
    });

    await userEvent.click(cancelFormButton);

    const isFormVisible = screen.queryByRole("form");

    expect(isFormVisible).not.toBeInTheDocument();
  });
});
