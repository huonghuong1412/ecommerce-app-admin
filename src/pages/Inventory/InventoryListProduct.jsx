import React, { useCallback, useEffect, useState } from "react";
import { Button, Grid, makeStyles, Paper } from "@material-ui/core";
import Loading from "components/loading/Loading";
import AddIcon from "@material-ui/icons/Add";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as services from "services/InventoryService";
import InventoryTable2 from "./InventoryTable2";
import { Link } from "react-router-dom";

toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
});

const useStyles = makeStyles({
    root: {
        width: "100%",
        overflowX: "auto",
    },
    container: {
        maxHeight: 800,
    },
    visuallyHidden: {
        display: "none",
    },
    text: {
        fontSize: "1.2rem",
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

const columns = [
    { id: "id", label: "ID", minWidth: 50 },
    // { id: "productId", label: "ID sản phẩm", minWidth: 150 },
    { id: "productMainImage", label: "Image", minWidth: 100, type: "image" },
    { id: "productName", label: "Tên sản phẩm", minWidth: 170, type: "text" },
    { id: "color", label: "Màu sắc", minWidth: 100, type: "text" },
    {
        id: "total_import_item",
        label: "Tổng nhập",
        minWidth: 120,
        type: "number",
    },
    {
        id: "quantity_item",
        label: "Còn lại",
        minWidth: 100,
        type: "number",
    },
    {
        id: "sold",
        label: "Đã bán",
        minWidth: 100,
        type: "number",
    },
    { id: "display", label: "Trạng thái", minWidth: 120, type: "number", isShow: false, format: (value) => value === 1 ? "Đang bán" : "Không bán", },
];

const InventoryListProduct = (props) => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const classes = useStyles();

    const getData = useCallback(() => {
        const id = props.match.params.id;
        services
            .getListByProduct(id)
            .then((res) => {
                setLoading(false);
                setProducts([...res.data]);
            })
            .catch((err) => console.log(err));
    }, [props.match.params.id]);

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

    const handleCancelSellProduct = (id) => {
        services.cancelSellProduct(id)
            .then(res => {
                toast.success(res.data.message);
                getData();
            })
            .catch(err => toast.error(err.response.data.message))
    }

    useEffect(() => {
        document.title = "E-Shop Admin | Inventory";
        getData();
    }, [getData]);

    return (
        <div>
            <h2 className="page-header">Quản lý kho hàng</h2>
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
                                    >
                                        <Link to={`/admin/inventory/new-import/product?productId=${props.match.params.id}`}>Thêm mới</Link>
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    {loading ? (
                                        <Loading />
                                    ) : (
                                        <Paper className={classes.root}>
                                            <InventoryTable2
                                                data={products}
                                                columns={columns}
                                                totalElements={products.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                onChangePage={handleChangePage}
                                                onChangeRowsPerPage={setNewRowsPerPage}
                                                handleCancelSellProduct={handleCancelSellProduct}
                                            />
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
};

export default InventoryListProduct;
