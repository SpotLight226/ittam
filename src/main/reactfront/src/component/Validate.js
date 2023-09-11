

function Validate(values) {
  let errors = {};

  if(!values.sw_price) {
    errors.sw_price = "가격은 필수 입력";
  }


  return errors;
}

export default Validate;