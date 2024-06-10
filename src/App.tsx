import ShoppingCart from "./components/ShoppingCart";
import ProductListing from "./components/ProductListing";
import ToggleAddProductButton from "./components/ToggleAddProductForm";
import { Product as ProductType, NewProduct } from "./Types/Product";
import { useEffect, useState } from "react";
import {
  getAllProducts,
  addNewProduct,
  editProduct,
  deleteProduct,
} from "./services/product";
import {
  addToShoppingCart,
  checkout,
  getShoppingCart,
} from "./services/ShoppingCart";

function App() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [cartItems, setCartItems] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response);
      } catch (error) {
        console.error();
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchShoppingCart = async () => {
      try {
        const response = await getShoppingCart();

        setCartItems(response);
      } catch (error) {
        console.error();
      }
    };

    fetchShoppingCart();
  }, []);

  const handleAddingProduct = async (
    product: NewProduct,
    callback?: () => void
  ) => {
    try {
      const newProduct = await addNewProduct(product);

      setProducts((prevProducts) => prevProducts.concat(newProduct));
      if (callback) callback();
    } catch (error) {
      console.error();
    }
  };

  const handleEditProduct = async (product: ProductType) => {
    try {
      const id = product._id;

      const editedProduct = await editProduct(product, id);
      
      setProducts((prevState) =>
        prevState.map((product) =>
          product._id === id ? editedProduct : product
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletionOfProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts((prevState) =>
        prevState.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCartItem = async (productId: string) => {
    try {
      const { product, item } = await addToShoppingCart(productId);

      setCartItems((prevState) => {
        const isCartItem = cartItems.find(
          (cartItem) => cartItem._id === item._id
        );

        if (isCartItem) {
          return prevState.map((cartItem) =>
            cartItem._id === item._id ? item : cartItem
          );
        } else {
          return prevState.concat(item);
        }
      });

      setProducts((prevState) =>
        prevState.map((shopProduct) =>
          shopProduct._id === productId ? product : shopProduct
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = async () => {
    try {
      await checkout();
      setCartItems([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="app">
      <header>
        <h1>The Shop!</h1>
        {<ShoppingCart cartItems={cartItems} onCheckout={handleCheckout} />}
      </header>

      <main>
        <ProductListing
          products={products}
          onEditingProduct={handleEditProduct}
          onProductDeletion={handleDeletionOfProduct}
          onAddToCartItem={handleAddCartItem}
        />
        <ToggleAddProductButton onFormSubmission={handleAddingProduct} />
      </main>
    </div>
  );
}

export default App;
