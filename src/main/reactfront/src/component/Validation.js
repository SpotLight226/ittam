import { useState } from "react";
import Validate from "./Validate";

function Validation(initialState, Validate) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({}); 

  const validationhandleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const validationhandleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = Validate(values);
    setErrors(validationErrors);
    if(Object.keys(validationErrors).length === 0) {
      console.log("데이터 전송 성공");
    }else{
      console.log("전송 실패");
    }
  }
  return{
    validationhandleChange, validationhandleSubmit, values, errors
  };
    
  
}

export default Validation;