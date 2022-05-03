import { Button, Grid, makeStyles, Paper } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import CardComponent from 'components/card/CardComponent';
import SelectField from 'components/input/SelectField';
import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import * as services from "services/UserServices";
import { getListOrderBySeller, getQuantityOrderByStatusSeller } from 'services/ReportServices'
import Loading from 'components/loading/Loading';
import OrderTable from 'pages/Orders/OrderTable';
import { getTokenPrintBill } from 'services/GHNServices';
import { toast } from 'react-toastify';
import { currency } from 'utils/formatCurrency';

const columns = [
    { id: "id", label: "Mã đơn hàng", numeric: true, minWidth: 130, isShow: true },
    { id: "order_code", label: "Mã đơn GHN", minWidth: 130, isShow: false },
    {
        id: "status_order_name",
        label: "Trạng thái",
        minWidth: 150,
        type: "text",
        isShow: true
    },
    { id: "createdDate", label: "Ngày đặt", minWidth: 100, type: "text", isShow: true },
    { id: "description", label: "Sản phẩm", minWidth: 200, type: "text", isShow: true },
    {
        id: "total_item",
        label: "Số lượng",
        numeric: true,
        minWidth: 100,
        type: "number",
        isShow: true,
    },
    {
        id: "total_price",
        label: "Tổng tiền",
        minWidth: 100,
        numeric: true,
        type: "number",
        isShow: true,
        format: (value) => currency(value),
    },
    {
        id: "status_payment_name",
        label: "Thanh toán",
        minWidth: 160,
        isShow: true,
        type: "text",
    },
    {
        id: "ship_name",
        label: "Giao hàng",
        minWidth: 160,
        isShow: true,
        type: "text",
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    head: {
        padding: 16,
        borderBottom: "1px solid #f0f0f0",
        borderRadius: "2px 2px 0 0",
        height: 64,
        background: "#fafafa",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 16,
    },
    pos: {
        marginBottom: 12,
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
}));

export default function ReportShipper(props) {
    const classes = useStyles();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [orderCount, setOrderCount] = useState([])
    const [username, setUserName] = useState('');

    const handleOnChange = (e) => {
        const value = e.target.value;
        setUserName(value);
        setLoading(false);
    };

    const getDataShipper = useCallback(() => {
        let searchObj = {};
        searchObj.limit = 1000;
        searchObj.page = 0;
        searchObj.keyword = '';
        services.getAllSeller(searchObj)
            .then((res) => {
                setCustomers([...res.data.content]);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    const getDataOrderByShipperSelect = useCallback(() => {
        let searchObj = {};
        searchObj.limit = rowsPerPage;
        searchObj.page = page + 1;
        getListOrderBySeller(username, searchObj)
            .then(res => {
                setOrders(res.data.content);
                setTotalElements(res.data.totalElements);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, [page, rowsPerPage, username])

    const getDataOrder = useCallback(() => {
        getQuantityOrderByStatusSeller(username)
            .then(res => setOrderCount(res.data))
            .catch(err => console.log(err))
    }, [username])

    const handleSubmit = () => {
        getDataOrderByShipperSelect();
        getDataOrder();
    };

    const handleSubmitOrder = (order_code) => {
        const data = {
            order_codes: [order_code]
        }
        if (isNaN(order_code)) {
            getTokenPrintBill(data)
                .then((res) => {
                    window.open(`https://dev-online-gateway.ghn.vn/a5/public-api/printA5?token=${res.data.data.token}`, '_blank')
                })
                .catch(() =>
                    toast.warning("Cập nhật trạng thái đơn hàng không thành công.")
                );
        } else {
            toast.warning("Vui lòng xác nhận đơn hàng trước!")
        }
    };

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


    useEffect(() => {
        getDataShipper()
        // if(username) {
        //     getDataOrderByShipperSelect();
        // }
    }, [getDataShipper, username])

    return (
        <div className="glOjBk list-cusomer-order">
            <h2 className="heading">Quản lý giao hàng</h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <div className={classes.wrapper}>
                                        <SelectField
                                            label="Nhân viên giao hàng"
                                            name="username"
                                            value={username}
                                            onChange={handleOnChange}
                                            data={customers.map(item => {
                                                return {
                                                    name: item.fullName,
                                                    code: item.username
                                                }
                                            })}
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
                                {
                                    loading ? <Loading /> : (
                                        <>
                                            <Grid item md={12}>
                                                <CardComponent
                                                    title="Tổng đơn hàng"
                                                    subtitle="30 ngày gần nhất"
                                                    icon="bx bx-shopping-bag"
                                                    data={orderCount}
                                                />
                                            </Grid>
                                            <Grid item md={12}>
                                                <Paper className={classes.root}>
                                                    <OrderTable
                                                        data={orders}
                                                        columns={columns}
                                                        totalElements={totalElements}
                                                        rowsPerPage={rowsPerPage}
                                                        page={page}
                                                        onChangePage={handleChangePage}
                                                        onChangeRowsPerPage={setNewRowsPerPage}
                                                        handleSubmitOrder={handleSubmitOrder}
                                                    />
                                                </Paper>
                                            </Grid>
                                        </>
                                    )
                                }
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
