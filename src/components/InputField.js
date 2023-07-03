import { jsx as _jsx } from "react/jsx-runtime";
import { TextField, } from "@mui/material";
import { useField } from "formik";
const InputField = (props) => {
    const [filed, meta] = useField(props);
    return (_jsx(TextField, { ...props, error: Boolean(meta.touched && meta.error), value: filed.value, onChange: filed.onChange, onBlur: filed.onBlur, helperText: meta.error }));
};
export default InputField;
