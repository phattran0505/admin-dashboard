import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import classNames from "classnames/bind";
import axios from "axios";

import logo from "../../assets/images/logo.svg";
import { sidebarData } from "../../assets/data/index";
import { AuthContext } from "../../contexts/authContext";
import { useHealthCheck } from "../../hooks/useHealthCheck";
import { BASE_URL } from "../../config/utils";

import styles from "./SideBar.module.scss";
const cx = classNames.bind(styles);

function SideBar() {
  const location = useLocation();
  const { handleLogout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sử dụng health check hook
  useHealthCheck(handleLogout);

  // Kiểm tra server khi component mount
  useEffect(() => {
    const checkServer = async () => {
      try {
        await axios.get(`${BASE_URL}/health-check`, { timeout: 2000 });
      } catch (error) {
        handleLogout();
      }
    };

    checkServer();
  }, [handleLogout]);

  // Check if current path starts with the given path or is exact match
  const isActive = (path) => {
    if (path === "/") {
      // For home/root path, only be active if exact match
      return location.pathname === path;
    }
    // For other paths, check if current path starts with this path
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <>
      <aside className={cx("sidebar", { mobile: isMobile })}>
        <div className={cx("sidebar-container", { mobile: isMobile })}>
          <div className={cx("sidebar-brand")}>
            <Link to={"/"} className={cx("logo")}>
              <img src={logo} alt="logo"></img>
            </Link>
          </div>
          <div className={cx("sidebar-menu")}>
            <ul>
              {sidebarData.map((item, index) => (
                <li key={index} className={cx("sidebar-item")}>
                  <Link
                    to={item.path}
                    className={cx("sidebar-link", {
                      active: isActive(item.path),
                      mobile: isMobile,
                    })}
                  >
                    <i>
                      <item.icon size={18} />
                    </i>
                    {!isMobile && <span>{item.title}</span>}
                  </Link>
                </li>
              ))}
              <li className={cx("sidebar-item")}>
                <button
                  className={cx("sidebar-link", { mobile: isMobile })}
                  onClick={handleLogout}
                  type="button"
                >
                  <i>
                    <MdLogout size={18} />
                  </i>
                  {!isMobile && <span>Logout</span>}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
