import * as yup from "yup";

const digitsOnly = (value) =>
  /^\d*[\.{1}\d*]\d*$/.test(value) || value.length === 0;

export const schema = yup.object().shape({
  title: yup.string().min(3).max(32).required("title is required"),
  description: yup.string(),
  noOfGraphics: yup.string().required("No of graphics is required"),
  price: yup.number().typeError("Phone must be a number").required(),
  comparePrice: yup.number().typeError("Phone must be a number"),
  shipPrice: yup.number().typeError("Phone must be a number"),
  sku: yup.string().min(3).max(32).required(),
  quantity: yup.number().positive().integer(),
  url: yup.string(),
});
