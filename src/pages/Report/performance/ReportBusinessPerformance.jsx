import { Button, Grid } from "@material-ui/core";
import CardComponent from "components/card/CardComponent";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getQuantityOrderByStatus,
  getQuantityProductByType,
  reportProductOutOfStock,
  reportProductTop5MostSold,
  reportCommentByRating,
  reportRevenueAndProfit,
} from "services/ReportServices";
import { currency } from "utils/formatCurrency";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SelectField from "components/input/SelectField";
import { Search } from "@material-ui/icons";
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

const topProductHead = ["Sản phẩm", "Danh mục", "Đã bán", "Tổng tiền"];

const topProductStockHead = ["Sản phẩm", "Danh mục", "Đã bán", "Còn lại"];

const topCommentHead = ["Đánh giá", "Tổng", "Tỉ lệ"];

const renderProductHead = (item, index) => <th key={index}>{item}</th>;

const renderProductBody = (item, index) => (
  <tr key={index}>
    <td>{item.product_name}</td>
    <td>{item.product_category}</td>
    <td>{item.quantity_sold}</td>
    <td>{currency(item.total_price)}</td>
  </tr>
);

const renderProductStockHead = (item, index) => <th key={index}>{item}</th>;

const renderProductStockBody = (item, index) => (
  <tr key={index}>
    <td>{item.product_name}</td>
    <td>{item.product_category}</td>
    <td>{item.quantity_sold}</td>
    <td>{item.quantity}</td>
  </tr>
);

const renderCommentHead = (item, index) => <th key={index}>{item}</th>;

const renderCommentBody = (item, index) => (
  <tr key={index}>
    <td style={{ display: "flex", alignItems: "center" }}>
      {item.message}{" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 20 20"
      >
        <path
          d="M10 2.5L12.1832 7.34711L17.5 7.91118L13.5325 11.4709L14.6353 16.6667L10 14.0196L5.36474 16.6667L6.4675 11.4709L2.5 7.91118L7.81679 7.34711L10 2.5Z"
          stroke="#FFA142"
          fill="#FFD52E"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.99996 1.66675L12.4257 7.09013L18.3333 7.72127L13.925 11.7042L15.1502 17.5177L9.99996 14.5559L4.84968 17.5177L6.07496 11.7042L1.66663 7.72127L7.57418 7.09013L9.99996 1.66675ZM9.99996 3.57863L8.10348 7.81865L3.48494 8.31207L6.93138 11.426L5.97345 15.9709L9.99996 13.6554L14.0265 15.9709L13.0685 11.426L16.515 8.31207L11.8964 7.81865L9.99996 3.57863Z"
          fill="#FFA142"
        />
      </svg>
    </td>
    <td>{item.rating}</td>
    <td>{item.percent}</td>
  </tr>
);

export default function ReportBusinessPerformance(props) {
  useEffect(() => {
    document.title = "E-Shop Admin | Dashboard";
  }, []);

  const classes = useStyles();

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [mostSold, setMostSold] = useState([]);
  const [outStocks, setOutStocks] = useState([]);
  const [comments, setComments] = useState([]);
  const [revenue, setRevenue] = useState([]);

  const params = new URLSearchParams(window.location.search);
  const last_date = params.get("last_date") ? params.get("last_date") : "";
  const [search, setSearch] = useState("");

  const handleOnChange = (e) => {
    const value = e.target.value;
    setSearch({
      ...search,
      [e.target.name]: value,
    });
  };

  const handleSubmit = () => {
    props.history.push(`?last_date=${search.last_date}`);
  };

  const getDataOrder = useCallback(() => {
    let searchObj = {};
    searchObj.last_date = last_date;
    getQuantityOrderByStatus(searchObj)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, [last_date]);

  const getDataProduct = useCallback(() => {
    getQuantityProductByType()
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getDataRevenue = useCallback(() => {
    let searchObj = {};
    searchObj.last_date = last_date;
    reportRevenueAndProfit(searchObj)
      .then((res) => setRevenue(res.data))
      .catch((err) => console.log(err));
  }, [last_date]);

  const getMostProduct = useCallback(() => {
    reportProductTop5MostSold()
      .then((res) => {
        setMostSold(res.data.content);
      })
      .catch((err) => console.log(err));
  }, []);

  const getOutOfStock = useCallback(() => {
    let searchObj = {};
    searchObj.limit = 5;
    searchObj.page = 1;
    reportProductOutOfStock(searchObj)
      .then((res) => {
        setOutStocks(res.data.content);
      })
      .catch((err) => console.log(err));
  }, []);

  const getCommentReport = useCallback(() => {
    reportCommentByRating()
      .then((res) => {
        setComments(res.data.content);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getDataOrder();
    getDataProduct();
  }, [getDataOrder, getDataProduct]);

  useEffect(() => {
    getMostProduct();
    getOutOfStock();
  }, [getMostProduct, getOutOfStock]);

  useEffect(() => {
    getCommentReport();
    getDataRevenue();
  }, [getCommentReport, getDataRevenue]);

  return (
    <div className="glOjBk list-cusomer-order">
      <h2 className="heading">Hiệu quả kinh doanh</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <div className={classes.wrapper}>
                    <SelectField
                      label=" Ngày"
                      name="last_date"
                      value={search ? search.last_date : last_date}
                      onChange={handleOnChange}
                      data={[
                        {
                          name: "Hôm nay",
                          code: 1,
                        },
                        {
                          name: "7 ngày qua",
                          code: 7,
                        },
                        {
                          name: "30 ngày qua",
                          code: 30,
                        },
                        {
                          name: "Toàn thời gian",
                          code: 100000000,
                        },
                      ]}
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
                <Grid item md={6}>
                  <Card className={classes.root} variant="outlined">
                    <div className={classes.head}>
                      <span className="status-card__icon">
                        <i className="bx bx-money"></i>
                      </span>
                      <div style={{ display: "inline-block", marginLeft: 10 }}>
                        <div>
                          <span>Doanh thu</span>&nbsp;
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "rgb(114, 117, 121)",
                          }}
                        >
                          <span>Doanh thu</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className={classes.content}>
                      <div className="card_list">
                        {revenue.map((item, index) => {
                          return (
                            <div className="card_item" key={index}>
                              <div className="card_item-inner">
                                <a
                                  className="card_link"
                                  href="/admin/dashboard"
                                >
                                  <span className="primary">
                                    {currency(item.revenue)}
                                  </span>
                                </a>
                              </div>
                              <span>{item.message}</span>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item md={6}>
                  <CardComponent
                    title="Tổng đơn hàng"
                    subtitle="30 ngày gần nhất"
                    icon="bx bx-shopping-bag"
                    data={orders}
                  />
                </Grid>
                <Grid item md={6}>
                  <CardComponent
                    title="Sản phẩm đang bán"
                    subtitle="Sản phẩm"
                    icon="bx bx-cart"
                    data={products}
                  />
                </Grid>
                <Grid item md={6}>
                  <div className="card">
                    <div className="card__header">
                      <h3>top sản phẩm bán chạy</h3>
                    </div>
                    <div className="card__body">
                      <div className="table-wrapper">
                        <table>
                          <thead>
                            <tr>
                              {topProductHead.map((item, index) =>
                                renderProductHead(item, index)
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {mostSold.map((item, index) =>
                              renderProductBody(item, index)
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="card__footer">
                      <Link to="/admin/report/product">Xem tất cả</Link>
                    </div>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className="card">
                    <div className="card__header">
                      <h3>sản phẩm hết hàng</h3>
                    </div>
                    <div className="card__body">
                      <div className="table-wrapper">
                        <table>
                          <thead>
                            <tr>
                              {topProductStockHead.map((item, index) =>
                                renderProductStockHead(item, index)
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {outStocks.map((item, index) =>
                              renderProductStockBody(item, index)
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="card__footer">
                      <Link to="/admin/report/product">Xem tất cả</Link>
                    </div>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className="card">
                    <div className="card__header">
                      <h3>đánh giá sản phẩm</h3>
                    </div>
                    <div className="card__body">
                      <div className="table-wrapper">
                        <table>
                          <thead>
                            <tr>
                              {topCommentHead.map((item, index) =>
                                renderCommentHead(item, index)
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {comments.map((item, index) =>
                              renderCommentBody(item, index)
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
