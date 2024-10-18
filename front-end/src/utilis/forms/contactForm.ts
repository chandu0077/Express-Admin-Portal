import * as yup from "yup";

export const contactForm = yup.object().shape({
  _id: yup.string().trim().notRequired(),
  name: yup.string().trim().min(2).required("This field can't be empty"),
  phone: yup
    .string()
    .matches(/^[0-9]*$/, "Enter valid 10 digit phone number")
    .length(10, "Enter valid phone number")
    .required("This field can't be empty"),
});
