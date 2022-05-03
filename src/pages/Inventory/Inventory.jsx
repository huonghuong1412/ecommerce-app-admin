import React, { useCallback, useEffect, useState } from "react";
import { Button, Grid, makeStyles, Paper, TextField } from "@material-ui/core";
import Loading from "components/loading/Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as services from "services/InventoryService";
import InventoryTable from "./InventoryTable";
import { Search } from "@material-ui/icons";
import ClearAllIcon from '@material-ui/icons/ClearAll';
import {useHistory} from 'react-router-dom'

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  container: {
    maxHeight: 800,
  },
  visuallyHidden: {
    display: "none",
  },
  text: {
    fontSize: "1.2rem",
  },
  head: {
    fontSize: "1.5rem",
    background: "#349eff",
    paddingTop: "15px",
    paddingBottom: "15px",
    color: "#fff",
  },
  caption: {
    color: "inherit",
    padding: 8,
    fontSize: "1.3rem",
  },
  toolbar: {
    "& > p:nth-of-type(2)": {
      fontSize: "1.3rem",
      fontWeight: 500,
    },
  },
  textField: {
    fontWeight: 500,
    width: '60%'
  },
  button: {
    marginLeft: 10,
    float: "right",
    height: "100%",
    padding: '14px 21px',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center'
  }
});

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "productMainImage", label: "Image", minWidth: 100, type: "image" },
  { id: "productName", label: "Tên sản phẩm", minWidth: 170, type: "text" },
  {
    id: "total_import_item",
    label: "Tổng nhập",
    minWidth: 150,
    numeric: true,
    type: "number",
  },
  {
    id: "quantity_item",
    label: "Còn lại",
    minWidth: 100,
    numeric: true,
    type: "number",
  },
  {
    id: "sold",
    label: "Đã bán",
    minWidth: 100,
    numeric: true,
    type: "number",
  },
];

const Inventory = (props) => {
  const [products, setProducts] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const category = props.match.params.category;
  const history = useHistory();
  const search = new URLSearchParams(window.location.search);
  const name = search.get('name');

  const getData = useCallback(() => {
    let searchObj = {};
    searchObj.limit = rowsPerPage;
    searchObj.page = page + 1;
    searchObj.keyword = name ? name : '';
    searchObj.category = category;
    services
      .getProductsFromInventory(searchObj)
      .then((res) => {
        setLoading(false);
        setProducts([...res.data.content]);
        setTotalElements(res.data.totalElements);
      })
      .catch((err) => console.log(err));
  }, [category, name, page, rowsPerPage]);

  const addQuery = (key, value) => {
    let pathname = window.location.pathname;
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    history.push({
      pathname: pathname,
      search: searchParams.toString(),
    });
  };


  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const setNewPage = (page) => {
    setPage(page);
  };

  const setNewRowsPerPage = (newRows) => {
    setRowsPerPage(newRows);
    setPage(0);
  };

  const handleChangePage = (newPage) => {
    setNewPage(newPage);
  };

  useEffect(() => {
    document.title = "E-Shop Admin | Inventory";
    getData();
  }, [getData]);

  return (
    <div>
      <h2 className="page-header">Quản lý kho hàng</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Grid container spacing={3}>
                <Grid item md={8}>
                  <div className={classes.wrapper}>
                    <TextField
                      className={classes.textField}
                      id="outlined-basic"
                      label="Tên sản phẩm..."
                      variant="outlined"
                      fullWidth
                      name="keyword"
                      value={keyword || ''}
                      onChange={handleChange}
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                    <Button
                      variant="outlined"
                      color="primary"
                      size="large"
                      className={classes.button}
                      startIcon={<Search />}
                      onClick={() => addQuery('name', keyword)}
                    >
                      Tìm kiếm
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="large"
                      className={classes.button}
                      startIcon={<ClearAllIcon />}
                      onClick={() => {
                        addQuery('name', '');
                        setKeyword('')
                      }}
                    >
                      Bỏ lọc
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  {loading ? (
                    <Loading />
                  ) : (
                    <Paper className={classes.root}>
                      <InventoryTable
                        data={products}
                        columns={columns}
                        totalElements={totalElements}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={setNewRowsPerPage}
                      />
                    </Paper>
                  )}
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
