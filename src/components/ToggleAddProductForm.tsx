import { useState } from "react";
import Form from "./Form";
import { NewProduct } from "../Types/Product";

interface ToggleAddFromTypes {
  onFormSubmission: (product: NewProduct) => void;
}

const ToggleAddProductButton = ({ onFormSubmission }: ToggleAddFromTypes) => {
  const [isAddFormVisible, setAddForm] = useState(false);

  const handleAddFormVisibility = () => {
    setAddForm((prevState) => !prevState);
  };

  return (
    <>
      {isAddFormVisible ? (
        <Form
          onFormSubmission={onFormSubmission}
          className="add-form"
          onFormVisibility={handleAddFormVisibility}
          submitButtonText={"Add"}
        />
      ) : (
        <p>
          <button
            className="add-product-button"
            onClick={handleAddFormVisibility}
          >
            Add A Product
          </button>
        </p>
      )}
    </>
  );
};

export default ToggleAddProductButton;
