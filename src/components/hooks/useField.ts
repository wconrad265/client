import { useState, ChangeEvent } from "react";

const useField = (type: string, id: string, initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const name = id;

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return { type, id, name, value, onChange, reset };
};

export default useField;
