import { useEffect, useState } from "react";
export function useEditForm(initialValue, submitCallback) {
  const [values, setValues] = useState(initialValue);

  useEffect(() => {
    setValues(initialValue);
  }, [initialValue]);

  const changeHandler = (e) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await submitCallback(values);
    setValues(initialValue);
  };

  return { values, changeHandler, submitHandler };
}
