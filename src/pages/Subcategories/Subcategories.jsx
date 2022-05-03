import {
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useCallback, useEffect, useState } from "react";
import Loading from "components/loading/Loading";
import {
  getAllItem,
  getOne,
  saveItem,
  updateItem,
  deleteItem,
  checkCode,
} from "services/SubcategoryServices";
import { getAllCategory } from "services/CategoryServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonForm from "components/dialog/CommonForm";
import TableData from "components/table/TableData";
import { Search } from "@material-ui/icons";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

const columns = [
  { id: "id", label: "ID", minWidth: 170, type: "text", isShow: true },
  { id: "name", label: "Tên danh mục", minWidth: 170, type: "text", isShow: true },
  { id: "code", label: "Mã danh mục", minWidth: 100, type: "text", isShow: true },
  {
    id: "category_name",
    label: "Danh mục cha",
    minWidth: 100,
    type: "text",
    isShow: false
  },
  {
    id: "categoryCode",
    label: "Mã danh mục cha",
    minWidth: 100,
    type: "select",
    isShow: true
  },
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

function Subcategories(props) {
  const classes = useStyles();
  const [subcategories, setSubCategories] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [item, setItem] = useState("");
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

  const [openDialog, setOpendialog] = useState(false);

  const handleOpendialog = (id) => {
    if (id) {
      getOne(id)
        .then((res) => setItem(res.data))
        .catch((err) => console.log(err));
    } else {
      setItem({});
    }
    setOpendialog(true);
  };

  const handleSaveCategory = (data) => {
    const { id, code } = data;
    if (code) {
      checkCode(id, code).then((res) => {
        if (res.data) {
          toast.warning("Mã danh mục đã được sử dụng");
        } else {
          if (id) {
            updateItem(data)
              .then(() => {
                handleCloseDialog();
                getData();
                toast.success("Cập nhật danh mục thành công");
              })
              .catch((err) =>
                toast.error("Cập nhật danh mục không thành công")
              );
          } else {
            saveItem(data)
              .then(() => {
                handleCloseDialog();
                getData();
                toast.success("Thêm mới danh mục thành công");
              })
              .catch((err) => toast.error("Thêm danh mục không thành công"));
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
    getAllItem(searchObj)
      .then((res) => {
        setSubCategories([...res.data.content]);
        setTotalElements(res.data.totalElements)
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [display, name, page, rowsPerPage]);

  const getListCategory = () => {
    let searchObj = {};
    searchObj.limit = 1000;
    searchObj.page = 0;
    searchObj.display = 2;
    getAllCategory(searchObj)
      .then((res) => setListCategory([...res.data.content]))
      .catch((err) => console.log(err));
  };

  const handleCloseDialog = () => {
    setOpendialog(false);
  };
  useEffect(() => {

    document.title = "E-Shop Admin | SubCategory"

    getData();
    if (openDialog) {
      getListCategory();
    }
  }, [getData, openDialog]);
  return (
    <div>
      <h2 className="page-header">Quản lý danh mục sản phẩm</h2>
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
                        data={subcategories}
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
        title="Danh mục con"
        item={item}
        onSaveItem={handleSaveCategory}
        selectedList={listCategory}
      />
    </div>
  );
}
export default Subcategories;
