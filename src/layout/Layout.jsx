import React, { useEffect } from "react";

import "./layout.css";

import Sidebar from "../components/sidebar/Sidebar";
import TopNav from "../components/topnav/TopNav";
import Routes from "../components/Routes";
import jwtDecode from 'jwt-decode'
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import ThemeAction from "../redux/actions/ThemeAction";
import { Suspense } from "react";
import Loading from "components/loading/Loading";
import { logout, setCurrentUser } from "redux/actions/AuthActions";
const Layout = (props) => {
  const themeReducer = useSelector((state) => state.ThemeReducer);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
      if (Date.now() / 1000 > decoded.exp) {
        dispatch(logout());
      }
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (token && (atob(role) === "ROLE_ADMIN" || atob(role) === "ROLE_SHIPPER")) {
      const themeClass = localStorage.getItem("themeMode", "theme-mode-light");

      const colorClass = localStorage.getItem("colorMode", "theme-mode-light");

      dispatch(ThemeAction.setMode(themeClass));

      dispatch(ThemeAction.setColor(colorClass));

      dispatch(ThemeAction.toggleSideBar(true))
    } else {
      // props.history.push("/admin/login");
      return <Redirect to="/admin/login" />;
    }
  }, [dispatch, props.history, role, token]);

  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
            {token ? <Sidebar role={role} {...props} /> : ""}
            {token ? (
              <div className="layout__content">
                <TopNav />
                <div className="layout__content-main">
                  <Suspense fallback={<Loading />}>
                    <Routes />
                  </Suspense>
                </div>
              </div>
            ) : (
              <div className="layout__content-main">
                <Suspense fallback={<Loading />}>
                  <Routes />
                </Suspense>
              </div>
            )}
          </div>
        )}
      />
    </BrowserRouter>
  );
};

export default Layout;
