import { useState } from "react";
import { Product } from "../Types/Product";

interface ProductProps extends Product {
  onProductDeletion: (id: string) => void;
  onAddToCartItem: (id: string) => void;
  onEditFormVisibility: () => void;
}

const EditableProductDetails = ({
  onEditFormVisibility,
  onProductDeletion,
  onAddToCartItem,
  title,
  price,
  quantity,
  _id,
}: ProductProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading((prevState) => !prevState);
    await onAddToCartItem(_id);
    setIsLoading((prevState) => !prevState);
  };

  return (
    <>
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">{price}</p>
        <p className="quantity">{quantity}</p>
        <div className="actions product-actions">
          <button
            className="add-to-cart"
            type="button"
            onClick={handleAddToCart}
            disabled={quantity === 0 || isLoading}
          >
            {isLoading ? "Adding" : "Add to Cart"}
          </button>
          <button type="button" className="edit" onClick={onEditFormVisibility}>
            Edit
          </button>
        </div>
      </div>
      <button
        type="button"
        className="delete-button"
        onClick={() => onProductDeletion(_id)}
      >
        <span>X</span>
      </button>
    </>
  );
};

export default EditableProductDetails;
