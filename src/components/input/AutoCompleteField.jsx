import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function AutoCompleteField({name, label, value, onChange}) {
  return (
    <Autocomplete
      id="combo-box-demo"
      options={value}
      getOptionLabel={(option) => option.title}
      fullWidth
      onChange={onChange}
      renderInput={(params) => (
        <TextField {...params} name={name} label={label} variant="outlined" />
      )}
    />
  );
}
