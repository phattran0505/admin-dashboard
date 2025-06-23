import { useContext } from "react";
import { FaUserPlus, FaUserEdit, FaUserMinus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import classNames from "classnames/bind";

import styles from "./NotificationBox.module.scss";
import { NotificationContext } from "../../contexts/notifcationContext";

const cx = classNames.bind(styles);

function NotificationBox({ onClose }) {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } =
    useContext(NotificationContext);
  const isMobile = window.innerWidth <= 768;

  const handleMarkAsRead = (notificationId) => {
    if (!notificationId) return;
    markNotificationAsRead(notificationId);
  };

  const getIcon = (type) => {
    switch (type) {
      case "add":
        return <FaUserPlus className={cx("icon-add")} />;
      case "update":
        return <FaUserEdit className={cx("icon-update")} />;
      case "delete":
        return <FaUserMinus className={cx("icon-delete")} />;
      default:
        return null;
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    return formatDistanceToNow(new Date(timestamp), {
      addSuffix: true,
      locale: vi,
    });
  };

  // Sort notifications by timestamp in descending order
  const sortedNotifications = notifications?.slice()?.sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );
  return (
    <div className={cx("notification-box")}>
      <div className={cx("notification-header")}>
        <h4>Thông báo</h4>
        <div className={cx("header-actions")}>
          <span className={cx("mark-all")} onClick={markAllNotificationsAsRead}>
            Đánh dấu tất cả là đã đọc
          </span>
          {isMobile && (
            <button className={cx("close-btn")} onClick={onClose}>
              <IoClose size={24} />
            </button>
          )}
        </div>
      </div>
      {sortedNotifications && sortedNotifications.length > 0 ? (
        <ul className={cx("notification-list")}>
          {sortedNotifications.map((notification) => (
            <li
              key={notification._id}
              className={cx("notification-item", {
                unread: !notification.read,
              })}
              onClick={() => handleMarkAsRead(notification._id)}
            >
              <div className={cx("notification-content")}>
                <div className={cx("icon")}>{getIcon(notification.type)}</div>
                <div className={cx("details")}>
                  <p 
                    className={cx("message")}
                    dangerouslySetInnerHTML={{ __html: notification.message }}
                  />
                  <div className={cx("time")}>
                    {formatTime(notification.timestamp)}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={cx("no-notifications")}>No notifications</div>
      )}
    </div>
  );
}

export default NotificationBox;
