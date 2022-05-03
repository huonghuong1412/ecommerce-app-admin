import { IconButton, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import React from 'react'

import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
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
    textField: {
        fontWeight: 500,
    },
    button: {
        margin: "0",
        float: "right",
        height: "100%",
    },
    image: {
        height: 75,
        width: 75,
        objectFit: "contain",
      },
});

function TableData(props) {
    const { data, columns, handleOpendialog, handleDeleteItem, totalElements,
        rowsPerPage,
        page,
        onChangePage,
        onChangeRowsPerPage, type } = props;

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
                <Table
                    stickyHeader
                    aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    className={classes.head}
                                    align={column.numeric ? 'right' : 'left'}
                                    padding={column.disablePadding ? 'none' : 'normal'}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell
                                className={classes.head}
                            >Hành động</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column, index) => {
                                        const value = row[column.id];
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
                                        // if (column.type === "image") {
                                        //     return (
                                        //       <TableCell key={index} style={{minWidth: `${column.minWidth}px`}}>
                                        //         <img
                                        //           src={value}
                                        //           alt=""
                                        //           className={classes.image}
                                        //         />
                                        //       </TableCell>
                                        //     );
                                        //   }
                                        return (
                                            <TableCell key={column.id} align={column.align} className={classes.text}>
                                                {
                                                    column.format && typeof value === 'number' ? column.format(value) : value
                                                }
                                            </TableCell>
                                        );
                                    })}
                                    <TableCell component="th" scope="row">
                                        <IconButton
                                            onClick={() => handleDeleteItem(row.id ? row.id : row.productId)}
                                        >
                                            <VisibilityIcon color="primary" />
                                        </IconButton>

                                        {
                                            type === 'category' || type === 'slide' || type === 'promotion' ? '' : <IconButton
                                                onClick={() => handleOpendialog(row.id)}
                                            >
                                                <EditIcon color="primary" />
                                            </IconButton>
                                        }
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
                    toolbar: classes.toolbar
                }}
            />
        </>
    )
}

export default TableData;