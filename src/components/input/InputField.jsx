import { makeStyles, TextField } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120,
  },
  input: {
    display: "none",
  },
  textInput: {
    fontSize: "1.3rem",
    marginTop: 10,
    marginBottom: 10
  },
}));
export default function InputField(props) {
  const { type, label, name, value, onChange, required } = props;
  const classes = useStyles();
  return (
    <TextField
      className={classes.textInput}
      type={type}
      variant="outlined"
      label={label}
      name={name}
      fullWidth
      required={required}
      value={value}
      onChange={onChange}
    />
  );
}
