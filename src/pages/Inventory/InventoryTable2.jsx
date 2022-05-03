import {
    Button,
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
  
  const useStyles = makeStyles({
    container: {
      maxHeight: 800,
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
    image: {
      height: 75,
      width: 75,
      objectFit: "contain",
    },
  });
  
  function InventoryTable2(props) {
    const {
      data,
      columns,
      totalElements,
      rowsPerPage,
      page,
      onChangePage,
      onChangeRowsPerPage,
      handleCancelSellProduct
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
                      key={column.id.code}
                      className={classes.head}
                      align={column.numeric ? "right" : "left"}
                      style={{minWidth: `${column.minWidth}px`}}
                      padding={column.disablePadding ? "none" : "normal"}
                    >
                      {column.label}
                    </TableCell>;
                  }
                  return (
                    <TableCell
                      key={column.id}
                      className={classes.head}
                      align={column.numeric ? "right" : "left"}
                      padding={column.disablePadding ? "none" : "normal"}
                      style={{minWidth: `${column.minWidth}px`}}
                    >
                      {column.label}
                    </TableCell>
                  );
                })}
                <TableCell className={classes.head}>Hành động</TableCell>
              </TableRow>
            </TableHead>
  
            <TableBody>
              {data.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column, index) => {
                      let value = row[column.id];
                      if (column.type === "image") {
                        return (
                          <TableCell key={index}>
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
                            key={index}
                            align={column.align}
                            className={classes.text}
                            style={{minWidth: `${column.minWidth}px`}}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value.name}
                          </TableCell>
                        );
                      }
  
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className={classes.text}
                          style={{minWidth: `${column.minWidth}px`}}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell component="th" scope="row" style={{minWidth: 350}}>
                      <Button variant="outlined" color="primary">
                        <Link
                          to="#"
                          onClick={() => handleCancelSellProduct(row.id)}
                        >
                            Trạng thái
                        </Link>
                      </Button>
                      <Button variant="outlined" color="primary">
                        <Link
                          to={`/admin/inventory/update-import/${row.id}?productId=${row.productId}&color=${row.color}`}
                        >
                            Cập nhật số lượng
                        </Link>
                      </Button>
                      <Button variant="outlined" color="secondary">
                        <Link
                          to={`/admin/inventory/${row.category_code}/detail/${row.id}`}
                        >
                          Xem lịch sử
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className={classes.text}
          rowsPerPageOptions={[1, 5, 10, 25, 100]}
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
  
  export default InventoryTable2;
  