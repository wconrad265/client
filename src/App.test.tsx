import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import productServices from "./services/product";
import shoppingCartServices from "./services/ShoppingCart";
import { Product } from "./Types/Product";
import App from "./App";

vi.mock("./services/product");
vi.mock("./services/ShoppingCart");
const mockedProductServices = vi.mocked(productServices, true);
const mockedShoppingCartSErvices = vi.mocked(shoppingCartServices, true);
const mockProducts: Product[] = [
  {
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
    createdAt: "2020-10-04T05:57:02.777Z",
    updatedAt: "2020-10-04T05:57:02.777Z",
  },
  {
    _id: "2",
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 0,
    price: 649.99,
    createdAt: "2020-10-04T05:57:02.777Z",
    updatedAt: "2020-10-04T05:57:02.777Z",
  },
  {
    _id: "3",
    title: "Yamaha Portable Keyboard",
    quantity: 2,
    price: 155.99,
    createdAt: "2020-10-04T05:57:02.777Z",
    updatedAt: "2020-10-04T05:57:02.777Z",
  },
  {
    _id: "4",
    title: "Tinker, Tailor, Soldier, Spy - A John le Carre Novel",
    quantity: 12,
    price: 13.74,
    createdAt: "2020-10-04T05:57:02.777Z",
    updatedAt: "2020-10-04T05:57:02.777Z",
  },
];

const mockCart: Product[] = [
  {
    _id: "1",
    title: "Amazon Kindle E-reader",
    quantity: 1,
    price: 79.99,
    createdAt: "2020-10-04T05:57:02.777Z",
    updatedAt: "2020-10-04T05:57:02.777Z",
  },
  {
    _id: "2",
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 3,
    price: 649.99,
    createdAt: "2020-10-04T05:57:02.777Z",
    updatedAt: "2020-10-04T05:57:02.777Z",
  },
];

const addedProduct: Product = {
  _id: "5",
  title: "Wheel",
  quantity: 2,
  price: 10,
  createdAt: "2020-10-04T05:57:02.777Z",
  updatedAt: "2020-10-04T05:57:02.777Z",
};

describe("App", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("the initial page loads the products", async () => {
    mockedProductServices.getAllProducts.mockResolvedValue(mockProducts);
    mockedShoppingCartSErvices.getShoppingCart.mockResolvedValue([]);

    render(<App />);

    const heading = await screen.findByRole("heading", {
      level: 3,
      name: "Amazon Kindle E-reader",
    });

    expect(heading).toBeInTheDocument();
  });

  it("the initial page loads the items in the shopping cart if the shopping cart is not empty", async () => {
    mockedProductServices.getAllProducts.mockResolvedValue(mockProducts);
    mockedShoppingCartSErvices.getShoppingCart.mockResolvedValue(mockCart);

    render(<App />);

    const table = await screen.findByRole("table");
    const tableHeading = within(table).getByRole("columnheader", {
      name: "Apple 10.5-Inch iPad Pro",
    });

    expect(tableHeading).toBeInTheDocument();
  });

  it("the page does not load the shopping cart table if it is empty", async () => {
    mockedProductServices.getAllProducts.mockResolvedValue(mockProducts);
    mockedShoppingCartSErvices.getShoppingCart.mockResolvedValue([]);

    render(<App />);

    const paragraph = await screen.findByText("Your cart is empty");

    expect(paragraph).toBeInTheDocument();
  });

  it("clicking add Product adds the product to the store", async () => {
    mockedProductServices.getAllProducts.mockResolvedValue(mockProducts);
    mockedShoppingCartSErvices.getShoppingCart.mockResolvedValue(mockCart);
    mockedProductServices.addNewProduct.mockResolvedValue(addedProduct);

    render(<App />);

    const addProductButton = screen.getByRole("button", {
      name: "Add A Product",
    });

    await userEvent.click(addProductButton);

    const user = userEvent.setup();

    const inputProductName = screen.getByRole("textbox", {
      name: "Product Name:",
    });
    const inputProductPrice = screen.getByLabelText("Product Price:");
    const inputProductQuantity = screen.getByLabelText("Product Quantity:");

    await user.type(inputProductName, "Wheel");
    await user.type(inputProductPrice, "10");
    await user.type(inputProductQuantity, "2");

    const addButton = screen.getByRole("button", { name: "Add" });

    await userEvent.click(addButton);

    const heading = await screen.findByRole("heading", {
      level: 3,
      name: "Wheel",
    });

    expect(heading).toBeInTheDocument();
  });

  it("clicking addToCart adds the product to the users ShoppingCart", async () => {
    const productAddedToCart = {
      _id: "1",
      title: "Amazon Kindle E-reader",
      quantity: 5,
      price: 79.99,
      createdAt: "2020-10-04T05:57:02.777Z",
      updatedAt: "2020-10-04T05:57:02.777Z",
    };

    const product = { ...productAddedToCart, quantity: 4 };

    mockedProductServices.getAllProducts.mockResolvedValue([
      productAddedToCart,
    ]);
    mockedShoppingCartSErvices.getShoppingCart.mockResolvedValue(mockCart);
    mockedShoppingCartSErvices.addToShoppingCart.mockResolvedValue({
      product,
      item: productAddedToCart,
    });

    render(<App />);

    const addToShoppingCart = await screen.findByRole("button", {
      name: "Add to Cart",
    });

    await userEvent.click(addToShoppingCart);

    const table = await screen.findByRole("table");
    const tableHeading = within(table).getByRole("columnheader", {
      name: "Amazon Kindle E-reader",
    });

    expect(tableHeading).toBeInTheDocument();
  });

  it("clicking addToCart adds deincrements the product added quantity by 1", async () => {
    const productAddedToCart = {
      _id: "1",
      title: "Amazon Kindle E-reader",
      quantity: 5,
      price: 79.99,
      createdAt: "2020-10-04T05:57:02.777Z",
      updatedAt: "2020-10-04T05:57:02.777Z",
    };

    const product = { ...productAddedToCart, quantity: 4 };

    mockedProductServices.getAllProducts.mockResolvedValue(mockProducts);
    mockedShoppingCartSErvices.getShoppingCart.mockResolvedValue(mockCart);
    mockedShoppingCartSErvices.addToShoppingCart.mockResolvedValue({
      product,
      item: productAddedToCart,
    });

    render(<App />);

    const addToShoppingCart = await screen.findAllByRole("button", {
      name: "Add to Cart",
    });

    await userEvent.click(addToShoppingCart[0]);

    const updatedQuantity = await screen.findByText("4");

    expect(updatedQuantity).toBeInTheDocument();
  });
});
