import React, { useCallback, useEffect, useState } from "react";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import Loading from "components/loading/Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as services from "services/UserServices";
import CustomerTable from "./CustomerTable";
import CommonForm from "components/dialog/CommonForm";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
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
  { id: "username", label: "Tên tài khoản", minWidth: 100, type: 'text', isShow: true },
  { id: "fullName", label: "Họ Tên", minWidth: 170, type: "text", isShow: true },
  { id: "email", label: "Email", minWidth: 170, type: "text", isShow: true },
  { id: "phone", label: "Số điện thoại", minWidth: 170, type: "text", isShow: true },
  { id: "dateOfBirth", label: "Ngày sinh", minWidth: 170, type: "text", isShow: true },
  { id: "display", label: "Trạng thái", minWidth: 170, type: "number", isShow: false, format: (value) => value === 1 ? "Active" : "Not Active", },
];

const Customer = (props) => {
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
    console.log(data);
    services.updateItem(data)
      .then(() => {
        toast.success('Cập nhật thành công!')
      })
      .catch(err => toast.error('Cập nhật không thành công!'))
  };

  const getData = useCallback(() => {
    const searchObj = {};
    searchObj.limit = rowsPerPage;
    searchObj.page = page;
    searchObj.keyword = '';
    services.getAllCustomer(searchObj)
      .then((res) => {
        setLoading(false);
        setCustomers([...res.data.content]);
        setTotalElements(res.data.totalElements);
      })
      .catch((err) => console.log(err));
  }, [page, rowsPerPage]);

  const handleDeleteItem = (id) => {
    // console.log(id);
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
      <h2 className="page-header">Quản lý khách hàng</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  {loading ? (
                    <Loading />
                  ) : (
                    <Paper className={classes.root}>
                      <CustomerTable
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
        title="User"
        item={item}
        onSaveItem={handleSaveItem}
      />
    </div>
  );
};

export default Customer;
