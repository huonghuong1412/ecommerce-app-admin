import React, { useCallback, useEffect, useState } from "react";
import { Button, Grid, makeStyles, Paper } from "@material-ui/core";
import { currency } from "utils/formatCurrency";
import AddIcon from "@material-ui/icons/Add";
import Loading from "components/loading/Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchForm from "components/search-form/SearchForm";
import AlertDialog from "components/dialog/AlertDialog";
import {
  getProductByCategory,
  getOneItem,
  deleteItem,
} from "services/ProductServices";
import ProductTable from "./ProductTable";
import { Link, useParams } from "react-router-dom";

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
  table: {
    minWidth: 700,
  },
  container: {
    maxHeight: 440,
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
  },
  input: {},
  button: {
    margin: "0",
    float: "right",
    height: "100%",
  },
});

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "mainImage", label: "Image", minWidth: 150, type: "image" },
  { id: "name", label: "Tên sản phẩm", minWidth: 200, type: "text" },
  {
    id: "list_price",
    label: "Giá niêm yết",
    minWidth: 120,
    type: "number",
    format: (value) => currency(value),
  },
  {
    id: "price",
    label: "Giá bán",
    minWidth: 100,
    type: "number",
    format: (value) => currency(value),
  },
  {
    id: "percent_discount",
    label: "% Giảm",
    minWidth: 120,
    type: "number",
    format: (value) => value + "%",
  },
  {
    id: "category",
    label: "Danh mục",
    minWidth: 120,
    type: "select",
  },
  {
    id: "subcategory",
    label: "Danh mục con",
    minWidth: 170,
    type: "select",
  },
  {
    id: "brand",
    label: "Thương hiệu",
    minWidth: 170,
    type: "select",
  },
];

const Products = (props) => {
  const [products, setProducts] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const classes = useStyles();
  const params = useParams();
  const search_params = new URLSearchParams(window.location.search);
  const name = search_params.get("name") ? search_params.get("name") : "";
  const sku = search_params.get("sku") ? search_params.get("sku") : "";
  const brand = search_params.get("brand") ? search_params.get("brand") : "";
  const display = search_params.get("display") ? search_params.get("display") : "";
  const search = {
    name,
    sku,
    category: params.category,
    brand,
    display,
  };

  const handleOpenDeletedialog = (id) => {
    getOneItem(id)
      .then((res) => setItem(res.data))
      .catch((err) => console.log(err));
    setOpenDeleteDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDeleteDialog(false);
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

  const getData = useCallback(() => {
    let searchObj = {};
    searchObj.limit = rowsPerPage;
    searchObj.page = page + 1;
    searchObj.category = params.category;
    searchObj.name = name;
    searchObj.sku = sku;
    searchObj.brand = brand;
    searchObj.display = display;
    getProductByCategory(searchObj)
      .then((res) => {
        setLoading(false);
        setProducts([...res.data.content]);
        setTotalElements(res.data.totalElements);
      })
      .catch((err) => console.log(err));
  }, [brand, display, name, page, params.category, rowsPerPage, sku]);

  // const addQuery = (key, value) => {
  //   let pathname = window.location.pathname;
  //   let searchParams = new URLSearchParams(window.location.search);
  //   searchParams.set(key, value);
  //   history.push({
  //     pathname: pathname,
  //     search: searchParams.toString(),
  //   });
  // };

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        toast.success("Xoá sản phẩm thành công");
        getData();
      })
      .catch((err) => toast.error("Xoá sản phẩm không thành công"));
    handleCloseDialog();
  };

  useEffect(() => {
    document.title = "E-Shop Admin | Products";

    getData();
  }, [getData, page, props.match.params.category, rowsPerPage]);

  return (
    <div>
      <h2 className="page-header">Quản lý sản phẩm</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Grid container spacing={3}>
                <Grid item md={12}>
                  <SearchForm params={search} />
                  
                </Grid>
                <Grid item md={12}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<AddIcon />}
                  >
                    <Link to="/admin/product/create">Thêm mới</Link>
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  {loading ? (
                    <Loading />
                  ) : (
                    <Paper className={classes.root}>
                      <ProductTable
                        className={classes.table}
                        data={products}
                        columns={columns}
                        handleOpenDeletedialog={handleOpenDeletedialog}
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
      <AlertDialog
        open={openDeleteDialog}
        onClose={handleCloseDialog}
        title="Sản phẩm"
        item={item}
        onSubmit={handleDeleteItem}
      />
    </div>
  );
};

export default Products;
