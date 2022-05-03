import useTimeout from "hooks/useTimeout";
import { reportAllProductFromOrder } from "services/ReportServices";
import React, { useCallback, useEffect, useState } from "react";
import {
    Grid,
    IconButton,
    makeStyles,
    Paper,
    TableCell,
} from "@material-ui/core";
import Loading from "components/loading/Loading";
import TableReport from "components/table/TableReport";
import { currency } from "utils/formatCurrency";
import { Link, useHistory } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { getProductById } from "services/ProductServices";
import "./style.css";
const columns = [
    { id: "id", label: "Mã đơn hàng", numeric: true, minWidth: 130 },
    {
        id: "status_order_name",
        label: "Trạng thái",
        minWidth: 180,
        type: "text",
    },
    {
        id: "quantity",
        label: "Số lượng",
        numeric: true,
        minWidth: 100,
        type: "number",
    },
    {
        id: "total_price",
        label: "Tổng tiền",
        minWidth: 100,
        numeric: true,
        type: "number",
        format: (value) => currency(value),
    },
    {
        id: "create_time",
        label: "Ngày đặt",
        minWidth: 100,
        type: "text",
    },
];

const renderActions = (id) => {
    return (
        <TableCell component="th" scope="row">
            <IconButton>
                <Link to={`/admin/order/detail/${id}`}>
                    <VisibilityIcon color="primary" />
                </Link>
            </IconButton>
        </TableCell>
    );
};

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
    },
    wrapper: {
        display: "flex",
        alignItems: "center",
    },
});

export default function ReportListProducts(props) {
    const classes = useStyles();
    const history = useHistory();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [product, setProduct] = useState({});

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
        const id = props.match.params.id;
        let searchObj = {};
        searchObj.limit = rowsPerPage;
        searchObj.page = page + 1;
        searchObj.product = id;
        reportAllProductFromOrder(searchObj)
            .then((res) => {
                setData(res.data.content);
                setTotalElements(res.data.totalElements);
            })
            .catch((err) => console.log(err));
    }, [page, props.match.params.id, rowsPerPage]);

    const getDataProduct = useCallback(() => {
        const id = props.match.params.id;
        if (id) {
            getProductById(id).then((res) => {
                setProduct(res.data);
            });
        } else {
            setLoading(false);
        }
    }, [props.match.params.id]);

    useTimeout(() => setLoading(false), loading ? 1000 : null);

    useEffect(() => {
        document.title = "E-Shop Admin | Report Product";
        getData();
        getDataProduct();
    }, [getData, getDataProduct]);
    return (
        <div className="glOjBk list-cusomer-order">
            <h2 className="heading">
                Thống kê các lần đặt hàng của sản phẩm #{props.match.params.id}
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Paper className={classes.root}>
                                        <div className="card">
                                            <div className="card__header">
                                                <h3>Thông tin sản phẩm</h3>
                                            </div>
                                            <div className="card__body">
                                                {
                                                    loading ? (<Loading />) : (
                                                        <div className="row">
                                                            <div className="col-5">
                                                                <div className="left-thumbnail">
                                                                    <img src={product?.mainImage} alt="" style={{ width: '250px', height: '250px', objectFit: 'contain' }} />
                                                                </div>
                                                            </div>
                                                            <div className="col-7">
                                                                <div className="product-detail">
                                                                    <h4 className="product-name">
                                                                        <span>Tên sản phẩm: </span> <span>{product?.name}</span>
                                                                    </h4>
                                                                    <h4 className="product-name">
                                                                        <span>SKU: </span> <span>{product?.sku}</span>
                                                                    </h4>
                                                                    <h4 className="product-name">
                                                                        <span>Danh mục: </span> <span>{product?.category.name}</span>
                                                                    </h4>
                                                                    <h4 className="product-name">
                                                                        <span>Thương hiệu: </span> <span>{product?.brand.name}</span>
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    {loading ? (
                                        <Loading />
                                    ) : (
                                        <Paper className={classes.root}>
                                            <div className="card">
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
                                <Grid item md={12}>
                                    <Link
                                        className="view-list-order"
                                        to="#"
                                        onClick={() => history.goBack()}
                                    >
                                        &lt;&lt; Quay lại
                                    </Link>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
