import React, { useEffect, useState } from "react";
import {
  Dialog,
  Button,
  Grid,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  makeStyles,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
const useStyles = makeStyles({
  footer: {
    padding: "24px",
  },
  title: {
    fontSize: "2rem",
    textAlign: "center",
    background: "#e74c3c",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: "2rem",
    marginRight: "5px",
  },
  textBody: {
    display: "block",
    fontSize: "1.8rem",
    fontWeight: 600,
    color: "#333",
    padding: "12px",
    marginTop: '25px',
    textAlign: "center",
  },
  warning: {
    fontWeight: 800,
    fontSize: "2.4rem",
    color: "#e74c3c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

function AlertDialog(props) {
  const { open, onClose, onSubmit, title, item } = props;
  const classes = useStyles();
  const [data, setData] = useState(item);

  useEffect(() => {
    if (item.id) {
      setData(item);
    }
  }, [item]);

  const handleFormSubmit = () => {
    let { id } = data;
    if (id) {
      onSubmit(id);
    }
  };

  return (
    <Grid className="" container spacing={2}>
      <Grid item sm={12} xs={12}>
        <Dialog
          className={classes.root}
          open={open}
          fullWidth
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="form-dialog-title" className={classes.title}>
            <span className={classes.title}>
              <Visibility className={classes.icon} />
              {`Ẩn ${title}`}
            </span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <span className={classes.textBody}>Xác nhận ẩn {title} có ID: {item.id}</span>
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.footer}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={onClose}
            >
              Huỷ
            </Button>
            <Button
              onClick={handleFormSubmit}
              variant="outlined"
              size="large"
              color="secondary"
            >
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
}

export default AlertDialog;
