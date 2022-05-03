import {
  Button,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  InputLabel,
  Select,
} from "@material-ui/core";
import "./order.css";
import React, { useEffect, useState } from "react";
import {
  getDetailOrderById,
  confirmOrder,
  cancelOrder,
  shippingOrder
} from "services/OrderServices";
import { createOrderGHN } from "services/GHNServices";
import { currency } from "utils/formatCurrency";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useHistory } from "react-router-dom";
import Loading from "components/loading/Loading";
import { createOrderGHTK } from "services/GHTKServices";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

const useStyles = makeStyles({
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
  formControl: {
    minWidth: 250,
    marginRight: 15,
    fontSize: "1.3rem",
  },
  button: {
    padding: "12px 24px",
    fontWeight: 600,
    fontSize: "1.3rem",
  },
  right: {
    textAlign: "right",
    fontSize: "1.6rem",
    fontWeight: "500",
    paddingTop: 20,
    marginBottom: 20,
    borderTop: "1px solid rgb(223, 222, 222)",
  },
});

const menus = [
  {
    value: -1,
    name: "Huỷ đơn hàng",
  },
  {
    value: 1,
    name: "Xác nhận đơn hàng",
  },
  {
    value: 2,
    name: "Hoàn thành đơn hàng",
  },
];

function OrderDetail(props) {
  const classes = useStyles();
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [orderInfo, setOrderInfo] = useState({});
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setLoading(true);
    const id = props.match.params.id;
    switch (status) {
      case -1:
        cancelOrder(id)
          .then((res) => {
            setLoading(false);
            toast.success(res.data.message);
            getData();
          })
          .catch((err) => {
            setLoading(false);
            toast.warning(err.response.data.message);
          });
        break;
      case 1:
        const order = {
          id: id,
          weight: orderInfo.weight,
          length: orderInfo.length,
          width: orderInfo.width,
          height: orderInfo.height
        };
        if (orderInfo?.ship_type === 1) {
          createOrderGHN(order)
            .then((res) => {
              shippingOrder(id, res.data.order_code)
                .then(() => {
                  setLoading(false);
                  toast.success("Cập nhật trạng thái thành công!");
                  getData();
                })
                .catch((err) => toast.error(err.response.data.message));
            })
            .catch((err) => console.log(err));
        } else {
          const order = {
            id: id
          };
          createOrderGHTK(order)
            .then((res) => {
              shippingOrder(id, res.data.order_code)
                .then(() => {
                  setLoading(false);
                  toast.success("Cập nhật trạng thái thành công!");
                  getData();
                })
                .catch((err) => toast.error(err.response.data.message));
            })
            .catch((err) => console.log(err));
        }
        break;
      case 2:
        confirmOrder(id)
          .then((res) => {
            setLoading(false);
            toast.success(res.data.message);
            getData();
          })
          .catch((err) => {
            setLoading(false);
            toast.warning(err.response.data.message)
          });
        break;
      default:
        break;
    }
  };

  const getData = () => {
    const id = props.match.params.id;
    getDetailOrderById(id)
      .then((res) => {
        setLoading(false);
        setOrders(res.data.order_details);
        setUserInfo(res.data.user);
        setOrderInfo(res.data.order_info);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.id]);

  // tính tổng tiền trong ds sản phẩm ở đơn hàng chi tiết
  const calTotalItemPrice = (orders) => {
    let total = 0;
    orders.forEach((item) => {
      total += item.total_price;
    });
    return total;
  };



  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="glOjBk list-cusomer-order">
          <h2 className="heading">
            Chi tiết đơn hàng #{props.match.params.id} -{" "}
            <span>{orderInfo.status_order_name}</span>
          </h2>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card__body">
                  <Grid container >
                    <Grid item sm={12}>
                      <div className="cRRvpz">
                        <div className="gQjSfs">
                          <div className="title">Địa chỉ người nhận</div>
                          <div className="content">
                            <p className="name">{userInfo.user_fullname}</p>
                            <p className="address">
                              <span>Địa chỉ: </span>{orderInfo.address + ',' + orderInfo.ward + ', ' + orderInfo.district + ', ' + orderInfo.province}
                            </p>
                            <p className="phone">
                              <span>Điện thoại: </span>
                              {userInfo.phone}
                            </p>
                          </div>
                        </div>
                        <div className="gQjSfs">
                          <div className="title">Hình thức giao hàng</div>
                          <div className="content">
                            <p>
                              <img src="https://salt.tikicdn.com/ts/upload/2a/47/46/0e038f5927f3af308b4500e5b243bcf6.png" width="56" alt="TikiFast" />
                            </p>
                            <p>Được giao bởi: {orderInfo?.ship_type === 2 ? 'Giao Hàng Tiết Kiệm' : 'Giao Hàng Nhanh'}</p>
                            {
                              orderInfo?.ship_order_code && orderInfo?.ship_order_code !== null ? (
                                <p>Mã vận đơn: {orderInfo?.ship_order_code}</p>
                              ) : ''
                            }
                            <p>Phí vận chuyển: {currency(orderInfo?.ship_fee)}</p>
                          </div>
                        </div>
                        <div className="gQjSfs">
                          <div className="title">Hình thức thanh toán</div>
                          <div className="content">
                            <p className="">{orderInfo?.payment_method}</p>
                            <p className="">{orderInfo.status_payment_name}</p>
                          </div>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <table className="Nbknf">
                        <thead>
                          <tr>
                            <th>Sản phẩm</th>
                            <th>Loại sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Tạm tính</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <div className="product-item">
                                    <img src={item?.mainImage} alt="" />
                                    <div className="product-info">
                                      <Link className="product-name" to="#">
                                        {item?.product_name}
                                      </Link>
                                      <p className="product-sku">
                                        ID: {item?.product_id}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="discount-amount">
                                  {item?.category}
                                </td>
                                <td className="price">
                                  {currency(item.price_item)}
                                </td>
                                <td className="quantity">{item.amount_item}</td>
                                <td className="raw-total">
                                  {currency(item.total_price)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan={4}>
                              <span>Tạm tính</span>
                            </td>
                            <td>{currency(calTotalItemPrice(orders))}</td>
                          </tr>
                          <tr>
                            <td colSpan={4}>
                              <span>Phí vận chuyển</span>
                            </td>
                            <td>{currency(orderInfo?.ship_fee)}</td>
                          </tr>
                          <tr>
                            <td colSpan={4}>
                              <span>Tổng cộng</span>
                            </td>
                            <td>
                              <span className="sum">
                                {currency(
                                  orderInfo.total_price + orderInfo?.ship_fee
                                )}
                              </span>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </Grid>
                    <Grid item md={12}>
                      <h4 className={classes.right}>Cập nhật trạng thái</h4>
                      <div className="order-group">
                        <FormControl
                          className={classes.formControl}
                          variant="outlined"
                        >
                          <InputLabel
                            className={classes.text}
                          >
                            Cập nhật trạng thái đơn hàng
                          </InputLabel>
                          <Select
                            value={status || ""}
                            onChange={handleChange}
                            name="status"
                            className={classes.text}
                            MenuProps={{
                              anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left",
                              },
                              transformOrigin: {
                                vertical: "top",
                                horizontal: "left",
                              },
                              getContentAnchorEl: null,
                            }}
                          >
                            <MenuItem value="" className={classes.text}>
                              <em>Trạng thái</em>
                            </MenuItem>
                            {menus.map((item) => {
                              return (
                                <MenuItem
                                  key={item.value}
                                  value={item.value}
                                  className={classes.text}
                                >
                                  {item.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                        <Button
                          variant="outlined"
                          color="secondary"
                          className={classes.button}
                          onClick={handleSubmitOrder}
                        >
                          Cập nhật
                        </Button>
                      </div>
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
      )}
    </>
  );
}

export default OrderDetail;
