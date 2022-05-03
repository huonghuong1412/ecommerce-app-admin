import React, { useCallback, useEffect } from "react";
import {
    deleteItem,
    getAllSlide,
    getOneItem,
    saveItem,
    updateItem,
} from "services/SlideServices";
import { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Button, Grid, makeStyles, Paper } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "components/loading/Loading";
import TableData from "components/table/TableData";
import OtherForm from "./OtherForm";
toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});

const columns = [
    { id: "id", label: "ID", minWidth: 170, type: "number", isShow: true },
    { id: "image", label: "Hình ảnh", minWidth: 100, type: "image", isShow: true },
    { id: "display", label: "Trạng thái", minWidth: 170, type: "number", isShow: false, format: (value) => value === 1 ? "Hiển thị" : "Không hiển thị", },
    { id: "createdDate", label: "Ngày tạo", minWidth: 100, type: "text", isShow: false, },
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
        width: '75%'
    },
    button: {
        marginLeft: 10,
        float: "right",
        height: "100%",
        padding: '14px 21px',
    },
    wrapper: {
        display: 'flex',
        alignItems: 'center'
    }
});

export default function Slides() {
    const [slides, setSlides] = useState([]);
    const classes = useStyles();
    const [openDialog, setOpendialog] = useState(false);
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(true);
    const [totalElements, setTotalElements] = useState(0);
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

    const handleOpendialog = (id) => {
        if (id) {
            getOneItem(id)
                .then((res) => setItem(res.data))
                .catch((err) => console.log(err));
        } else {
            setItem({});
        }
        setOpendialog(true);
    };

    const handleSaveItem = (data) => {
        const { id } = data;
        if (id) {
            updateItem(data)
                .then((res) => {
                    handleCloseDialog();
                    getData();
                    toast.success("Cập nhật thành công");
                })
                .catch((err) =>
                    toast.error("Cập nhật không thành công")
                );
        } else {
            saveItem(data)
                .then(() => {
                    handleCloseDialog();
                    getData();
                    toast.success("Thêm mới thành công");
                })
                .catch((err) => toast.error("Thêm không thành công"));
        }
    };

    const handleDeleteItem = (id) => {
        deleteItem(id)
            .then(() => {
                getData();
                toast.success("Cập nhật trạng thái thành công");
            })
            .catch((err) => toast.error("Cập nhật trạng thái không thành công"));
    };

    const getData = useCallback(() => {
        let searchObj = {};
        searchObj.limit = rowsPerPage;
        searchObj.page = page;
        getAllSlide(searchObj)
            .then((res) => {
                setSlides([...res.data.content]);
                setTotalElements(res.data.totalElements)
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, [page, rowsPerPage]);

    const handleCloseDialog = () => {
        setOpendialog(false);
    };

    useEffect(() => {
        getData();
        document.title = "E-Shop Admin | Slides";
    }, [getData]);
    return (
        <div>
            <h2 className="page-header">Quản lý shop</h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Grid container spacing={3}>
                                <Grid item md={12}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="large"
                                        className={classes.button}
                                        startIcon={<AddIcon />}
                                        onClick={() => handleOpendialog(null)}
                                    >
                                        Thêm mới
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    {loading ? (
                                        <Loading />
                                    ) : (
                                        <Paper className={classes.root}>
                                            <TableData
                                                data={slides}
                                                type="slide"
                                                columns={columns}
                                                handleOpendialog={handleOpendialog}
                                                handleDeleteItem={handleDeleteItem}
                                                totalElements={totalElements}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onChangePage={handleChangePage}
                                                onChangeRowsPerPage={setNewRowsPerPage}
                                            />
                                        </Paper>
                                    )}
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
            <OtherForm
                fields={columns}
                open={openDialog}
                onClose={handleCloseDialog}
                title="Slide"
                item={item}
                onSaveItem={handleSaveItem}
            />
        </div>
    );
}
