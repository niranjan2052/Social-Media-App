import React from "react";

export const FormInput = ({
  formik,
  label,
  type = "text",
  name,
  placeholder,
  autoComplete = "off",
  required = false,
  as,
}) => {
  return (
    <>
      <input
        type={!as ? type : undefined}
        name={name}
        id={name}
        as={as}
        value={type != "password" ? formik.values[name] : undefined}
        required={required}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        isInvalid={formik.touched[name] && formik.errors[name]}
      />

      {formik.touched[name] && formik.errors[name] && (
        <div>{formik.errors[name]}</div>
      )}
    </>
  );
};
