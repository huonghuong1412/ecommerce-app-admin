import {
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PrintIcon from "@material-ui/icons/Print";

const useStyles = makeStyles({
  container: {
    maxHeight: 800,
    overflowX: "auto",
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
    position: "sticky",
    right: 0,
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
  sticky: {
    position: "sticky",
    textAlign: "center",
    right: 0,
    background: "#fff",
    boxShadow: "5px 2px 5px rgba(0,0,0,0.1)",
    minWidth: 120,
    borderLeft: "1px solid #555",
  },
});

const OrderTable = (props) => {
  const {
    data,
    columns,
    totalElements,
    rowsPerPage,
    page,
    onChangePage,
    onChangeRowsPerPage,
    handleSubmitOrder,
  } = props;

  const classes = useStyles();
  const handleChangePage = (event, newPage) => {
    onChangePage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onChangeRowsPerPage(+event.target.value);
  };

  return (
    <div>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                if (typeof column.id === "object") {
                  <TableCell
                    style={{ minWidth: `${column.minWidth}px` }}
                    key={column.id.code}
                    className={classes.head}
                    align={column.numeric ? "right" : "left"}
                    padding={column.disablePadding ? "none" : "normal"}
                  >
                    {column.label}
                  </TableCell>;
                }
                if (!column.isShow) {
                  return "";
                }
                return (
                  <TableCell
                    style={{ minWidth: `${column.minWidth}px` }}
                    key={column.id}
                    className={classes.head}
                    align={column.numeric ? "right" : "left"}
                    padding={column.disablePadding ? "none" : "normal"}
                  >
                    {column.label}
                  </TableCell>
                );
              })}
              <TableCell
                style={{
                  minWidth: 120,
                  borderLeft: "1px solid #555",
                  textAlign: "center",
                }}
                className={classes.head}
              >
                Xem
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column, index) => {
                    let value = row[column.id];
                    if (typeof value === "object" && value !== null) {
                      return (
                        <TableCell
                          style={{ minWidth: `${column.minWidth}px` }}
                          key={index}
                          align={column.numeric ? "right" : "left"}
                          className={classes.text}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value.name}
                        </TableCell>
                      );
                    }
                    if (!column.isShow) {
                      return "";
                    }

                    return (
                      <TableCell
                        style={{ minWidth: `${column.minWidth}px` }}
                        key={column.id}
                        align={column.numeric ? "right" : "left"}
                        className={classes.text}
                      >
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.sticky}
                  >
                    <IconButton>
                      <Link to={`/admin/order/detail/${row.id}`}>
                        <VisibilityIcon color="primary" />
                      </Link>
                    </IconButton>
                    {row.order_code && row.ship_type ? (
                      <IconButton
                        onClick={() => handleSubmitOrder(row.ship_type, row.order_code)}
                      >
                        <PrintIcon color="secondary" />
                      </IconButton>
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        className={classes.text}
        rowsPerPageOptions={[1, 2, 3, 5, 10, 25, 100]}
        component="div"
        count={totalElements}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        classes={{
          caption: classes.caption,
          toolbar: classes.toolbar,
        }}
      />
    </div>
  );
};
export default OrderTable;
