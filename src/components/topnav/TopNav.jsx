import React, { useEffect, useState } from "react";
import "./topnav.css";
import { Link } from "react-router-dom";
import ThemeMenu from "../thememenu/ThemeMenu";
import logout_icon from "../../assets/images/logout.png";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogin, logout } from "redux/actions/AuthActions";
import ThemeAction from "../../redux/actions/ThemeAction";
import { Avatar, Button, Menu, MenuItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 120
  },
  menuItem: {
    paddingLeft: 0,
    paddingRight: 0
  },
  button: {
    marginLeft: 10,
    float: "right",
    height: "100%",
    padding: '14px 21px',
  },
  link: {
    padding: '8px 16px',
    width: '100%',
    fontSize: 16,
    fontWeight: 400,
    display: 'flex',
    alignItems: 'center'
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
    '& > span:first-child': {
      fontSize: '1.3rem',
      fontWeight: '500'
    }
  },
  small: {
    width: 36,
    height: 36,
  },
}));

const Topnav = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const classes = useStyles();
  const handleLogout = () => {
    dispatch(logout());
  };

  const [user, setUser] = useState({
    id: '',
    fullName: '',
    username: '',
    email: '',
    phone: '',
    dateOfBirth: ''
  });

  const getData = () => {
    getUserLogin()
      .then(res => {
        setUser(res.data);
      })
      .catch(err => console.log(err))
  }

  const open = useSelector((state) => state.ThemeReducer.open);

  const handleToggleSidebar = () => {
    dispatch(ThemeAction.toggleSideBar(open));
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="topnav">
      <div className="topnav__search">
        <Button
          startIcon={open ? <MenuOpenIcon /> : <MenuIcon />}
          className="btn-toggle"
          onClick={handleToggleSidebar}
        ></Button>
      </div>
      <div className="topnav__right">
        <div className="topnav__right-item"></div>
        <div className="topnav__right-item">
          <div className={classes.wrapper}>
            <Avatar alt="" src="https://sc-frontend.tikicdn.com/new/static/logo.9376039b.png" onClick={handleClick}></Avatar>
            {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.button} style={{ width: 200 }}>
              Admin
            </Button> */}
          </div>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <MenuItem className={classes.menuItem} onClick={handleClose}>
              <div className={classes.link}>
                <Avatar className={classes.small} alt="" src="https://sc-frontend.tikicdn.com/new/static/logo.9376039b.png" onClick={handleClick}></Avatar>
                <Link to="#" className={classes.text}>
                  <span>{user?.username}</span>
                  <span>{user?.email}</span>
                </Link>
              </div>
            </MenuItem>
            {
              atob(role) === "ROLE_ADMIN" ? (
                <MenuItem className={classes.menuItem}>
                  <Link to="/admin/shop-info" className={classes.link}>
                    <i className='bx bx-user' style={{ fontSize: '1.6rem', marginRight: 6 }}></i>
                    <span>Thông tin shop</span>
                  </Link>
                </MenuItem>
              ) : (
                <MenuItem className={classes.menuItem}>
                  <Link to="/shipper/info" className={classes.link}>
                    <i className='bx bx-user' style={{ fontSize: '1.6rem', marginRight: 6 }}></i>
                    <span>Thông tin cá nhân</span>
                  </Link>
                </MenuItem>
              )
            }
            <MenuItem className={classes.menuItem}>
              <Link to="/admin/change-password" className={classes.link}>
                <i className='bx bxs-edit-alt' style={{ fontSize: '1.6rem', marginRight: 6 }}></i>
                <span>Thay đổi mật khẩu</span>
              </Link>
            </MenuItem>
            <MenuItem className={classes.menuItem}>
              <Link to="#" className={classes.link} onClick={handleLogout}>
                <i className='bx bx-log-out-circle' style={{ fontSize: '1.6rem', marginRight: 6 }}></i>
                <span>Đăng xuất</span>
              </Link>
            </MenuItem>
          </Menu>
        </div>
        <div className="topnav__right-item">
          <ThemeMenu />
        </div>
        {
          token ? (
            <div className="topnav__right-item">
              <img
                src={logout_icon}
                alt=""
                width="24"
                height="24"
                onClick={handleLogout}
              />
            </div>
          ) : (
            ""
          )
        }
      </div >
    </div >
  );
};

export default Topnav;
