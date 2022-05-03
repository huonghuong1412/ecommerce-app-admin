import { Grid } from "@material-ui/core";
import CardComponent from "components/card/CardComponent";
import React, { useCallback, useEffect, useState } from "react";
import {
    getQuantityOrderByStatus,
} from "services/SellerServices";

export default function Dashboard() {
    useEffect(() => {
        document.title = "E-Shop Admin | Dashboard";
    }, []);
    const [orders, setOrders] = useState([])
    const getDataOrder = useCallback(() => {
        getQuantityOrderByStatus({ last_date: 0 })
            .then(res => setOrders(res.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        getDataOrder();
    }, [getDataOrder]);

    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Grid container spacing={3}>
                                <Grid item md={12}>
                                    <CardComponent
                                        title="Tổng đơn hàng"
                                        subtitle="30 ngày gần nhất"
                                        icon="bx bx-shopping-bag"
                                        data={orders}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
