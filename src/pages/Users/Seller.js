import React, { useCallback, useEffect, useState } from "react";
import { Button, Grid, makeStyles, Paper, TextField } from "@material-ui/core";
import Loading from "components/loading/Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as services from "services/UserServices";
import ShipperTable from "./SellerTable";
import CommonForm from "components/dialog/CommonForm";
import { Search, Add as AddIcon } from "@material-ui/icons";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

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

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "username", label: "Tên tài khoản", minWidth: 100, type: 'text', isShow: true },
  { id: "fullName", label: "Họ Tên", minWidth: 170, type: "text", isShow: true },
  { id: "email", label: "Email", minWidth: 170, type: "text", isShow: true },
  { id: "phone", label: "Số điện thoại", minWidth: 170, type: "text", isShow: true },
  { id: "dateOfBirth", label: "Ngày sinh", minWidth: 170, type: "text", isShow: true },
  { id: "cccd", label: "Số CCCD", minWidth: 170, type: "text", isShow: true },
  { id: "exp", label: "Kinh nghiệm", minWidth: 170, type: "select", isShow: true, format: (value) => value === 0 ? "Dưới 1 năm" : value === 1 ? "1 - 2 năm" : value === 2 ? '2 - 3 năm' : 'Trên 3 năm' },
  { id: "display", label: "Trạng thái", minWidth: 170, type: "number", isShow: false, format: (value) => value === 1 ? "Active" : "Not Active", },
];

const Seller = (props) => {
  const [customers, setCustomers] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  const [openDialog, setOpendialog] = useState(false);
  const [item, setItem] = useState({});

  const handleOpendialog = (id) => {
    if (id) {
      services.getOneItem(id)
        .then((res) => setItem(res.data))
        .catch((err) => console.log(err));
    } else {
      setItem({});
    }
    setOpendialog(true);
  };

  const handleSaveItem = (data) => {
    // console.log(data);
    data.role = ['seller'];
    data.password = data.username;
    const { id } = data;
    if (id) {
      services.updateUser(data)
        .then(() => {
          handleCloseDialog();
          getData();
          toast.success('Cập nhật nhân viên thành công!')
        })
        .catch(err => toast.error(err.response.data.message))
    } else {
      services.registerNewUser(data)
        .then(() => {
          handleCloseDialog();
          getData();
          toast.success('Thêm mới nhân viên thành công!')
        })
        .catch(err => toast.error(err.response.data.message))
    }
  };

  const getData = useCallback(() => {
    let searchObj = {};
    searchObj.limit = rowsPerPage;
    searchObj.page = page;
    searchObj.keyword = '';
    services.getAllSeller(searchObj)
      .then((res) => {
        setLoading(false);
        setCustomers([...res.data.content]);
        setTotalElements(res.data.totalElements);
      })
      .catch((err) => console.log(err));
  }, [page, rowsPerPage]);

  const handleDeleteItem = (id) => {
    services.deleteItem(id)
    .then((res) => {
      toast.success(res.data.message);
      getData();
    })
    .catch((err) => toast.error("Cập nhật trạng thái không thành công"));
  handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setOpendialog(false);
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
    document.title = "E-Shop Admin | Customer";
    getData();
  }, [getData]);

  return (
    <div>
      <h2 className="page-header">Quản lý thông tin nhân viên</h2>
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
                      label="Tên nhân viên..."
                      variant="outlined"
                      name="name"
                      //   value={name}
                      fullWidth
                      //   onChange={handleChange}
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
                      <ShipperTable
                        data={customers}
                        columns={columns}
                        totalElements={totalElements}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={setNewRowsPerPage}
                        handleOpendialog={handleOpendialog}
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
      <CommonForm
        fields={columns}
        open={openDialog}
        onClose={handleCloseDialog}
        title="NVBH"
        item={item}
        onSaveItem={handleSaveItem}
        selectedList={
          [
            {
              name: 'Dưới 1 năm',
              code: 0,
            },
            {
              name: '1 - 2 năm',
              code: 1
            },
            {
              name: '2 - 3 năm',
              code: 2
            },
            {
              name: 'Trên 3 năm',
              code: 3
            },
          ]
        }
      />
    </div>
  );
};

export default Seller;
