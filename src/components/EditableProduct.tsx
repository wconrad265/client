import { NewProduct, Product as ProductType } from "../Types/Product";
import { useState } from "react";
import Form from "./Form";
import EditableProductDetails from "./EditableProductDetails";

interface EditableProductProps {
  onEditingProduct: (product: ProductType) => void;
  onProductDeletion: (id: string) => void;
  onAddToCartItem: (id: string) => void;
  product: ProductType;
}

const EditableProduct = ({
  onEditingProduct,
  onProductDeletion,
  onAddToCartItem,
  product,
}: EditableProductProps) => {
  const [isEditFormVisible, setEditFormVisible] = useState(false);

  const { title, price, quantity } = product;

  const handleEditFormVisibility = () => {
    setEditFormVisible((prevState) => !prevState);
  };

  const handleEditFormSubmission = async (newProductInfo: NewProduct) => {
    const editedProduct = { ...product, ...newProductInfo };
    await onEditingProduct(editedProduct);
  };

  return (
    <>
      <li className="product">
        <EditableProductDetails
          onEditFormVisibility={handleEditFormVisibility}
          onProductDeletion={onProductDeletion}
          onAddToCartItem={onAddToCartItem}
          {...product}
        />
        {isEditFormVisible && (
          <Form
            onFormSubmission={handleEditFormSubmission}
            className="edit-form"
            onFormVisibility={handleEditFormVisibility}
            submitButtonText={"Update"}
            initialName={title}
            initialPrice={String(price)}
            initialQuantity={String(quantity)}
          />
        )}
      </li>
    </>
  );
};

export default EditableProduct;
