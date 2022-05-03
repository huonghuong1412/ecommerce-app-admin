import { makeStyles } from "@material-ui/core";
import React from "react";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./sidebar.css";
import { SidebarConfig, SIDEBAR_SHIPPER } from "./SidebarConfig";

const useStyles = makeStyles({
  sidebar: {
    background: "#fff",
    color: "#fff",
    height: "inherit",
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 75
  }
});

const Sidebar = (props) => {
  const classes = useStyles();
  const {role} = props;

  const SIDEBAR = atob(role) === 'ROLE_ADMIN' ? SidebarConfig : SIDEBAR_SHIPPER;

  const open = useSelector((state) => state.ThemeReducer.open);

  return (
    <>
      <div className={`sidebar ${open ? 'open' : 'close'}`}>
        <ProSidebar className={classes.sidebar}>
          <SidebarHeader>
            <div className="sidebar__logo">
              <Link to="/">
                <img src={logo} alt="company logo" />
              </Link>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              {SIDEBAR.map((item) => {
                if (item.children) {
                  return (
                    <SubMenu
                      title={item.display_name}
                      icon={<i className={item.icon}></i>}
                      key={item.display_name}
                    >
                      {item.children.map((child) => {
                        return (
                          <MenuItem
                            key={child.display_name}
                            icon={<i className={child.icon}></i>}
                          >
                            {child.display_name}
                            <Link to={child.route} />
                          </MenuItem>
                        );
                      })}
                    </SubMenu>
                  );
                }
                return (
                  <MenuItem
                    icon={<i className={item.icon}></i>}
                    key={item.display_name}
                  >
                    {item.display_name}
                    <Link to={item.route} />
                  </MenuItem>
                );
              })}
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <h3 className={classes.text}>Trang quản trị</h3>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Sidebar;
