import useTimeout from "hooks/useTimeout";
import { reportAllOrderByCustomer } from "services/ReportServices";
import React, { useCallback, useEffect, useState } from "react";
import {
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TableCell,
} from "@material-ui/core";
import Loading from "components/loading/Loading";
import TableReport from "components/table/TableReport";
import { currency } from "utils/formatCurrency";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";

const columns = [
  { id: "id", label: "Mã đơn hàng", numeric: true, minWidth: 130 },
  {
    id: "status_order_name",
    label: "Trạng thái",
    minWidth: 180,
    type: "text",
  },
  { id: "createdDate", label: "Ngày đặt", minWidth: 100, type: "text" },
  { id: "description", label: "Sản phẩm", minWidth: 200, type: "text" },
  {
    id: "total_item",
    label: "Số lượng",
    numeric: true,
    minWidth: 100,
    type: "number",
  },
  {
    id: "total_price",
    label: "Tổng tiền",
    minWidth: 100,
    numeric: true,
    type: "number",
    format: (value) => currency(value),
  },
  {
    id: "status_payment_name",
    label: "Thanh toán",
    minWidth: 180,
    type: "text",
  },
];

const renderActions = (id) => {
  return (
    <TableCell component="th" scope="row">
      <IconButton>
        <Link to={`/admin/order/detail/${id}`}>
          <VisibilityIcon color="primary" />
        </Link>
      </IconButton>
    </TableCell>
  );
};

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
    width: "75%",
  },
  button: {
    marginLeft: 10,
    float: "right",
    height: "100%",
    padding: "14px 21px",
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
  },
});

export default function ReportListOrders(props) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
    const id = props.match.params.id;
    reportAllOrderByCustomer(id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [props.match.params.id]);

  useTimeout(() => setLoading(false), loading ? 1000 : null);

  useEffect(() => {
    document.title = "E-Shop Admin | Orders";
    getData();
  }, [getData]);
  return (
    <div className="glOjBk list-cusomer-order">
      <h2 className="heading">
        Thống kê chi tiết các lần đặt hàng của user #{props.match.params.id}
      </h2>
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
                      <div className="card">
                        <div className="card__body">
                          <div className="table-wrapper">
                            <TableReport
                              data={data}
                              columns={columns}
                              totalElements={data.length}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onChangePage={handleChangePage}
                              onChangeRowsPerPage={setNewRowsPerPage}
                              renderActions={renderActions}
                            />
                          </div>
                        </div>
                      </div>
                    </Paper>
                  )}
                </Grid>
                <Grid item md={12}>
                    <Link
                      className="view-list-order"
                      to="#"
                      onClick={() => props.history.goBack()}
                    >
                      &lt;&lt; Quay lại
                    </Link>
                  </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
