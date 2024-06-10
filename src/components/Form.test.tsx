import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Form from "./Form";

const mockOnFormSubmission = vi.fn();
const mockOnFormVisibility = vi.fn();

describe("Form", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("changes the state of the productName field", async () => {
    render(
      <Form
        onFormSubmission={mockOnFormSubmission}
        onFormVisibility={mockOnFormVisibility}
        className="add-product"
        submitButtonText="Add"
      />
    );

    const user = userEvent.setup();
    const inputProductName = screen.getByRole("textbox", {
      name: "Product Name:",
    });

    await user.type(inputProductName, "Wheel");
    expect(inputProductName).toHaveValue("Wheel");
  });

  it("changes the state of the product-price field", async () => {
    render(
      <Form
        onFormSubmission={mockOnFormSubmission}
        onFormVisibility={mockOnFormVisibility}
        className="add-product"
        submitButtonText="Add"
      />
    );

    const user = userEvent.setup();
    const inputProductPrice = screen.getByLabelText("Product Price:");

    await user.type(inputProductPrice, "10");
    expect(inputProductPrice).toHaveValue(10);
  });

  it("changes the state of the product-quantity field", async () => {
    render(
      <Form
        onFormSubmission={mockOnFormSubmission}
        onFormVisibility={mockOnFormVisibility}
        className="add-product"
        submitButtonText="Add"
      />
    );

    const user = userEvent.setup();
    const inputProductQuantity = screen.getByLabelText("Product Quantity:");

    await user.type(inputProductQuantity, "2");
    expect(inputProductQuantity).toHaveValue(2);
  });

  it("the fields have default values if initialPrice, initialName, initialQuantity are not passed", () => {
    render(
      <Form
        onFormSubmission={mockOnFormSubmission}
        onFormVisibility={mockOnFormVisibility}
        className="add-product"
        submitButtonText="Add"
      />
    );
    const inputProductName = screen.getByRole("textbox", {
      name: "Product Name:",
    });
    const inputProductPrice = screen.getByLabelText("Product Price:");
    const inputProductQuantity = screen.getByLabelText("Product Quantity:");

    expect(inputProductName).toHaveValue("");
    expect(inputProductPrice).toHaveValue(null);
    expect(inputProductQuantity).toHaveValue(null);
  });

  it("the fields initialPrice, initialName, initialQuantity have the values that are passed to them", () => {
    render(
      <Form
        onFormSubmission={mockOnFormSubmission}
        onFormVisibility={mockOnFormVisibility}
        className="add-product"
        submitButtonText="Add"
        initialName="Test Product"
        initialPrice="100"
        initialQuantity="20"
      />
    );
    const inputProductName = screen.getByRole("textbox", {
      name: "Product Name:",
    });
    const inputProductPrice = screen.getByLabelText("Product Price:");
    const inputProductQuantity = screen.getByLabelText("Product Quantity:");

    expect(inputProductName).toHaveValue("Test Product");
    expect(inputProductPrice).toHaveValue(100);
    expect(inputProductQuantity).toHaveValue(20);
  });

  it("When clicking ")
});
