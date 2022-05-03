import React from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
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
}));

const CardComponent = (props) => {
  const { title, subtitle, icon, data } = props;
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <div className={classes.head}>
        <span className="status-card__icon">
          <i className={icon}></i>
        </span>
        <div style={{ display: "inline-block", marginLeft: 10 }}>
          <div>
            <span>{title}</span>&nbsp;
          </div>
          <div style={{ fontSize: "12px", color: "rgb(114, 117, 121)" }}>
            <span>{subtitle}</span>
          </div>
        </div>
      </div>
      <CardContent className={classes.content}>
        <div className="card_list">
          {data.map((item, index) => {
            return (
              <div className="card_item" key={index}>
                <div className="card_item-inner">
                  <Link className="card_link" to="#">
                    <span className="primary">{item.quantity}</span>
                  </Link>
                </div>
                <span>{item.message}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
