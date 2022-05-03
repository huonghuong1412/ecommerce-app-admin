import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
import React from "react";
const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120,
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    display: "none",
  },
  textInput: {
    fontSize: "1.3rem",
    "&& .Mui-disabled": {
      color: "blue"
    }
  },
}));

const ITEM_HEIGHT = 75;
const ITEM_PADDING_TOP = 8;

export default function SelectField(props) {
  const { label, name, value, onChange, data, multiple, required, isShowAll, disabled } =
    props;
  const classes = useStyles();
  return (
    <FormControl
      required
      fullWidth
      className={classes.formControl}
      variant="outlined"
      disabled={disabled === true ? true : false }
    >
      <InputLabel className={classes.textInput}>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        className={classes.textInput}
        multiple={multiple ? multiple : false}
        MenuProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          },
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          getContentAnchorEl: null,
        }}
      >
        {isShowAll ? (
          <MenuItem value={""} className={classes.textInput}>
            Tất cả
          </MenuItem>
        ) : null}
        {data.map((item, index) => {
          return (
            <MenuItem
              key={index}
              value={item.code}
              className={classes.textInput}
            >
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
