import React, { useCallback, useEffect, useState } from "react";
import { Button, Grid, makeStyles, Paper, TextField } from "@material-ui/core";
import Loading from "components/loading/Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as services from "services/DiscountServices";
import { Search } from "@material-ui/icons";
import ClearAllIcon from '@material-ui/icons/ClearAll';
import { useHistory } from 'react-router-dom'
// import DiscountTable from "./DiscountTable";
import { currency } from "utils/formatCurrency";
import TableData from 'components/table/TableData'
import CommonForm from 'components/dialog/CommonForm'

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
  // { id: "id", label: "Mã", minWidth: 50, isShow: false },
  { id: "id", label: "Mã sản phẩm", minWidth: 50, isShow: true },
  { id: "productMainImage", label: "Image", minWidth: 100, type: "image", isShow: false },
  { id: "productName", label: "Tên sản phẩm", minWidth: 170, type: "text", isShow: false },
  { id: "price", label: "Giá bán", minWidth: 120, type: "number", isShow: false, format: (value) => currency(value), },
  { id: "real_price", label: "Giá sau giảm", minWidth: 120, type: "number", isShow: false, format: (value) => currency(value), },
  {
    id: "quantity_item",
    label: "Còn lại",
    minWidth: 50,
    numeric: true,
    type: "number",
    isShow: false
  },
  {
    id: "type",
    label: "Loại giảm giá",
    minWidth: 120,
    type: "select",
    isShow: true,
    format: (value) => value === 1 ? "Theo phần trăm" : "Theo giá tiền",
  },
  {
    id: "value",
    label: "Giá trị",
    minWidth: 100,
    numeric: true,
    type: "number",
    isShow: true,
    format: (value) => value > 100 ? currency(value) : value + '%',
  },
  { id: "status", label: "Khuyến mãi", minWidth: 150, type: "number", isShow: false, format: (value) => value === 1 ? "Có" : "Không", },
];

const Discount = (props) => {
  const [products, setProducts] = useState([]);
  const [item, setItem] = useState("");
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  //   const category = props.match.params.category;
  const history = useHistory();
  const search = new URLSearchParams(window.location.search);
  const name = search.get('name');

  const getData = useCallback(() => {
    let searchObj = {};
    searchObj.limit = rowsPerPage;
    searchObj.page = page + 1;
    searchObj.keyword = name ? name : '';
    // searchObj.category = category;
    services
      .getAllProductDiscount(searchObj)
      .then((res) => {
        setLoading(false);
        setProducts([...res.data.content]);
        setTotalElements(res.data.totalElements);
      })
      .catch((err) => console.log(err));
  }, [name, page, rowsPerPage]);

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

  const [openDialog, setOpendialog] = useState(false);

  const handleCloseDialog = () => {
    setOpendialog(false);
  };

  const handleOpendialog = (id) => {
    if (id) {
      services.getOneDiscountItem(id)
        .then((res) => setItem(res.data))
        .catch((err) => console.log(err));
    } else {
      setItem({});
    }
    setOpendialog(true);
  };

  const handleSaveCategory = (data) => {
    // const { id, code } = data;
    console.log(data);
    const newData = {...data};
    newData.value = parseInt(data.value);
    services.updateDiscountProduct(newData)
      .then(() => {
        handleCloseDialog();
        getData();
        toast.success("Cập nhật thành công");
      })
      .catch((err) =>
        toast.error("Cập nhật không thành công")
      );
  }

const handleDeleteItem = (id) => {
  services.deleteDiscountProduct(id)
    .then(() => {
      getData();
      toast.success("Cập nhật thành công");
    })
    .catch((err) => toast.error("Cập nhật không thành công"));
};

useEffect(() => {
  document.title = "E-Shop Admin | Inventory";
  getData();
}, [getData]);

return (
  <div>
    <h2 className="page-header">Quản lý khuyến mãi</h2>
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
                    <TableData
                      data={products}
                      columns={columns}
                      handleDeleteItem={handleDeleteItem}
                      handleOpendialog={handleOpendialog}
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
    <CommonForm
        fields={columns}
        open={openDialog}
        onClose={handleCloseDialog}
        title="Khuyến mãi"
        item={item}
        onSaveItem={handleSaveCategory}
        selectedList={
          [
            {
              name: 'Giảm theo %',
              code: 1,
            },
            {
              name: 'Giảm theo giá tiền',
              code: 2
            }
          ]
        }
      />
  </div>
);
};

export default Discount;
