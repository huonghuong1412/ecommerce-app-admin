import React, { useEffect, useState } from "react";
import {
  getAllShipmentMethod,
  getOneItem,
  updateItem,
  deleteItem,
  saveItem,
  checkCode,
} from "services/ShipmentServices";
import {
  Button,
  Grid,
  makeStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Loading from "components/loading/Loading";
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
  { id: "id", label: "ID", minWidth: 170, type: "text", isShow: true},
  { id: "type", label: "Loại giao hàng", minWidth: 170, type: "number", isShow: true },
  { id: "name", label: "Tên Phương thức", minWidth: 170, type: "text", isShow: true},
  { id: "code", label: "Mã Phương thức", minWidth: 170, type: "text", isShow: true},
  { id: "fee", label: "Phí ship (VNĐ)", minWidth: 170, type: "number", isShow: true},
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

export default function Shipments() {
  const [methods, setMethods] = useState([]);

  const classes = useStyles();
  const [item, setItem] = useState("");
  const [loading, setLoading] = useState(true);

  const [openDialog, setOpendialog] = useState(false);
  const [name, setName] = useState("");
  
  const handleChange = (e) => {
    setName(e.target.value);
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
          toast.warning("Mã phương thức giao hàng đã được sử dụng");
        } else {
          if (data.id) {
            updateItem(data)
              .then((res) => {
                handleCloseDialog();
                getData();
                toast.success("Cập nhật phương thức giao hàng thành công");
              })
              .catch((err) =>
                toast.error("Cập nhật phương thức giao hàng không thành công")
              );
          } else {
            saveItem(data)
              .then(() => {
                getData();
                handleCloseDialog();
                toast.success("Thêm mới phương thức giao hàng thành công");
              })
              .catch((err) =>
                toast.error("Thêm phương thức giao hàng không thành công")
              );
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

  const getData = () => {
    getAllShipmentMethod()
      .then((res) => {
        setMethods([...res.data.content]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleCloseDialog = () => {
    setOpendialog(false);
  };
  useEffect(() => {

    document.title = "E-Shop Admin | Shipments"

    getData();
  }, []);
  return (
    <div>
      <h2 className="page-header">Quản lý phương thức giao hàng</h2>
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
                        data={methods}
                        columns={columns}
                        handleDeleteItem={handleDeleteItem}
                        handleOpendialog={handleOpendialog}
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
        title="Phương thức giao hàng"
        item={item}
        onSaveItem={handleSaveItem}
      />
    </div>
  );
}
