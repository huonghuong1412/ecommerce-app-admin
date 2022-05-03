import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  Button,
  Grid,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const useStyles = makeStyles({
  footer: {
    padding: "24px",
  },
  title: {
    fontSize: "2rem",
    textAlign: "center",
    background: "#e74c3c",
    color: "#fff",
  },
  text: {
    fontSize: '1.3rem'
  }
});

function CommonDialog(props) {
  const { open, onClose, onSaveItem, title, item, selectedList, fields } =
    props;
  const classes = useStyles();
  const [data, setData] = useState({});
  const ref = useRef("form");

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    if (item.id) {
      setData(item);
    } else {
      setData({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, selectedList]);

  const handleFormSubmit = () => {
    let { id } = data;
    if (id) {
      onSaveItem(data);
    } else {
      // add item
      onSaveItem(data);
    }
  };

  return (
    <Grid className="" container spacing={2}>
      <Grid item sm={12} xs={12}>
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" className={classes.title}>
            <span className={classes.title}>
              {item.id ? `Cập nhật ${title}` : `Thêm mới ${title}`}
            </span>
          </DialogTitle>
          <ValidatorForm ref={ref} onSubmit={handleFormSubmit}>
            <DialogContent style={{ width: "500px" }}>
              {fields.slice(1).map((field) => {
                if (field.type === "select") {
                  return (
                    <Autocomplete
                      key={field.id}
                      className={classes.text}
                      id="combo-box-demo"
                      fullWidth
                      options={selectedList}
                      getOptionLabel={(option) =>
                        option.name ? option.name : ""
                      }
                      value={
                        selectedList.find(
                          (item) => item.code === data[field.id]
                        ) || ""
                      }
                      onChange={(event, newValue) => {
                        setData({
                          ...data,
                          [field.id]: newValue.code,
                        });
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          className={classes.text}
                          name={field.id}
                          label={field.label}
                          variant="outlined"
                        />
                      )}
                    />
                  );
                }
                if (!field.isShow) {
                  return "";
                }
                return (
                  <TextValidator
                    key={field.id}
                    className={classes.text}
                    margin="normal"
                    // label={field.label}
                    label={
                      <span>
                        <span style={{ color: "red" }}>*</span>
                        {field.label}
                      </span>
                    }
                    name={field.id}
                    type={field.type ? field.type : "text"}
                    variant="outlined"
                    value={data[field.id] || ""}
                    onChange={handleChange}
                    fullWidth
                    validators={["required"]}
                    errorMessages={[`${field.label} là trường bắt buộc`]}
                  />
                );
              })}
            </DialogContent>
            <DialogActions className={classes.footer}>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={onClose}
                className={classes.text}
              >
                Huỷ
              </Button>
              <Button
                onClick={handleFormSubmit}
                variant="outlined"
                size="large"
                color="secondary"
                className={classes.text}
              >
                Xác nhận
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </Grid>
    </Grid>
  );
}

export default CommonDialog;
