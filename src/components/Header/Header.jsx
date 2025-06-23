import { useSelector } from "react-redux";
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { BsChevronRight } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { FaBell } from "react-icons/fa6";
import classNames from "classnames/bind";

import { AuthContext } from "../../contexts/authContext";
import { countries } from "../../assets/data";
import NotificationBox from "../NotificationBox/NotificationBox";
import { NotificationContext } from "../../contexts/notifcationContext";

import styles from "./Header.module.scss";
const cx = classNames.bind(styles);

function Header() {
  const location = useLocation();
  const user = useSelector((state) => state?.auth?.user);
  const { unreadNotifications } = useContext(NotificationContext);
  const { handleLogout } = useContext(AuthContext);
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentCountry, setCurrentCountry] = useState(countries[0]);

  const handleCountryChange = (country) => {
    setCurrentCountry(country);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const closeNotifications = () => {
    setShowNotifications(false);
  };

  return (
    <div className={cx("header-container")}>
      <div className={cx("address")}>
        <div className={cx("address-item", "address-left")}>
          <i>
            <IoHomeOutline />
          </i>
          <Link to="/">Home</Link>
        </div>
        <div className={cx("address-item", "address-right")}>
          <i>
            <BsChevronRight />
          </i>
          <span>{location.pathname.split("/")[1]}</span>
        </div>
      </div>
      <div className={cx("header-action_container")}>
        <div className={cx("search-container")}>
          <div className={cx("input-box")}>
            <input type="text" placeholder="Search anything"></input>
            <button>
              <i>
                <IoIosSearch size={23} />
              </i>
            </button>
          </div>
        </div>
        <div className={cx("notification-wrapper")}>
          <button
            className={cx("notification-container")}
            onClick={toggleNotifications}
          >
            <span>
              <i
                className={cx({ "active": unreadNotifications > 0 })}
              >
                <FaBell />
              </i>
              {unreadNotifications > 0 && (
                <span className={cx("notification-badge")}>
                  {unreadNotifications > 99 ? "99+" : unreadNotifications}
                </span>
              )}
            </span>
          </button>
          {showNotifications && (
            <div className={cx("notification-dropdown")}>
              <NotificationBox onClose={closeNotifications} />
            </div>
          )}
        </div>
        <ul className={cx("user-container")}>
          <div className={cx("countries")}>
            <Link>
              <img src={currentCountry.image} alt={currentCountry.name} />
            </Link>
            <div className={cx("dropdown-menu", "countries-dropdown")}>
              {countries.map((country, index) => (
                <Link key={index} onClick={() => handleCountryChange(country)}>
                  <img src={country.image} alt={country.name} />
                </Link>
              ))}
            </div>
          </div>
          <div className={cx("user")}>
            <Link className={cx("user-setting")}>
              <span className={cx("user-name")}>{user?.username}</span>
              <span className={cx("user-avatar")}>
                <img src={user?.avatar} alt="user-avatar"></img>
              </span>
            </Link>
            <div className={cx("dropdown-menu", "user-dropdown")}>
              <Link to={"/profile"}>profile</Link>
              <Link to={"/setting"}>settings</Link>
              <Link onClick={handleLogout}>logout</Link>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Header;
