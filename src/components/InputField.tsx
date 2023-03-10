import {
  StandardTextFieldProps,
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { FieldHookConfig, useField } from "formik";
import React from "react";
import { FunctionComponent } from "react";

type IInputFieldProps = StandardTextFieldProps;
const InputField: FunctionComponent<IInputFieldProps & FieldHookConfig<any>> = (
  props
) => {
  const [filed, meta] = useField(props);
  return (
    <TextField
      {...props}
      error={Boolean(meta.touched && meta.error)}
      value={filed.value}
      onChange={filed.onChange}
      onBlur={filed.onBlur}
      helperText={meta.error}
    />
  );
};

export default InputField;
