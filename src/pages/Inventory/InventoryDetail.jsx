import {
  Button,
  Grid,
  Link,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getDetailImport } from "services/InventoryService";
import { currency } from "utils/formatCurrency";

const useStyles = makeStyles({
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
});

const headCells = [
  { id: "", numeric: false, label: "STT", minWidth: 50 },
  {
    id: "inventoryId",
    numeric: true,
    label: "Mã Inventory",
    minWidth: 50,
  },
  {
    id: "importDate",
    numeric: false,
    label: "Ngày nhập",
    minWidth: 100,
  },
  {
    id: "import_quantity",
    numeric: true,
    label: "Số lượng nhập",
    minWidth: 100,
  },
  {
    id: "original_price",
    numeric: true,
    label: "Giá gốc",
    minWidth: 100,
  },
  {
    id: "note",
    label: "Note",
    minWidth: 100,
  },
];

function InventoryDetail(props) {

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const classes = useStyles();

  const [data, setData] = useState([]);

  useEffect(() => {
    const id = props.match.params.id;
    getDetailImport(id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [props.match.params.id]);

  return (
    <>
      <div>
        <h2 className="page-header">Chi tiết các lần nhập sản phẩm</h2>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card__body">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TableContainer className={classes.container}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {headCells.map((headCell) => (
                              <TableCell
                                key={headCell.id}
                                className={classes.head}
                                sortDirection={
                                  orderBy === headCell.id ? order : false
                                }
                              >
                                <TableSortLabel
                                  active={orderBy === headCell.id}
                                  direction={
                                    orderBy === headCell.id ? order : "asc"
                                  }
                                  onClick={createSortHandler(headCell.id)}
                                >
                                  {headCell.label}
                                  {orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                      {order === "desc"
                                        ? "sorted descending"
                                        : "sorted ascending"}
                                    </span>
                                  ) : null}
                                </TableSortLabel>
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {data.map((row, index) => {
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={index}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    className={classes.text}
                                  >
                                    {index + 1}
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    className={classes.text}
                                  >
                                    {row.inventoryId}
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    className={classes.text}
                                  >
                                    {row.importDate}
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    className={classes.text}
                                  >
                                    {row.import_quantity}
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    className={classes.text}
                                  >
                                    {currency(row.original_price)}
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    className={classes.text}
                                    dangerouslySetInnerHTML={{
                                      __html: row.note,
                                    }}
                                  >
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item md={12} sm={12}>
                    <Button variant="outlined" color="primary">
                      <Link to="#" onClick={goBack}>
                        Trở lại
                      </Link>
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InventoryDetail;
