import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import React from 'react'
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
});

function TableReport(props) {
    const { data, columns,
        totalElements,
        rowsPerPage,
        page,
        onChangePage,
        onChangeRowsPerPage, renderActions } = props;

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
                            {columns.map((column, index) => (
                                <TableCell
                                    key={index}
                                    className={classes.head}
                                    align={column.numeric ? 'right' : 'left'}
                                    padding={column.disablePadding ? 'none' : 'normal'}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell className={classes.head} style={{ minWidth: 120, borderLeft: '1px solid #555' }}>Hành động</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {data.map((row, index) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.numeric ? 'right' : 'left'} className={classes.text}>
                                                {
                                                    column.format && typeof value === 'number' ? column.format(value) : value
                                                }
                                            </TableCell>
                                        );
                                    })}
                                    {renderActions(row.id)}
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
    )
}

export default TableReport;