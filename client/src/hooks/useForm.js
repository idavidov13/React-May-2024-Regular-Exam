import { useEffect, useState } from "react";
export function useForm(initiaalValue, submitCallback) {
  const [values, setValues] = useState(initiaalValue);

  const changeHandler = (e) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    submitCallback(values);
  };

  return { values, changeHandler, submitHandler };
}
