import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TableCell,
} from "@material-ui/core";
import Loading from "components/loading/Loading";
import TableReport from "components/table/TableReport";
import { reportAllCustomer } from "services/ReportServices";
import useTimeout from "hooks/useTimeout";
import { currency } from "utils/formatCurrency";
import { Link, useHistory } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SelectField from "components/input/SelectField";
import { Search } from "@material-ui/icons";

const columns = [
  {
    id: "id",
    label: "Mã khách hàng",
    minWidth: 170,
    numberic: true,
    type: "text",
  },
  { id: "customer_name", label: "Khách hàng", minWidth: 170, type: "text" },
  { id: "customer_phone", label: "Số điện thoại", minWidth: 170, type: "text" },
  {
    id: "quantity_buy",
    label: "Đơn vị đã mua",
    minWidth: 170,
    numberic: true,
    type: "number",
  },
  {
    id: "total_price",
    label: "Doanh thu thuần",
    minWidth: 170,
    type: "number",
    format: (value) => currency(value),
  },
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
    width: "75%",
  },
  button: {
    marginLeft: 10,
    float: "right",
    height: "100%",
    padding: "14px 21px",
    width: 150
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
  },
});

const renderActions = (id) => {
  return (
    <TableCell component="th" scope="row">
      <IconButton>
        <Link to={`/admin/report/view-customer/${id}`}>
          <VisibilityIcon color="primary" />
        </Link>
      </IconButton>
    </TableCell>
  );
};

export default function ReportCustomer() {
  const [data, setData] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const params = new URLSearchParams(window.location.search);
  const last_date = params.get("last_date") ? params.get("last_date") : "";
  const [search, setSearch] = useState("");

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
    searchObj.last_date = last_date;
    reportAllCustomer(searchObj)
      .then((res) => {
        setData([...res.data.content]);
        setTotalElements(res.data.totalElements);
      })
      .catch((err) => console.log(err));
  }, [last_date, page, rowsPerPage]);

  const handleOnChange = (e) => {
    const value = e.target.value;
    setSearch({
      ...search,
      [e.target.name]: value,
    });
  };

  const handleSubmit = () => {
    history.push(`?last_date=${search.last_date}`);
  };

  useTimeout(() => setLoading(false), loading ? 1000 : null);

  useEffect(() => {
    document.title = "E-Shop Admin | Payments";
    getData();
  }, [getData]);
  return (
    <div>
      <h2 className="page-header">Thống kê khách hàng</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <div className={classes.wrapper}>
                    <SelectField
                      label=" Ngày đặt hàng"
                      name="last_date"
                      value={search ? search.last_date : last_date}
                      onChange={handleOnChange}
                      data={[
                        {
                          name: "Hôm nay",
                          code: 1,
                        },
                        {
                          name: "7 ngày qua",
                          code: 7,
                        },
                        {
                          name: "30 ngày qua",
                          code: 30,
                        },
                        {
                          name: "Toàn thời gian",
                          code: 0,
                        },
                      ]}
                    />
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="large"
                      className={classes.button}
                      onClick={handleSubmit}
                      startIcon={<Search />}
                    >
                      <Link to="#">Tìm kiếm</Link>
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  {loading ? (
                    <Loading />
                  ) : (
                    <Paper className={classes.root}>
                      <div className="card">
                        <div className="card__header">
                          <h3>Thống kê số lần mua của khách</h3>
                        </div>
                        <div className="card__body">
                          <div className="table-wrapper">
                            <TableReport
                              data={data}
                              columns={columns}
                              totalElements={totalElements}
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
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
