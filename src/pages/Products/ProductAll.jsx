import React, { useCallback, useEffect, useState } from "react";
import { Button, Grid, makeStyles, Paper } from "@material-ui/core";
import { currency } from "utils/formatCurrency";
import AddIcon from "@material-ui/icons/Add";
import Loading from "components/loading/Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchForm from "components/search-form/SearchForm";
import {
  getAllProduct,
  deleteItem,
} from "services/ProductServices";
import ProductTable from "./ProductTable";
import { Link } from "react-router-dom";
import useTimeout from "hooks/useTimeout";
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
  { id: "mainImage", label: "Hình ảnh", minWidth: 120, type: "image" },
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
    label: "Giảm giá",
    minWidth: 100,
    type: "number",
    format: (value) => value + "%",
  },
  {
    id: "category",
    label: "Danh mục",
    minWidth: 120,
    type: "select",
  },
  { id: "display", label: "Trạng thái", minWidth: 120, type: "number", isShow: false, format: (value) => value === 1 ? "Hiển thị" : "Không hiển thị", },
  {
    id: "createdDate",
    label: "Ngày tạo",
    minWidth: 120,
    type: "text",
    format: (value) => currency(value),
  },
];

const ProductAll = (props) => {
  const [products, setProducts] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name") ? params.get("name") : "";
  const sku = params.get("sku") ? params.get("sku") : "";
  const category = params.get("category") ? params.get("category") : "";
  const brand = params.get("brand") ? params.get("brand") : "";
  const display = params.get("display") ? params.get("display") : "";
  const search = {
    name,
    sku,
    category,
    brand,
    display,
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
    searchObj.name = name;
    searchObj.sku = sku;
    searchObj.category = category;
    searchObj.brand = brand;
    searchObj.display = display;
    getAllProduct(searchObj)
      .then((res) => {
        setProducts([...res.data.content]);
        setTotalElements(res.data.totalElements);
      })
      .catch((err) => console.log(err));
  }, [brand, category, display, name, page, rowsPerPage, sku]);

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        getData();
        toast.success("Cập nhật trạng thái thành công");
      })
      .catch((err) => toast.error("Cập nhật trạng thái không thành công"));
  };

  useEffect(() => {
    document.title = "E-Shop Admin | Products";
    getData();
  }, [getData]);

  useTimeout(() => setLoading(false), loading ? 1000 : null);

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
                        totalElements={totalElements}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={setNewRowsPerPage}
                        handleDeleteItem={handleDeleteItem}
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

export default ProductAll;
