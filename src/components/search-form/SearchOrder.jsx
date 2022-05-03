import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    margin: "5px 0",
    width: "33.33%",
  },
  input: {
    flex: 1,
    fontSize: "1.3rem",
  },
  text: {
    fontSize: "1.3rem",
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  searchWrapper: {
    float: "right",
    margin: "15px 0",
  },
}));

export default function SearchForm({ params }) {
  const classes = useStyles();
  const history = useHistory();

  const [data, setData] = useState({
      status: params.status ? params.status : 3,
      last_date: params.last_date ? params.last_date : 0
  })

  const handleOnChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = () => {
    const search = {
      ...data,
    }
    history.push(
      `?last_date=${search.last_date}&status=${search.status}`
    );
  };

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.root}>
        <FormControl fullWidth className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">
              Ngày đặt hàng
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              name="last_date"
              value={data.last_date}
              onChange={handleOnChange}
              className={classes.text}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left"
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left"
                },
                getContentAnchorEl: null
              }}
            >
              <MenuItem value={1} className={classes.text}>
                Hôm nay
              </MenuItem>
              <MenuItem value={7} className={classes.text}>
                7 ngày qua
              </MenuItem>
              <MenuItem value={30} className={classes.text}>
                30 ngày qua
              </MenuItem>
              <MenuItem value={0} className={classes.text}>
                Toàn thời gian
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.root}>
          
        </div>
        <div className={classes.root}>
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">
              Trạng thái
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              name="status"
              value={data.status}
              onChange={handleOnChange}
              className={classes.text}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left"
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left"
                },
                getContentAnchorEl: null
              }}
            >
              <MenuItem value={3} className={classes.text}>
                Tất cả
              </MenuItem>
              <MenuItem value={2} className={classes.text}>
                Đã hoàn thành
              </MenuItem>
              <MenuItem value={1} className={classes.text}>
                Đang giao hàng
              </MenuItem>
              <MenuItem value={0} className={classes.text}>
                Đang chờ xác nhận
              </MenuItem>
              <MenuItem value={-1} className={classes.text}>
                Đã huỷ
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={classes.searchWrapper}>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          className={classes.button}
          onClick={handleSubmit}
          startIcon={<Search />}
        >
          <Link to="#">Tìm kiếm</Link>
        </Button>
      </div>
    </>
  );
}
