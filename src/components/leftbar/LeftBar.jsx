import React, {useRef, useEffect} from 'react'
import {
    Menu,
    MenuItem,
    ProSidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SubMenu,
  } from "react-pro-sidebar";
import './leftbar.css'
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { SidebarConfig } from "../sidebar/SidebarConfig";
// import MenuIcon from "@material-ui/icons/Menu";


const clickOutsideRef = (content_ref, toggle_ref) => {
    document.addEventListener('mousedown', (e) => {
        // user click toggle
        if (toggle_ref.current && toggle_ref.current.contains(e.target)) {
            content_ref.current.classList.toggle('active')
        } else {
            // user click outside toggle and content
            if (content_ref.current && !content_ref.current.contains(e.target)) {
                content_ref.current.classList.remove('active')
            }
        }
    })
}

const LeftBar = () => {

    const menu_ref = useRef(null)
    const menu_toggle_ref = useRef(null)

    clickOutsideRef(menu_ref, menu_toggle_ref)

    const setActiveMenu = () => menu_ref.current.classList.add('active')

    // const closeMenu = () => menu_ref.current.classList.remove('active')



    useEffect(() => {

    }, []);

    return (
        <div>
            <button ref={menu_toggle_ref} className="dropdown__toggle" onClick={() => setActiveMenu()}>
                <i className='bx bx-palette'></i>
            </button>
            <div ref={menu_ref} className="theme-sidebar">
            <ProSidebar>
          <SidebarHeader>
            <div className="sidebar__logo">
              <Link to="/">
                <img src={logo} alt="company logo" />
              </Link>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              {SidebarConfig.map((item) => {
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
            <h3>Admin Site</h3>
          </SidebarFooter>
        </ProSidebar>
            </div>
        </div>
    )
}

export default LeftBar
