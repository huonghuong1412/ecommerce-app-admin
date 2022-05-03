import React, { useCallback, useEffect } from "react";
import {
  deleteItem,
  getAllBrand,
  getOneItem,
  saveItem,
  updateItem,
  checkCode,
} from "services/BrandServices";
import { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Button, Grid, makeStyles, Paper, TextField } from "@material-ui/core";
import CommonForm from "components/dialog/CommonForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "components/loading/Loading";
import TableData from "components/table/TableData";
import { Search } from "@material-ui/icons";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

const columns = [
  { id: "id", label: "ID", minWidth: 170, type: "number", isShow: true },
  { id: "name", label: "Tên thương hiệu", minWidth: 170, type: "text", isShow: true },
  { id: "code", label: "Mã thương hiệu", minWidth: 100, type: "text", isShow: true },
  { id: "madeIn", label: "Quốc gia", minWidth: 100, type: "text", isShow: true },
  { id: "display", label: "Trạng thái", minWidth: 170, type: "number", isShow: false, format: (value) => value === 1 ? "Hiển thị" : "Không hiển thị", },
  { id: "createdDate", label: "Ngày tạo", minWidth: 100, type: "text", isShow: false, },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  visuallyHidden: {
    display: "none",
  },
  text: {
    fontSize: "1.3rem",
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
    width: '75%'
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

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const classes = useStyles();
  const [openDialog, setOpendialog] = useState(false);
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [name, setName] = useState("");
  const params = new URLSearchParams(window.location.search);
  const display = params.get("display") ? params.get("display") : "";
  
  const handleChange = (e) => {
    setName(e.target.value);
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

  const handleOpendialog = (id) => {
    if (id) {
      getOneItem(id)
        .then((res) => setItem(res.data))
        .catch((err) => console.log(err));
    } else {
      setItem({});
    }
    setOpendialog(true);
  };

  const handleSaveItem = (data) => {
    const { id, code } = data;
    if (code) {
      checkCode(id, code).then((res) => {
        if (res.data) {
          toast.warning("Mã thương hiệu đã được sử dụng");
        } else {
          if (id) {
            updateItem(data)
              .then((res) => {
                handleCloseDialog();
                getData();
                toast.success("Cập nhật thương hiệu thành công");
              })
              .catch((err) =>
                toast.error("Cập nhật thương hiệu không thành công")
              );
          } else {
            saveItem(data)
              .then(() => {
                handleCloseDialog();
                getData();
                toast.success("Thêm mới thương hiệu thành công");
              })
              .catch((err) => toast.error("Thêm thương hiệu không thành công"));
          }
        }
      });
    }
  };

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        getData();
        toast.success("Cập nhật trạng thái thành công");
      })
      .catch((err) => toast.error("Cập nhật trạng thái không thành công"));
  };

  const getData = useCallback(() => {
    let searchObj = {};
    searchObj.limit = rowsPerPage;
    searchObj.page = page;
    searchObj.name = name;
    searchObj.display = display;
    getAllBrand(searchObj)
      .then((res) => {
        setBrands([...res.data.content]);
        setTotalElements(res.data.totalElements)
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [display, name, page, rowsPerPage]);

  const handleCloseDialog = () => {
    setOpendialog(false);
  };

  useEffect(() => {
    getData();
    document.title = "E-Shop Admin | Brands";
  }, [getData]);
  return (
    <div>
      <h2 className="page-header">Quản lý thương hiệu sản phẩm</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Grid container spacing={3}>
                <Grid item md={6}>
                <div className={classes.wrapper}>
                     <TextField
                      className={classes.textField}
                      id="outlined-basic"
                      label="Tên sản phẩm..."
                      variant="outlined"
                      name="name"
                      value={name}
                      fullWidth
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
                    >
                      Tìm kiếm
                    </Button>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<AddIcon />}
                    onClick={() => handleOpendialog(null)}
                  >
                    Thêm mới
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  {loading ? (
                    <Loading />
                  ) : (
                    <Paper className={classes.root}>
                      <TableData
                        data={brands}
                        columns={columns}
                        handleOpendialog={handleOpendialog}
                        handleDeleteItem={handleDeleteItem}
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
        title="Thương hiệu"
        item={item}
        onSaveItem={handleSaveItem}
      />
    </div>
  );
}
