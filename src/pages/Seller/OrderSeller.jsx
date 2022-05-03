import React, { useCallback, useEffect, useState } from "react";
import { Grid, makeStyles, Paper } from "@material-ui/core";
import Loading from "components/loading/Loading";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderTable from "../Orders/OrderTable";
import * as services from "services/SellerServices";
import { currency } from "utils/formatCurrency";
import SearchOrder from "components/search-form/SearchOrder";
import { getTokenPrintBill } from "services/GHNServices";

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
  { id: "id", label: "Mã đơn hàng", numeric: true, minWidth: 130, isShow: true },
  { id: "order_code", label: "Mã đơn GHN", minWidth: 130, isShow: false },
  {
    id: "status_order_name",
    label: "Trạng thái",
    minWidth: 150,
    type: "text",
    isShow: true
  },
  { id: "createdDate", label: "Ngày đặt", minWidth: 100, type: "text", isShow: true },
  { id: "description", label: "Sản phẩm", minWidth: 200, type: "text", isShow: true },
  {
    id: "total_item",
    label: "Số lượng",
    numeric: true,
    minWidth: 100,
    type: "number",
    isShow: true,
  },
  {
    id: "total_price",
    label: "Tổng tiền",
    minWidth: 100,
    numeric: true,
    type: "number",
    isShow: true,
    format: (value) => currency(value),
  },
  {
    id: "status_payment_name",
    label: "Thanh toán",
    minWidth: 160,
    isShow: true,
    type: "text",
  },
  {
    id: "ship_name",
    label: "Giao hàng",
    minWidth: 160,
    isShow: true,
    type: "text",
  },
];

function OrderShipper(props) {
  const [orders, setOrders] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const params = new URLSearchParams(window.location.search);
  const last_date = params.get("last_date") ? params.get("last_date") : "";
  const status = params.get("status") ? params.get("status") : "";

  const search = {
    last_date,
    status,
  };

  const getData = useCallback(() => {
    const searchObj = {};
    searchObj.limit = rowsPerPage;
    searchObj.page = page + 1;
    searchObj.last_date = last_date;
    searchObj.status = status;
    services
      .getListOrder(searchObj)
      .then((res) => {
        setLoading(false);
        setOrders(res.data.content);
        setTotalElements(res.data.totalElements);
      })
      .catch((err) => console.log(err));
  }, [last_date, page, rowsPerPage, status]);

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

  const handleSubmitOrder = (order_code) => {
    const data = {
      order_codes: [order_code]
    }
    if (isNaN(order_code)) {
      getTokenPrintBill(data)
        .then((res) => {
          window.open(`https://dev-online-gateway.ghn.vn/a5/public-api/printA5?token=${res.data.data.token}`, '_blank')
        })
        .catch(() =>
          toast.warning("Cập nhật trạng thái đơn hàng không thành công.")
        );
    } else {
      toast.warning("Vui lòng xác nhận đơn hàng trước!")
    }
  };

  useEffect(() => {
    document.title = "E-Shop Admin | Orders";
    getData();
  }, [getData]);

  return (
    <div>
      <h2 className="page-header">Danh sách đơn hàng</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <SearchOrder params={search} />
                </Grid>
                <Grid item xs={12}>
                  {loading ? (
                    <Loading />
                  ) : (
                    <Paper className={classes.root}>
                      <OrderTable
                        data={orders}
                        columns={columns}
                        totalElements={totalElements}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={setNewRowsPerPage}
                        handleSubmitOrder={handleSubmitOrder}
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
}

export default OrderShipper;
