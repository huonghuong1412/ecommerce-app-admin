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
import {
    reportDetailProductByCategory,
} from "services/ReportServices";
import useTimeout from "hooks/useTimeout";
import { currency } from "utils/formatCurrency";
import { Link, useHistory } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Search } from "@material-ui/icons";
import SelectField from "components/input/SelectField";
const columns = [
  {
    id: "id",
    label: "Mã sản phẩm",
    minWidth: 170,
    numberic: true,
    type: "number",
  },
  { id: "product_name", label: "Sản phẩm", minWidth: 170, type: "text" },
  { id: "product_sku", label: "SKU", minWidth: 170, type: "text" },
  {
    id: "product_category",
    label: "Danh mục",
    minWidth: 170,
    type: "text",
  },
  {
    id: "product_brand",
    label: "Thương hiệu",
    minWidth: 170,
    type: "text",
  },
  {
    id: "quantity_sold",
    label: "Đơn vị đã bán",
    minWidth: 170,
    numberic: true,
    type: "number",
  },
  {
    id: "total_price",
    label: "Doanh thu",
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
    width: 150,
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
        <Link to={`/admin/report/view-product/${id}`}>
          <VisibilityIcon color="primary" />
        </Link>
      </IconButton>
    </TableCell>
  );
};


export default function ReportDetailProductByCategory(props) {
  const [data, setData] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const classes = useStyles();
  const history = useHistory();
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

  const getData = useCallback(() => {
    const id = props.match.params.id;
    let searchObj = {};
    searchObj.limit = rowsPerPage;
    searchObj.page = page + 1;
    searchObj.last_date = last_date;
    reportDetailProductByCategory(id, searchObj)
      .then((res) => {
        setData([...res.data.content]);
        setTotalElements(res.data.totalElements);
      })
      .catch((err) => console.log(err));
  }, [last_date, page, props.match.params.id, rowsPerPage]);

  useTimeout(() => setLoading(false), loading ? 1000 : null);

  useEffect(() => {
    document.title = "E-Shop Admin | Payments";
    getData();
  }, [getData]);
  return (
    <div>
      <h2 className="page-header">Thống kê sản phẩm</h2>
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
                          <h3>Thống kê số lượng đã bán</h3>
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
