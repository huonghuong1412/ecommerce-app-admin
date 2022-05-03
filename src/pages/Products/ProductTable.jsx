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
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";

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
  image: {
    height: 75,
    width: 75,
    objectFit: "contain",
  },
  sticky: {
    position: "sticky",
    right: 0,
    background: "#fff",
    boxShadow: "5px 2px 5px rgba(0,0,0,0.1)",
    minWidth: `120`, 
    borderLeft: '1px solid #555'
  }
});

function ProductTable(props) {
  const {
    data,
    columns,
    handleDeleteItem,
    totalElements,
    rowsPerPage,
    page,
    onChangePage,
    onChangeRowsPerPage,
  } = props;

  const classes = useStyles();
  const handleChangePage = (event, newPage) => {
    onChangePage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onChangeRowsPerPage(+event.target.value);
  };

  return (
    <>
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
                  >
                    {column.label}
                  </TableCell>;
                }
                return (
                  <TableCell
                    style={{ minWidth: `${column.minWidth}px` }}
                    key={column.id}
                    className={classes.head}
                  >
                    {column.label}
                  </TableCell>
                );
              })}
              <TableCell className={classes.head} style={{minWidth: 120, borderLeft: '1px solid #555'}}>Hành động</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row) => {
              return (
                <TableRow hover tabIndex={-1} key={row.id}>
                  {columns.map((column, index) => {
                    let value = row[column.id];
                    if (column.type === "image") {
                      return (
                        <TableCell key={index} style={{minWidth: `${column.minWidth}px`}}>
                          <img
                            src={value}
                            alt=""
                            className={classes.image}
                          />
                        </TableCell>
                      );
                    }
                    if (typeof value === "object" && value !== null) {
                      return (
                        <TableCell
                          style={{ minWidth: `${column.minWidth}px` }}
                          key={index}
                          align={column.align}
                          className={classes.text}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value.name}
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell
                      style={{minWidth: `${column.minWidth}px`}}
                        key={column.id}
                        align={column.align}
                        className={classes.text}
                      >
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                  <TableCell component="th" scope="row" className={classes.sticky}>
                    <IconButton>
                      <Link to={`/admin/product/update/${row.id}`}>
                        <EditIcon color="primary" />
                      </Link>
                    </IconButton>
                    <IconButton onClick={() => handleDeleteItem(row.id)}>
                        <VisibilityIcon color="secondary" />
                    </IconButton>
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
    </>
  );
}

export default ProductTable;
