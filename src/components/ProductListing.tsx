import EditableProduct from "./EditableProduct.tsx";
import { Product as ProductType } from "../Types/Product";

interface ProductListingProps {
  products: ProductType[];
  onEditingProduct: (product: ProductType) => void;
  onProductDeletion: (id: string) => void;
  onAddToCartItem: (id: string) => void;
}

const ProductListing = ({
  products,
  onEditingProduct,
  onProductDeletion,
  onAddToCartItem,
}: ProductListingProps) => {
  const handleProductListCreation = () => {
    return (
      <>
        {products.map((product) => (
          <EditableProduct
            key={product._id}
            onEditingProduct={onEditingProduct}
            onProductDeletion={onProductDeletion}
            onAddToCartItem={onAddToCartItem}
            product={product}
          />
        ))}
      </>
    );
  };

  return (
    <div className="product-listing">
      <h2>Products</h2>
      <ul className="product-list">{handleProductListCreation()}</ul>
    </div>
  );
};

export default ProductListing;
